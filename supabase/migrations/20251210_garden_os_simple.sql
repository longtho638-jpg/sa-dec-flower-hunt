-- ============================================================================
-- GARDEN OS: SIMPLIFIED MIGRATION v2.0
-- ============================================================================
-- Clean, optimized schema for Garden OS with proper indexing
-- No PostGIS required - uses simple lat/lng fields
-- ============================================================================

-- ============================================================================
-- CONFIGURATION
-- ============================================================================
SET statement_timeout = '60s';

-- ============================================================================
-- 1. GARDENS TABLE (Core entity)
-- ============================================================================
CREATE TABLE IF NOT EXISTS gardens (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- External identifiers
    zalo_id TEXT UNIQUE,
    profile_id UUID,
    
    -- Basic info
    name TEXT NOT NULL,
    owner_name TEXT,
    owner_phone TEXT,
    
    -- Location (simple fields, no PostGIS)
    address TEXT,
    ward TEXT,
    district TEXT DEFAULT 'Sa Đéc',
    province TEXT DEFAULT 'Đồng Tháp',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Status & verification
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED', 'MAINTENANCE')),
    is_verified BOOLEAN DEFAULT false,
    
    -- Profile & media
    avatar_url TEXT,
    description TEXT,
    specialties TEXT[],
    
    -- Aggregated stats (denormalized for performance)
    rating DECIMAL(2,1) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
    total_sales INT DEFAULT 0 CHECK (total_sales >= 0),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_gardens_zalo ON gardens(zalo_id) WHERE zalo_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_gardens_status ON gardens(status);
CREATE INDEX IF NOT EXISTS idx_gardens_ward ON gardens(ward);
CREATE INDEX IF NOT EXISTS idx_gardens_location ON gardens(latitude, longitude) 
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- ============================================================================
-- 2. INVENTORY TABLE (Garden products)
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    garden_id UUID NOT NULL REFERENCES gardens(id) ON DELETE CASCADE,
    
    -- Product info
    flower_type TEXT NOT NULL,
    flower_name TEXT,
    quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit TEXT DEFAULT 'chậu',
    unit_price DECIMAL(12,0) CHECK (unit_price >= 0),
    
    -- AI scan data
    ai_confidence FLOAT DEFAULT 1.0 CHECK (ai_confidence >= 0 AND ai_confidence <= 1),
    ai_scan_image TEXT,
    
    -- Availability
    is_available BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Unique constraint
    UNIQUE(garden_id, flower_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inventory_garden ON inventory(garden_id);
CREATE INDEX IF NOT EXISTS idx_inventory_flower ON inventory(flower_type);
CREATE INDEX IF NOT EXISTS idx_inventory_available ON inventory(garden_id, is_available) 
    WHERE is_available = true;

-- ============================================================================
-- 3. LOOT_BOXES TABLE (Gamification)
-- ============================================================================
CREATE TABLE IF NOT EXISTS loot_boxes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
    
    -- Rarity & trigger
    rarity TEXT DEFAULT 'COMMON' CHECK (rarity IN ('COMMON', 'RARE', 'EPIC', 'LEGENDARY')),
    trigger_type TEXT DEFAULT 'INVENTORY' CHECK (trigger_type IN ('INVENTORY', 'VISIT', 'ORDER', 'MANUAL')),
    trigger_quantity INT,
    
    -- Reward
    reward_type TEXT,
    reward_value TEXT,
    reward_amount DECIMAL(12,0),
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_claimed BOOLEAN DEFAULT false,
    claimed_by UUID,
    claimed_at TIMESTAMPTZ,
    
    -- Lifecycle
    spawned_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    
    -- Extensible metadata
    metadata JSONB DEFAULT '{}'
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_loot_garden ON loot_boxes(garden_id);
CREATE INDEX IF NOT EXISTS idx_loot_active ON loot_boxes(is_active, is_claimed) 
    WHERE is_active = true AND is_claimed = false;
CREATE INDEX IF NOT EXISTS idx_loot_expiry ON loot_boxes(expires_at) 
    WHERE expires_at IS NOT NULL;

-- ============================================================================
-- 4. INVENTORY_HISTORY TABLE (Audit trail)
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID REFERENCES inventory(id) ON DELETE CASCADE,
    garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
    
    -- Change data
    old_quantity INT,
    new_quantity INT,
    change_type TEXT CHECK (change_type IN ('SCAN', 'SALE', 'RESTOCK', 'ADJUSTMENT', 'EXPIRED')),
    change_reason TEXT,
    
    -- AI data
    ai_confidence FLOAT,
    ai_scan_image TEXT,
    
    -- Timestamp
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for time-series queries
CREATE INDEX IF NOT EXISTS idx_history_time ON inventory_history(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_history_garden ON inventory_history(garden_id, recorded_at DESC);

-- ============================================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE loot_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "gardens_public_read" ON gardens;
DROP POLICY IF EXISTS "gardens_auth_write" ON gardens;
DROP POLICY IF EXISTS "inventory_public_read" ON inventory;
DROP POLICY IF EXISTS "inventory_auth_write" ON inventory;
DROP POLICY IF EXISTS "loot_boxes_public_read" ON loot_boxes;
DROP POLICY IF EXISTS "loot_boxes_auth_write" ON loot_boxes;
DROP POLICY IF EXISTS "inventory_history_auth_write" ON inventory_history;

-- Read policies (public)
CREATE POLICY "gardens_public_read" ON gardens FOR SELECT USING (true);
CREATE POLICY "inventory_public_read" ON inventory FOR SELECT USING (true);
CREATE POLICY "loot_boxes_public_read" ON loot_boxes FOR SELECT USING (true);

-- Write policies (authenticated)
CREATE POLICY "gardens_auth_write" ON gardens FOR ALL TO authenticated USING (true);
CREATE POLICY "inventory_auth_write" ON inventory FOR ALL TO authenticated USING (true);
CREATE POLICY "loot_boxes_auth_write" ON loot_boxes FOR ALL TO authenticated USING (true);
CREATE POLICY "inventory_history_auth_write" ON inventory_history FOR ALL TO authenticated USING (true);

-- ============================================================================
-- 6. REALTIME SUBSCRIPTIONS
-- ============================================================================
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE gardens;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE inventory;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE loot_boxes;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================================
-- 7. AUTO-UPDATE TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS gardens_updated ON gardens;
CREATE TRIGGER gardens_updated
    BEFORE UPDATE ON gardens
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS inventory_updated ON inventory;
CREATE TRIGGER inventory_updated
    BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ============================================================================
-- 8. SEED DATA
-- ============================================================================
INSERT INTO gardens (name, owner_name, address, ward, status, specialties, description)
VALUES
    ('Vườn Hồng Tư Tôn', 'Nguyễn Văn Tôn', 'Ấp Tân Quy Đông', 'Tân Quy Đông', 'OPEN', 
     ARRAY['Hồng Sa Đéc', 'Cúc Mâm Xôi'], 'Vườn hồng truyền thống 30 năm'),
    ('Vườn Mai Út Hiền', 'Trần Thị Hiền', 'Ấp Tân Khánh Đông', 'Tân Khánh Đông', 'OPEN',
     ARRAY['Mai Vàng', 'Cúc Đại Đóa'], 'Chuyên mai vàng Bình Định'),
    ('Vườn Cúc Ba Tèo', 'Lê Văn Tèo', 'Làng Hoa Sa Đéc', 'Tân Quy Đông', 'OPEN',
     ARRAY['Cúc Mâm Xôi', 'Vạn Thọ'], 'Cúc mâm xôi giống F1 cao cấp')
ON CONFLICT DO NOTHING;

-- Add inventory for first garden
DO $$
DECLARE
    v_garden_id UUID;
BEGIN
    SELECT id INTO v_garden_id FROM gardens WHERE name = 'Vườn Hồng Tư Tôn' LIMIT 1;
    
    IF v_garden_id IS NOT NULL THEN
        INSERT INTO inventory (garden_id, flower_type, flower_name, quantity, unit_price, is_available)
        VALUES
            (v_garden_id, 'Cuc_Mam_Xoi', 'Cúc Mâm Xôi', 75, 150000, true),
            (v_garden_id, 'Hong_Sa_Dec', 'Hồng Sa Đéc', 50, 80000, true)
        ON CONFLICT (garden_id, flower_type) DO UPDATE SET
            quantity = EXCLUDED.quantity,
            unit_price = EXCLUDED.unit_price;
    END IF;
END $$;

-- ============================================================================
-- MIGRATION COMPLETE! ✅
-- ============================================================================
-- Improvements in v2.0:
-- 1. Added CHECK constraints for data validation
-- 2. Added partial indexes for better performance
-- 3. Added auto-update triggers for updated_at
-- 4. Idempotent DROP POLICY before CREATE
-- 5. Better variable naming in PL/pgSQL
-- 6. UPSERT support in seed data
-- ============================================================================

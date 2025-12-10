-- ============================================================================
-- GARDEN OS: SIMPLIFIED MIGRATION (No PostGIS required)
-- ============================================================================
-- Run this if the full migration fails
-- ============================================================================

-- ============================================================================
-- 1. GARDENS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS gardens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identity
    zalo_id TEXT UNIQUE,
    profile_id UUID,
    name TEXT NOT NULL,
    owner_name TEXT,
    owner_phone TEXT,
    
    -- Location (simple TEXT instead of GEOGRAPHY)
    address TEXT,
    ward TEXT,
    district TEXT DEFAULT 'Sa Đéc',
    province TEXT DEFAULT 'Đồng Tháp',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Status
    status TEXT DEFAULT 'OPEN',
    is_verified BOOLEAN DEFAULT false,
    
    -- Profile
    avatar_url TEXT,
    description TEXT,
    specialties TEXT[],
    
    -- Stats
    rating DECIMAL(2,1) DEFAULT 5.0,
    total_sales INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gardens_zalo_id ON gardens(zalo_id);
CREATE INDEX IF NOT EXISTS idx_gardens_status ON gardens(status);

-- ============================================================================
-- 2. INVENTORY TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    garden_id UUID NOT NULL REFERENCES gardens(id) ON DELETE CASCADE,
    
    flower_type TEXT NOT NULL,
    flower_name TEXT,
    quantity INT NOT NULL DEFAULT 0,
    unit TEXT DEFAULT 'chậu',
    unit_price DECIMAL(12,0),
    
    ai_confidence FLOAT DEFAULT 1.0,
    ai_scan_image TEXT,
    
    is_available BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(garden_id, flower_type)
);

CREATE INDEX IF NOT EXISTS idx_inventory_garden ON inventory(garden_id);
CREATE INDEX IF NOT EXISTS idx_inventory_flower_type ON inventory(flower_type);

-- ============================================================================
-- 3. LOOT_BOXES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS loot_boxes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
    
    rarity TEXT DEFAULT 'COMMON',
    trigger_type TEXT DEFAULT 'INVENTORY',
    trigger_quantity INT,
    
    reward_type TEXT,
    reward_value TEXT,
    reward_amount DECIMAL(12,0),
    
    is_active BOOLEAN DEFAULT true,
    is_claimed BOOLEAN DEFAULT false,
    claimed_by UUID,
    claimed_at TIMESTAMPTZ,
    
    spawned_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_loot_boxes_garden ON loot_boxes(garden_id);
CREATE INDEX IF NOT EXISTS idx_loot_boxes_active ON loot_boxes(is_active, is_claimed);

-- ============================================================================
-- 4. INVENTORY_HISTORY TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID REFERENCES inventory(id) ON DELETE CASCADE,
    garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
    
    old_quantity INT,
    new_quantity INT,
    change_type TEXT,
    change_reason TEXT,
    
    ai_confidence FLOAT,
    ai_scan_image TEXT,
    
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. RLS POLICIES
-- ============================================================================
ALTER TABLE gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE loot_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_history ENABLE ROW LEVEL SECURITY;

-- Public read for all tables
CREATE POLICY "gardens_public_read" ON gardens FOR SELECT USING (true);
CREATE POLICY "inventory_public_read" ON inventory FOR SELECT USING (true);
CREATE POLICY "loot_boxes_public_read" ON loot_boxes FOR SELECT USING (true);

-- Authenticated users can write
CREATE POLICY "gardens_auth_write" ON gardens FOR ALL TO authenticated USING (true);
CREATE POLICY "inventory_auth_write" ON inventory FOR ALL TO authenticated USING (true);
CREATE POLICY "loot_boxes_auth_write" ON loot_boxes FOR ALL TO authenticated USING (true);
CREATE POLICY "inventory_history_auth_write" ON inventory_history FOR ALL TO authenticated USING (true);

-- ============================================================================
-- 6. ENABLE REALTIME
-- ============================================================================
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE gardens;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE inventory;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE loot_boxes;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

-- ============================================================================
-- 7. SEED DATA
-- ============================================================================
INSERT INTO gardens (name, owner_name, address, ward, status, specialties, description) VALUES
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
    garden_uuid UUID;
BEGIN
    SELECT id INTO garden_uuid FROM gardens WHERE name = 'Vườn Hồng Tư Tôn' LIMIT 1;
    
    IF garden_uuid IS NOT NULL THEN
        INSERT INTO inventory (garden_id, flower_type, flower_name, quantity, unit_price, is_available) VALUES
            (garden_uuid, 'Cuc_Mam_Xoi', 'Cúc Mâm Xôi', 75, 150000, true),
            (garden_uuid, 'Hong_Sa_Dec', 'Hồng Sa Đéc', 50, 80000, true)
        ON CONFLICT (garden_id, flower_type) DO NOTHING;
    END IF;
END $$;

-- ============================================================================
-- MIGRATION COMPLETE!
-- ============================================================================

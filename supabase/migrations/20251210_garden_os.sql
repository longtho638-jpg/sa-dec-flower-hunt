-- ============================================================================
-- GARDEN OS: PARASITIC ARCHITECTURE - DATABASE MIGRATION
-- ============================================================================
-- Date: 2025-12-10
-- Purpose: Create Digital Twin tables for Sa Đéc Flower Village
-- Architecture: Dual-App (Garden OS + Hunter Guide) sharing Supabase Brain
-- ============================================================================

-- Enable PostGIS for GPS coordinates (if not already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================================
-- 1. GARDENS TABLE - Nhà Vườn Digital Twin
-- ============================================================================
CREATE TABLE IF NOT EXISTS gardens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Identity
    zalo_id TEXT UNIQUE,             -- Zalo User ID (auto-login from Mini App)
    profile_id UUID REFERENCES profiles(id), -- Link to existing profiles system
    name TEXT NOT NULL,              -- "Vườn Hồng Tư Tôn"
    owner_name TEXT,                 -- Tên chủ vườn
    owner_phone TEXT,                -- Số điện thoại
    
    -- Location (GPS for Game Map)
    coordinates GEOGRAPHY(POINT),    -- GPS point
    address TEXT,                    -- Địa chỉ đầy đủ
    ward TEXT,                       -- Phường/Xã
    district TEXT DEFAULT 'Sa Đéc', -- Quận/Huyện
    province TEXT DEFAULT 'Đồng Tháp',
    
    -- Status
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'FULL', 'CLOSED', 'VACATION')),
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMP,
    
    -- Profile
    avatar_url TEXT,                 -- Ảnh đại diện vườn
    cover_image_url TEXT,            -- Ảnh bìa
    description TEXT,                -- Giới thiệu vườn
    specialties TEXT[],              -- ["Cúc Mâm Xôi", "Hồng Sa Đéc"]
    
    -- Stats (denormalized for performance)
    rating DECIMAL(2,1) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
    total_reviews INT DEFAULT 0,
    total_sales INT DEFAULT 0,
    total_revenue DECIMAL(15,0) DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_gardens_zalo_id ON gardens(zalo_id);
CREATE INDEX IF NOT EXISTS idx_gardens_status ON gardens(status);
CREATE INDEX IF NOT EXISTS idx_gardens_coordinates ON gardens USING GIST(coordinates);

-- ============================================================================
-- 2. INVENTORY TABLE - Kho Hoa Thời Gian Thực
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    garden_id UUID NOT NULL REFERENCES gardens(id) ON DELETE CASCADE,
    
    -- Flower Info
    flower_type TEXT NOT NULL,       -- "Cuc_Mam_Xoi", "Hong_Sa_Dec", "Mai_Vang"
    flower_name TEXT,                -- "Cúc Mâm Xôi Vàng"
    variety TEXT,                    -- "Loại A", "Loại B"
    
    -- Stock
    quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    unit TEXT DEFAULT 'chậu',        -- chậu, cành, bó, kg
    min_order INT DEFAULT 1,
    
    -- Pricing
    unit_price DECIMAL(12,0),        -- Giá bán lẻ
    wholesale_price DECIMAL(12,0),   -- Giá sỉ (>10)
    
    -- AI Vision Data
    ai_confidence FLOAT DEFAULT 1.0 CHECK (ai_confidence >= 0 AND ai_confidence <= 1),
    ai_scan_image TEXT,              -- Ảnh chụp từ AI scan
    last_ai_scan TIMESTAMPTZ,
    
    -- Availability
    is_available BOOLEAN DEFAULT true,
    available_from DATE,
    available_until DATE,            -- Deadline Tết
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Unique constraint: one flower type per garden
    UNIQUE(garden_id, flower_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inventory_garden ON inventory(garden_id);
CREATE INDEX IF NOT EXISTS idx_inventory_flower_type ON inventory(flower_type);
CREATE INDEX IF NOT EXISTS idx_inventory_available ON inventory(is_available, quantity);

-- ============================================================================
-- 3. LOOT_BOXES TABLE - Hộp Quà Ảo (Gamification Layer)
-- ============================================================================
CREATE TABLE IF NOT EXISTS loot_boxes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
    
    -- Loot Box Properties
    rarity TEXT DEFAULT 'COMMON' CHECK (rarity IN ('COMMON', 'RARE', 'EPIC', 'LEGENDARY')),
    trigger_type TEXT DEFAULT 'INVENTORY' CHECK (trigger_type IN ('INVENTORY', 'TIME', 'PROXIMITY', 'MANUAL')),
    trigger_quantity INT,            -- Spawn when inventory > this
    
    -- Reward
    reward_type TEXT CHECK (reward_type IN ('VOUCHER', 'MISSION', 'BADGE', 'POINTS', 'FREE_FLOWER')),
    reward_value TEXT,               -- "20% OFF", "Mission #5", "100 XP"
    reward_amount DECIMAL(12,0),     -- Số tiền/điểm
    
    -- GPS (for proximity-based loot)
    coordinates GEOGRAPHY(POINT),
    radius_meters INT DEFAULT 50,
    
    -- State
    is_active BOOLEAN DEFAULT true,
    is_claimed BOOLEAN DEFAULT false,
    claimed_by UUID REFERENCES profiles(id),
    claimed_at TIMESTAMPTZ,
    
    -- Timing
    spawned_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_loot_boxes_garden ON loot_boxes(garden_id);
CREATE INDEX IF NOT EXISTS idx_loot_boxes_active ON loot_boxes(is_active, is_claimed);
CREATE INDEX IF NOT EXISTS idx_loot_boxes_coordinates ON loot_boxes USING GIST(coordinates);
CREATE INDEX IF NOT EXISTS idx_loot_boxes_expires ON loot_boxes(expires_at) WHERE is_active = true;

-- ============================================================================
-- 4. INVENTORY_HISTORY - Lịch sử thay đổi kho (Analytics)
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_id UUID REFERENCES inventory(id) ON DELETE CASCADE,
    garden_id UUID REFERENCES gardens(id) ON DELETE CASCADE,
    
    -- Change Data
    old_quantity INT,
    new_quantity INT,
    change_type TEXT CHECK (change_type IN ('AI_SCAN', 'MANUAL', 'SALE', 'RESTOCK', 'DAMAGE')),
    change_reason TEXT,
    
    -- AI Data
    ai_confidence FLOAT,
    ai_scan_image TEXT,
    
    -- Timestamp
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inventory_history_garden ON inventory_history(garden_id);
CREATE INDEX IF NOT EXISTS idx_inventory_history_time ON inventory_history(recorded_at DESC);

-- ============================================================================
-- 5. RLS POLICIES - Row Level Security
-- ============================================================================

-- Gardens
ALTER TABLE gardens ENABLE ROW LEVEL SECURITY;

-- Anyone can read gardens (for Hunter Guide map)
CREATE POLICY "Public read gardens" ON gardens 
    FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access gardens" ON gardens 
    FOR ALL USING (auth.role() = 'service_role');

-- Inventory
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Anyone can read inventory (for Hunter Guide)
CREATE POLICY "Public read inventory" ON inventory 
    FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access inventory" ON inventory 
    FOR ALL USING (auth.role() = 'service_role');

-- Loot Boxes
ALTER TABLE loot_boxes ENABLE ROW LEVEL SECURITY;

-- Anyone can read active loot boxes
CREATE POLICY "Public read active loot boxes" ON loot_boxes 
    FOR SELECT USING (is_active = true);

-- Service role can do everything
CREATE POLICY "Service role full access loot boxes" ON loot_boxes 
    FOR ALL USING (auth.role() = 'service_role');

-- Inventory History (internal only)
ALTER TABLE inventory_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only inventory history" ON inventory_history 
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 6. ENABLE REALTIME
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE gardens;
ALTER PUBLICATION supabase_realtime ADD TABLE inventory;
ALTER PUBLICATION supabase_realtime ADD TABLE loot_boxes;

-- ============================================================================
-- 7. TRIGGER: Auto-update updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER gardens_updated_at
    BEFORE UPDATE ON gardens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 8. TRIGGER: Auto-spawn Loot Box on high inventory
-- ============================================================================
CREATE OR REPLACE FUNCTION spawn_loot_box_on_inventory()
RETURNS TRIGGER AS $$
BEGIN
    -- If quantity crosses threshold, spawn loot box
    IF NEW.quantity >= 50 AND (OLD.quantity IS NULL OR OLD.quantity < 50) THEN
        INSERT INTO loot_boxes (
            garden_id,
            rarity,
            trigger_type,
            trigger_quantity,
            reward_type,
            reward_value,
            expires_at
        ) VALUES (
            NEW.garden_id,
            CASE 
                WHEN NEW.quantity >= 100 THEN 'RARE'
                ELSE 'COMMON'
            END,
            'INVENTORY',
            NEW.quantity,
            'VOUCHER',
            CASE 
                WHEN NEW.quantity >= 100 THEN '30% OFF'
                ELSE '15% OFF'
            END,
            NOW() + INTERVAL '24 hours'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_spawn_loot_box
    AFTER INSERT OR UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION spawn_loot_box_on_inventory();

-- ============================================================================
-- 9. SEED DATA: Demo Gardens
-- ============================================================================
INSERT INTO gardens (name, owner_name, address, ward, status, specialties, description) VALUES
    ('Vườn Hồng Tư Tôn', 'Nguyễn Văn Tôn', 'Ấp Tân Quy Đông', 'Tân Quy Đông', 'OPEN', 
     ARRAY['Hồng Sa Đéc', 'Cúc Mâm Xôi'], 'Vườn hồng truyền thống 30 năm'),
    ('Vườn Mai Út Hiền', 'Trần Thị Hiền', 'Ấp Tân Khánh Đông', 'Tân Khánh Đông', 'OPEN',
     ARRAY['Mai Vàng', 'Cúc Đại Đóa'], 'Chuyên mai vàng Bình Định'),
    ('Vườn Cúc Ba Tèo', 'Lê Văn Tèo', 'Làng Hoa Sa Đéc', 'Tân Quy Đông', 'OPEN',
     ARRAY['Cúc Mâm Xôi', 'Vạn Thọ'], 'Cúc mâm xôi giống F1 cao cấp')
ON CONFLICT DO NOTHING;

-- Seed inventory for demo gardens
INSERT INTO inventory (garden_id, flower_type, flower_name, quantity, unit_price, is_available)
SELECT 
    g.id,
    unnest(ARRAY['Cuc_Mam_Xoi', 'Hong_Sa_Dec', 'Mai_Vang']),
    unnest(ARRAY['Cúc Mâm Xôi', 'Hồng Sa Đéc', 'Mai Vàng']),
    floor(random() * 100 + 20)::int,
    unnest(ARRAY[150000, 80000, 500000]::decimal[]),
    true
FROM gardens g
LIMIT 9
ON CONFLICT DO NOTHING;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Tables created: gardens, inventory, loot_boxes, inventory_history
-- RLS enabled: All tables
-- Realtime enabled: gardens, inventory, loot_boxes
-- Triggers: auto_updated_at, auto_spawn_loot_box
-- ============================================================================

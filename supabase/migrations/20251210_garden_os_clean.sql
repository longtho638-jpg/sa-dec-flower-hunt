-- ============================================================================
-- GARDEN OS: CLEAN INSTALL (Drop existing + Recreate)
-- ============================================================================
-- WARNING: This will DELETE existing data in these tables!
-- ============================================================================

-- STEP 1: Drop existing tables (in reverse order of dependencies)
DROP TABLE IF EXISTS inventory_history CASCADE;
DROP TABLE IF EXISTS loot_boxes CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS gardens CASCADE;

-- STEP 2: Create GARDENS table
CREATE TABLE gardens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zalo_id TEXT UNIQUE,
    profile_id UUID,
    name TEXT NOT NULL,
    owner_name TEXT,
    owner_phone TEXT,
    address TEXT,
    ward TEXT,
    district TEXT DEFAULT 'Sa Đéc',
    province TEXT DEFAULT 'Đồng Tháp',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    status TEXT DEFAULT 'OPEN',
    is_verified BOOLEAN DEFAULT false,
    avatar_url TEXT,
    description TEXT,
    specialties TEXT[],
    rating DECIMAL(2,1) DEFAULT 5.0,
    total_sales INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 3: Create INVENTORY table
CREATE TABLE inventory (
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

-- STEP 4: Create LOOT_BOXES table
CREATE TABLE loot_boxes (
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

-- STEP 5: Create INVENTORY_HISTORY table
CREATE TABLE inventory_history (
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

-- STEP 6: Create indexes
CREATE INDEX idx_gardens_zalo_id ON gardens(zalo_id);
CREATE INDEX idx_gardens_status ON gardens(status);
CREATE INDEX idx_inventory_garden ON inventory(garden_id);
CREATE INDEX idx_inventory_flower_type ON inventory(flower_type);
CREATE INDEX idx_loot_boxes_garden ON loot_boxes(garden_id);
CREATE INDEX idx_loot_boxes_active ON loot_boxes(is_active, is_claimed);

-- STEP 7: Enable RLS
ALTER TABLE gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE loot_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_history ENABLE ROW LEVEL SECURITY;

-- STEP 8: Create policies
CREATE POLICY "gardens_select" ON gardens FOR SELECT USING (true);
CREATE POLICY "gardens_all" ON gardens FOR ALL TO authenticated USING (true);

CREATE POLICY "inventory_select" ON inventory FOR SELECT USING (true);
CREATE POLICY "inventory_all" ON inventory FOR ALL TO authenticated USING (true);

CREATE POLICY "loot_boxes_select" ON loot_boxes FOR SELECT USING (true);
CREATE POLICY "loot_boxes_all" ON loot_boxes FOR ALL TO authenticated USING (true);

CREATE POLICY "inventory_history_all" ON inventory_history FOR ALL TO authenticated USING (true);

-- STEP 9: Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE gardens;
ALTER PUBLICATION supabase_realtime ADD TABLE inventory;
ALTER PUBLICATION supabase_realtime ADD TABLE loot_boxes;

-- STEP 10: Seed data
INSERT INTO gardens (name, owner_name, address, ward, status, specialties, description) VALUES
    ('Vườn Hồng Tư Tôn', 'Nguyễn Văn Tôn', 'Ấp Tân Quy Đông', 'Tân Quy Đông', 'OPEN', 
     ARRAY['Hồng Sa Đéc', 'Cúc Mâm Xôi'], 'Vườn hồng truyền thống 30 năm'),
    ('Vườn Mai Út Hiền', 'Trần Thị Hiền', 'Ấp Tân Khánh Đông', 'Tân Khánh Đông', 'OPEN',
     ARRAY['Mai Vàng', 'Cúc Đại Đóa'], 'Chuyên mai vàng Bình Định'),
    ('Vườn Cúc Ba Tèo', 'Lê Văn Tèo', 'Làng Hoa Sa Đéc', 'Tân Quy Đông', 'OPEN',
     ARRAY['Cúc Mâm Xôi', 'Vạn Thọ'], 'Cúc mâm xôi giống F1 cao cấp');

-- Add inventory
INSERT INTO inventory (garden_id, flower_type, flower_name, quantity, unit_price, is_available)
SELECT id, 'Cuc_Mam_Xoi', 'Cúc Mâm Xôi', 75, 150000, true FROM gardens WHERE name = 'Vườn Hồng Tư Tôn';

INSERT INTO inventory (garden_id, flower_type, flower_name, quantity, unit_price, is_available)
SELECT id, 'Hong_Sa_Dec', 'Hồng Sa Đéc', 50, 80000, true FROM gardens WHERE name = 'Vườn Hồng Tư Tôn';

-- DONE!
SELECT 'Migration complete! Created 4 tables with seed data.' as status;

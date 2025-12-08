-- ============================================
-- ATOMIC RESET: DEMO ACCOUNTS (DEFINITIVE FIX)
-- ============================================
-- This script completely resets demo accounts with ALL required Supabase Auth fields.
-- Run this in Supabase SQL Editor to fix "Database error querying schema".

BEGIN;

-- 1. Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. CLEAN SLATE: Delete existing demo profiles and users
DELETE FROM public.profiles WHERE id IN (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03'
);

DELETE FROM auth.users WHERE email IN (
    'admin@demo.com',
    'farmer@demo.com',
    'customer@demo.com'
);

-- 3. Get the Instance ID (required for Supabase Auth)
-- Note: This should match your project's instance_id. If unknown, use the default.
DO $$
DECLARE
    v_instance_id UUID := '00000000-0000-0000-0000-000000000000';
BEGIN
    -- Try to get actual instance_id from existing users
    SELECT instance_id INTO v_instance_id FROM auth.users LIMIT 1;
    IF v_instance_id IS NULL THEN
        v_instance_id := '00000000-0000-0000-0000-000000000000';
    END IF;
    
    -- 4. INSERT Demo Users with ALL required fields
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        confirmation_token,
        recovery_token,
        email_change_token_new,
        email_change,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        phone,
        phone_confirmed_at,
        phone_change,
        phone_change_token,
        confirmed_at,
        email_change_token_current,
        email_change_confirm_status,
        banned_until,
        reauthentication_token,
        reauthentication_sent_at,
        is_sso_user,
        deleted_at,
        role,
        aud
    ) VALUES 
    -- ADMIN
    (
        'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
        v_instance_id,
        'admin@demo.com',
        crypt('123456', gen_salt('bf')),
        NOW(),  -- email_confirmed_at
        '',     -- confirmation_token
        '',     -- recovery_token
        '',     -- email_change_token_new
        '',     -- email_change
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Executive Admin"}',
        false,
        NOW(),
        NOW(),
        NULL,   -- phone
        NULL,   -- phone_confirmed_at
        '',     -- phone_change
        '',     -- phone_change_token
        NOW(),  -- confirmed_at (CRITICAL!)
        '',     -- email_change_token_current
        0,      -- email_change_confirm_status
        NULL,   -- banned_until
        '',     -- reauthentication_token
        NULL,   -- reauthentication_sent_at
        false,  -- is_sso_user
        NULL,   -- deleted_at
        'authenticated',
        'authenticated'
    ),
    -- FARMER
    (
        'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
        v_instance_id,
        'farmer@demo.com',
        crypt('123456', gen_salt('bf')),
        NOW(),
        '',
        '',
        '',
        '',
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Nông Dân Demo"}',
        false,
        NOW(),
        NOW(),
        NULL,
        NULL,
        '',
        '',
        NOW(),
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        'authenticated',
        'authenticated'
    ),
    -- CUSTOMER
    (
        'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
        v_instance_id,
        'customer@demo.com',
        crypt('123456', gen_salt('bf')),
        NOW(),
        '',
        '',
        '',
        '',
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Khách Hàng Demo"}',
        false,
        NOW(),
        NOW(),
        NULL,
        NULL,
        '',
        '',
        NOW(),
        '',
        0,
        NULL,
        '',
        NULL,
        false,
        NULL,
        'authenticated',
        'authenticated'
    );
END $$;

-- 5. INSERT Profiles (linked to users)
INSERT INTO public.profiles (id, role, full_name, address, avatar_url)
VALUES
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'admin', 'Executive Admin', 'HQ Agri-OS', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'farmer', 'Nông Dân Demo', 'Vườn Mẫu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=farmer'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'customer', 'Khách Hàng Demo', 'TP.HCM', 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer')
ON CONFLICT (id) DO UPDATE SET 
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name;

-- 6. Reload PostgREST schema cache
NOTIFY pgrst, 'reload config';

COMMIT;

-- 7. VERIFICATION
SELECT id, email, aud, role, confirmed_at, email_confirmed_at 
FROM auth.users 
WHERE email IN ('admin@demo.com', 'farmer@demo.com', 'customer@demo.com');

SELECT id, role, full_name FROM public.profiles 
WHERE id IN (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03'
);

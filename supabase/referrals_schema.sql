-- Smart Referral Engine Schema
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL, -- The user who shared the code (could be link to users table or just UUID)
  referee_id UUID, -- The new user (optional at first)
  code VARCHAR(20) NOT NULL,
  reward_amount INT DEFAULT 30000,
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for speedy lookups
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);

-- Policies
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "referrals_select" ON referrals FOR SELECT USING (true);
CREATE POLICY "referrals_insert" ON referrals FOR INSERT WITH CHECK (true);
CREATE POLICY "referrals_update" ON referrals FOR UPDATE USING (true);

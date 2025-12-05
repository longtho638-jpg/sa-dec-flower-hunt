-- AARRR Analytics Schema
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id), -- If using Supabase Auth
  session_id UUID, -- For anonymous tracking if needed later
  stage VARCHAR(20) NOT NULL CHECK (stage IN ('acquisition', 'activation', 'retention', 'revenue', 'referral')),
  action VARCHAR(100) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert events (for anonymous tracking)
CREATE POLICY "events_insert_anon" ON events FOR INSERT WITH CHECK (true);

-- Only admins can view events (assumes you have an admin role or just use dashboard)
-- For development, we'll allow select to make it easier to debug
CREATE POLICY "events_select_all" ON events FOR SELECT USING (true);

-- Index for querying by stage
CREATE INDEX IF NOT EXISTS idx_events_stage ON events(stage);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);

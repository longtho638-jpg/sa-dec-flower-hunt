import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a mock client for build time or when env vars are missing
const createMockClient = () => ({
    from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: 'mock' }, error: null }) }) }),
    }),
});

export const supabase: SupabaseClient | ReturnType<typeof createMockClient> =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : createMockClient() as any;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a mock client for build time or when env vars are missing
const createMockClient = () => ({
    from: () => ({
        select: () => ({
            eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
            order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),
        }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: 'mock' }, error: null }) }) }),
    }),
    channel: () => ({
        on: () => ({ subscribe: () => ({}) }),
        unsubscribe: () => Promise.resolve(),
    }),
    removeChannel: () => Promise.resolve(),
});

// Export as any to avoid strict type checks on mock vs real client differences during rapid development
export const supabase: any =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : createMockClient();

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

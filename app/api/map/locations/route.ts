import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Get all gardens and landmarks for map
 * GET /api/map/locations
 */
export async function GET(request: NextRequest) {
    try {
        // Get all verified gardens with farmer info
        const { data: gardens, error: gardensError } = await supabase
            .from('farmer_gardens')
            .select(`
        *,
        profiles:farmer_id (name, email)
      `)
            .eq('verified', true)
            .order('name');

        // Get all landmarks
        const { data: landmarks, error: landmarksError } = await supabase
            .from('landmarks')
            .select('*')
            .order('name');

        if (gardensError) {
            console.error('Gardens error:', gardensError);
            // Return empty array if table doesn't exist yet
            return NextResponse.json({
                gardens: [],
                landmarks: landmarks || []
            });
        }

        if (landmarksError) {
            console.error('Landmarks error:', landmarksError);
            return NextResponse.json({
                gardens: gardens || [],
                landmarks: []
            });
        }

        // Transform gardens to include farmer name
        const transformedGardens = gardens?.map(g => ({
            ...g,
            farmer_name: g.profiles?.name
        })) || [];

        return NextResponse.json({
            gardens: transformedGardens,
            landmarks: landmarks || []
        });

    } catch (error: any) {
        console.error('Map locations error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';

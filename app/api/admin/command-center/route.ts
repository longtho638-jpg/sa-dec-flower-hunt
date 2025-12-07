import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Live Dashboard Metrics API
 * GET /api/admin/command-center
 * Returns real-time platform metrics
 */
export async function GET(request: NextRequest) {
    try {
        // Get live metrics from view
        const { data: metrics, error: metricsError } = await supabase
            .from('dashboard_live_metrics')
            .select('*')
            .single();

        if (metricsError) {
            console.error('Metrics error:', metricsError);
            // Return mock data if view doesn't exist yet
            return NextResponse.json({
                orders_today: 0,
                orders_week: 0,
                orders_completed: 0,
                total_revenue: 0,
                revenue_today: 0,
                revenue_week: 0,
                total_farmers: 0,
                active_farmers_week: 0,
                platform_avg_rating: 0,
                total_reviews: 0,
                qr_scans_week: 0,
                active_qr_codes: 0,
                updated_at: new Date().toISOString(),
            });
        }

        // Get revenue trend (last 7 days)
        const { data: revenueTrend } = await supabase
            .from('revenue_daily')
            .select('*')
            .limit(7)
            .order('date', { ascending: true });

        // Get top farmers
        const { data: topFarmers } = await supabase
            .from('top_farmers')
            .select('*')
            .limit(5);

        // Get recent activity (last 10 orders)
        const { data: recentOrders } = await supabase
            .from('orders')
            .select('id, recipient_name, final_price, status, created_at')
            .order('created_at', { ascending: false })
            .limit(10);

        return NextResponse.json({
            metrics,
            revenue_trend: revenueTrend || [],
            top_farmers: topFarmers || [],
            recent_activity: recentOrders || [],
            timestamp: new Date().toISOString(),
        });

    } catch (error: any) {
        console.error('Command center error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * Get real-time updates (for polling/websocket)
 * Can be called every 5-10 seconds for live updates
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

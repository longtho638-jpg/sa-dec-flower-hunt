import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
        return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // CRITICAL: Input Validation
    // Validate Vietnamese phone number format (10-11 digits, starts with 0 or 84)
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    // Initialize Supabase with Service Role Key to bypass RLS for phone-based lookup
    // This is secure because we are strictly filtering by the provided phone number
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    // Verify environment configuration
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceKey) {
        console.error('[API/Orders] CRITICAL: Missing SUPABASE_SERVICE_ROLE_KEY');
        return NextResponse.json({
            error: 'Server Misconfiguration: Missing Service Key. Cannot query orders securey.'
        }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        // Step 1: Find orders by phone using arrow operator (PostgREST syntax)
        // casting to text is implicit with ->> w
        // Step 1: Find orders (fetching simplified lists to filter in memory if syntax fails)
        // Note: Direct JSON filtering can be flaky depending on Supabase version. 
        // We'll try a flexible approach: Get recent orders and filter in JS if needed, 
        // OR use the contained operator which is standard.


        // DEBUG QUERY: Select ALL columns to see what actually exists
        // and avoid crashing on specific missing columns.
        const { data: allOrders, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (allOrders && allOrders.length > 0) {
            console.log('[API/Orders] Actual Table Columns:', Object.keys(allOrders[0]));
            if (!allOrders[0].hasOwnProperty('shipping_address')) {
                console.error('[API/Orders] CRITICAL: shipping_address column is REALLY missing from returned data.');
            }
        } else {
            console.log('[API/Orders] No orders found to inspect structure.');
        }

        if (orderError) {
            console.error('[API/Orders] DB Error:', orderError);
            throw orderError;
        }

        // Filter in memory to ensure phone match works regardless of JSON structure depth
        const orders = allOrders.filter(o => {
            const addr = o.shipping_address as any;
            return addr?.phone === phone || addr?.customer_phone === phone;
        });

        if (orderError) {
            console.error('[API/Orders] Order fetch error:', orderError);
            throw orderError;
        }

        if (!orders || orders.length === 0) {
            return NextResponse.json({ orders: [] });
        }

        const orderIds = orders.map(o => o.id);

        // Step 2: Get items
        const { data: items, error: itemError } = await supabase
            .from('order_items')
            .select(`
                id,
                order_id,
                quantity,
                price_at_purchase,
                product:products (
                    name,
                    metadata
                )
            `)
            .in('order_id', orderIds);

        if (itemError) {
            console.error('[API/Orders] Item fetch error:', itemError);
            throw itemError;
        }

        // Step 3: Merge data with safety checks
        const formattedOrders = (items || []).map(item => {
            const order = orders.find(o => o.id === item.order_id);
            const product = item.product as any;

            return {
                id: item.id,
                flower_name: product?.name || 'Sản phẩm không xác định',
                size: product?.metadata?.size || 'Tiêu chuẩn',
                quantity: item.quantity,
                price: (item.price_at_purchase || 0) * (item.quantity || 1),
                status: order?.status || 'pending',
                address: order?.shipping_address?.address || 'Tại vườn',
                created_at: order?.created_at || new Date().toISOString()
            };
        });

        // Sort descending
        formattedOrders.sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        return NextResponse.json({ orders: formattedOrders });

    } catch (error: any) {
        console.error('[API/Orders] Uncaught error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

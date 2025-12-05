import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { FLOWERS, SIZES } from "@/data/flowers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            flowerId,
            flowerName,
            size,
            quantity,
            // price, // REMOVED: Do not trust client price
            customerName,
            customerPhone,
            address,
            notes
        } = body;

        // Validate required fields
        if (!flowerId || !size || !customerPhone || !address) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Security: Recalculate price on server
        const flower = FLOWERS.find(f => f.id === flowerId);
        if (!flower) {
            return NextResponse.json({ error: "Invalid flower ID" }, { status: 400 });
        }

        const basePrice = flower.basePrice;
        // @ts-ignore - Size key validation
        const multiplier = SIZES[size]?.multiplier || 1;
        const calculatedPrice = basePrice * multiplier * (quantity || 1);
        const price = calculatedPrice; // Use calculated price

        // Generate order ID
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

        // If Supabase is not configured, return demo success
        if (!isSupabaseConfigured) {
            console.log("[DEMO MODE] Order created:", { orderId, flowerId, flowerName, size, quantity, price, customerName, customerPhone });
            return NextResponse.json({
                success: true,
                orderId,
                message: "Order created (demo mode)",
                demo: true
            });
        }

        // Real Supabase flow
        const client = supabase as any;

        // Get or create user
        let { data: existingUser } = await client
            .from("users")
            .select("id")
            .eq("phone", customerPhone)
            .single();

        let userId: string | null = null;

        if (!existingUser) {
            const { data: newUser } = await client
                .from("users")
                .insert({ phone: customerPhone })
                .select("id")
                .single();
            userId = newUser?.id;
        } else {
            userId = existingUser.id;
        }

        // Create order
        const { data: order, error: orderError } = await client
            .from("orders")
            .insert({
                user_id: userId,
                flower_id: flowerId,
                flower_name: flowerName,
                size,
                quantity,
                price,
                customer_name: customerName,
                customer_phone: customerPhone,
                address,
                notes,
                status: 'pending'
            })
            .select("id")
            .single();

        if (orderError) {
            console.error("Order creation error:", orderError);
            return NextResponse.json(
                { error: "Failed to create order" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            orderId: order?.id || orderId,
            message: "Order created successfully"
        });

    } catch (error) {
        console.error("Order error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (!phone) {
        return NextResponse.json(
            { error: "Phone number required" },
            { status: 400 }
        );
    }

    if (!isSupabaseConfigured) {
        return NextResponse.json({
            orders: [],
            demo: true
        });
    }

    const client = supabase as any;

    const { data: orders, error } = await client
        .from("orders")
        .select("*")
        .eq("customer_phone", phone)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }

    return NextResponse.json({ orders });
}

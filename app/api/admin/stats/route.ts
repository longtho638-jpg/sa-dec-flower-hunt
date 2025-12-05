import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    if (!isSupabaseConfigured) {
        // Demo mode
        return NextResponse.json({
            orders: [
                {
                    id: "demo-1",
                    flower_name: "Cúc Mâm Xôi",
                    size: "M",
                    quantity: 2,
                    price: 450000,
                    status: "pending",
                    customer_name: "Nguyễn Văn A",
                    customer_phone: "0901234567",
                    address: "123 Nguyễn Huệ, Q1, TP.HCM",
                    created_at: new Date().toISOString()
                },
                {
                    id: "demo-2",
                    flower_name: "Hoa Hồng Sa Đéc",
                    size: "L",
                    quantity: 1,
                    price: 240000,
                    status: "delivered",
                    customer_name: "Trần Thị B",
                    customer_phone: "0909876543",
                    address: "456 Lê Lợi, Q3, TP.HCM",
                    created_at: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: "demo-3",
                    flower_name: "Mai Vàng",
                    size: "XL",
                    quantity: 1,
                    price: 600000,
                    status: "shipped",
                    customer_name: "Lê Văn C",
                    customer_phone: "0912345678",
                    address: "789 Trần Hưng Đạo, Q5, TP.HCM",
                    created_at: new Date(Date.now() - 3600000).toISOString()
                }
            ],
            users: 156,
            partners: 8,
            demo: true
        });
    }

    const client = supabase as any;

    // Fetch all orders
    const { data: orders, error: ordersError } = await client
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    // Fetch user count
    const { count: userCount } = await client
        .from("users")
        .select("*", { count: 'exact', head: true });

    // Fetch partner count
    const { count: partnerCount } = await client
        .from("gardens")
        .select("*", { count: 'exact', head: true });

    if (ordersError) {
        console.error("Fetch error:", ordersError);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    return NextResponse.json({
        orders: orders || [],
        users: userCount || 0,
        partners: partnerCount || 0
    });
}

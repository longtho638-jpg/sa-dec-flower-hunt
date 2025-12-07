"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, DollarSign, Users, Activity, CreditCard } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function LiveMetrics() {
    const [metrics, setMetrics] = useState({
        revenue: 45231000,
        orders: 2350,
        activeUsers: 573,
        conversionRate: 12.5
    })
    const [changes, setChanges] = useState({
        revenue: "+20.1%",
        orders: "+180.1%",
        activeUsers: "+201",
        conversionRate: "+19%"
    })

    useEffect(() => {
        if (!supabase) return;
        // Realtime subscription for Orders
        const channel = supabase
            .channel('admin_dashboard')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload: any) => {
                    const newOrderAmount = payload.new.total_price || 0
                    setMetrics(prev => ({
                        ...prev,
                        orders: prev.orders + 1,
                        revenue: prev.revenue + newOrderAmount
                    }))
                }
            )
            .subscribe()

        return () => {
            supabase?.removeChannel(channel)
        }
    }, [])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-stone-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
                    <DollarSign className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(metrics.revenue)}</div>
                    <p className="text-xs text-stone-500 flex items-center">
                        <span className="text-green-500 flex items-center mr-1">{changes.revenue} <ArrowUpRight className="h-3 w-3" /></span> so với tháng trước
                    </p>
                </CardContent>
            </Card>
            <Card className="border-stone-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Đơn Hàng</CardTitle>
                    <CreditCard className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{metrics.orders}</div>
                    <p className="text-xs text-stone-500 flex items-center">
                        <span className="text-green-500 flex items-center mr-1">{changes.orders} <ArrowUpRight className="h-3 w-3" /></span> so với tháng trước
                    </p>
                </CardContent>
            </Card>
            <Card className="border-stone-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Đang Hoạt Động</CardTitle>
                    <Activity className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{metrics.activeUsers}</div>
                    <p className="text-xs text-stone-500 flex items-center">
                        <span className="text-green-500 flex items-center mr-1">{changes.activeUsers} <ArrowUpRight className="h-3 w-3" /></span> kể từ giờ trước
                    </p>
                </CardContent>
            </Card>
            <Card className="border-stone-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tỷ Lệ Chuyển Đổi</CardTitle>
                    <Users className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
                    <p className="text-xs text-stone-500 flex items-center">
                        <span className="text-green-500 flex items-center mr-1">{changes.conversionRate} <ArrowUpRight className="h-3 w-3" /></span> so với tuần trước
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

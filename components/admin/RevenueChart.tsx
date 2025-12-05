"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
    {
        name: "T2",
        total: Math.floor(Math.random() * 5000000) + 1000000,
    },
    {
        name: "T3",
        total: Math.floor(Math.random() * 5000000) + 1000000,
    },
    {
        name: "T4",
        total: Math.floor(Math.random() * 5000000) + 1000000,
    },
    {
        name: "T5",
        total: Math.floor(Math.random() * 5000000) + 1000000,
    },
    {
        name: "T6",
        total: Math.floor(Math.random() * 5000000) + 1000000,
    },
    {
        name: "T7",
        total: Math.floor(Math.random() * 5000000) + 1000000,
    },
    {
        name: "CN",
        total: Math.floor(Math.random() * 5000000) + 1000000,
    },
]

export function RevenueChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                    formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

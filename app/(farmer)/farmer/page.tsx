"use client";

import { useState, useEffect } from "react";
import { useFarmer } from "@/components/auth/FarmerAuthProvider";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { TerminalHeader } from "@/components/terminal/TerminalHeader";
import { DataStream } from "@/components/terminal/DataStream";
import { SystemLog } from "@/components/terminal/SystemLog";
import { NodePulse } from "@/components/terminal/NodePulse";
import { Button } from "@/components/ui/button";
import { Terminal, DollarSign, TrendingUp, Droplets, ThermometerSun, Leaf, CreditCard, Package, Boxes, } from "lucide-react";
import { motion } from "framer-motion";

export default function FarmerTerminal() {
    const { profile, totalRevenue, pendingOrders, dailyRevenue } = useFarmer();
    const [currentTime, setCurrentTime] = useState("");
    const [systemLogs, setSystemLogs] = useState<any[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        }, 1000);

        // Initialize system logs
        const initialLogs = [
            { timestamp: getCurrentTime(), message: `OPERATOR_${profile.farmerName || 'UNKNOWN'} authenticated`, type: "success" as const },
            { timestamp: getCurrentTime(1), message: `Farm location: Sa Đéc, Đồng Tháp`, type: "info" as const },
            { timestamp: getCurrentTime(2), message: `IoT sensors: 14 active`, type: "success" as const },
            { timestamp: getCurrentTime(3), message: `Credit score updated: AA-`, type: "success" as const },
            { timestamp: getCurrentTime(4), message: `System nominal`, type: "info" as const },
        ];
        setSystemLogs(initialLogs);

        // Simulate ongoing activity
        const logInterval = setInterval(() => {
            const newLog = generateRandomLog();
            setSystemLogs(prev => [...prev, newLog].slice(-10));
        }, 8000);

        return () => {
            clearInterval(timer);
            clearInterval(logInterval);
        };
    }, [profile]);

    const getCurrentTime = (offset = 0) => {
        const now = new Date();
        now.setSeconds(now.getSeconds() + offset);
        return now.toLocaleTimeString("en-US", { hour12: false });
    };

    const generateRandomLog = () => {
        const events = [
            `New order received: #${Math.floor(Math.random() * 1000)}`,
            `Sensor reading: Temperature optimal`,
            `Irrigation cycle completed`,
            `Harvest quality check: PASS`,
            `Bank sync: Credit score stable`,
        ];
        return {
            timestamp: getCurrentTime(),
            message: events[Math.floor(Math.random() * events.length)],
            type: "info" as const,
        };
    };

    const formatVND = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

    // Mock IoT sensor data
    const sensorData = {
        temperature: 28.4,
        humidity: 62,
        soilPH: 6.5,
        soilMoisture: 72,
        lightLevel: 85,
        windSpeed: 12,
    };

    // Mock credit score
    const creditScore = {
        grade: "AA-",
        score: 850,
        trend: "up" as const,
        lastUpdate: "2 giờ trước",
    };

    return (
        <div className="min-h-screen bg-black text-emerald-400 font-mono p-4 md:p-6 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            {/* Header HUD */}
            <motion.header
                className="mb-6 border-b border-emerald-900/50 pb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 border border-emerald-500/30 flex items-center justify-center bg-emerald-900/20">
                            <Terminal className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white">
                                FARM_TERMINAL<span className="text-emerald-500">_v4.0</span>
                            </h1>
                            <div className="flex gap-4 text-[10px] text-stone-500 mt-1">
                                <span>OPERATOR: <span className="text-emerald-400">{profile.farmerName || "FARMER"}</span></span>
                                <span>TIME: <span className="text-white">{currentTime}</span></span>
                                <span className="flex items-center gap-1">
                                    <NodePulse size="sm" color="emerald" />
                                    ONLINE
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Grid */}
            <div className="space-y-6">
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Revenue */}
                    <TerminalCard glowOnHover>
                        <TerminalHeader status="online">REVENUE_STREAM</TerminalHeader>
                        <div className="space-y-3">
                            <div className="text-3xl font-bold text-white">{formatVND(totalRevenue)}</div>
                            <div className="grid grid-cols-2 gap-2">
                                <DataStream label="WEEK" value={formatVND(totalRevenue * 0.15)} trend="up" />
                                <DataStream label="MONTH" value={formatVND(totalRevenue * 0.45)} trend="up" />
                            </div>
                        </div>
                    </TerminalCard>

                    {/* Orders */}
                    <TerminalCard glowOnHover>
                        <TerminalHeader status="warning" statusLabel="PENDING">ORDERS_QUEUE</TerminalHeader>
                        <div className="space-y-3">
                            <div className="text-3xl font-bold text-white">{pendingOrders} <span className="text-sm text-stone-500">UNITS</span></div>
                            <div className="grid grid-cols-2 gap-2">
                                <DataStream label="TODAY" value={Math.floor(pendingOrders * 0.4)} />
                                <DataStream label="URGENT" value={Math.floor(pendingOrders * 0.1)} trend="down" />
                            </div>
                        </div>
                    </TerminalCard>

                    {/* Bank Node - Credit Score */}
                    <TerminalCard glowOnHover className="border-emerald-500/40 bg-emerald-950/10">
                        <TerminalHeader status="online">BANK_NODE_LINK</TerminalHeader>
                        <div className="space-y-3">
                            <div className="flex items-baseline gap-2">
                                <div className="text-3xl font-bold text-emerald-400">{creditScore.grade}</div>
                                <div className="text-sm text-stone-500">Credit Score</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <DataStream label="SCORE" value={creditScore.score} trend={creditScore.trend} />
                                <div className="bg-emerald-900/20 p-2 rounded border border-emerald-500/10">
                                    <div className="text-[10px] text-stone-500">UPDATED</div>
                                    <div className="text-xs text-white">{creditScore.lastUpdate}</div>
                                </div>
                            </div>
                        </div>
                    </TerminalCard>
                </div>

                {/* IOT Sensors Panel & System Log */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* IOT Sensors (Large) */}
                    <TerminalCard className="lg:col-span-2">
                        <TerminalHeader status="online">IOT_SENSOR_NETWORK (14 ACTIVE)</TerminalHeader>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            <DataStream label="TEMP" value={sensorData.temperature} unit="°C" trend="neutral" />
                            <DataStream label="HUMIDITY" value={sensorData.humidity} unit="%" />
                            <DataStream label="SOIL_PH" value={sensorData.soilPH} trend="neutral" />
                            <DataStream label="MOISTURE" value={sensorData.soilMoisture} unit="%" trend="up" />
                            <DataStream label="LIGHT" value={sensorData.lightLevel} unit="%" />
                            <DataStream label="WIND" value={sensorData.windSpeed} unit="km/h" />
                        </div>
                        <div className="mt-4 p-3 bg-emerald-900/10 border border-emerald-500/20 rounded text-xs text-emerald-300">
                            <span className="text-emerald-500">⚡ AI RECOMMENDATION:</span> All parameters optimal. Suggest maintain current irrigation schedule.
                        </div>
                    </TerminalCard>

                    {/* System Log */}
                    <TerminalCard>
                        <TerminalHeader status="online">SYSTEM_LOG</TerminalHeader>
                        <div className="mt-4">
                            <SystemLog entries={systemLogs} maxEntries={8} />
                        </div>
                    </TerminalCard>
                </div>

                {/* Revenue Data Streams (replacing chart) */}
                <TerminalCard>
                    <TerminalHeader status="online">REVENUE_BREAKDOWN (LIVE)</TerminalHeader>
                    <div className="mt-4">
                        {dailyRevenue.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                                {dailyRevenue.slice(-7).map((item, i) => (
                                    <DataStream
                                        key={i}
                                        label={item.day}
                                        value={formatVND(item.val).replace("₫", "").replace(/\./g, "")}
                                        unit="K"
                                        trend={i > 0 && item.val > dailyRevenue[i - 1]?.val ? "up" : i > 0 ? "down" : "neutral"}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-stone-500 py-8 text-xs uppercase">NO_DATA_STREAM</div>
                        )}
                    </div>
                </TerminalCard>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-auto py-4 px-6 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-sm text-emerald-400 flex flex-col items-center gap-2 font-mono">
                        <Package className="w-5 h-5" />
                        <span className="text-[10px] uppercase tracking-wider">New Product</span>
                    </Button>
                    <Button className="h-auto py-4 px-6 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-sm text-emerald-400 flex flex-col items-center gap-2 font-mono">
                        <Boxes className="w-5 h-5" />
                        <span className="text-[10px] uppercase tracking-wider">View Orders</span>
                    </Button>
                    <Button className="h-auto py-4 px-6 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-sm text-emerald-400 flex flex-col items-center gap-2 font-mono">
                        <CreditCard className="w-5 h-5" />
                        <span className="text-[10px] uppercase tracking-wider">Finance</span>
                    </Button>
                    <Button className="h-auto py-4 px-6 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-sm text-emerald-400 flex flex-col items-center gap-2 font-mono">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-[10px] uppercase tracking-wider">Analytics</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

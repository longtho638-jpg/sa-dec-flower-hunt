"use client";

import { useEffect, useState } from "react";
import { Terminal, Activity, TrendingUp, Wifi, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface LiveStats {
    nodesActive: number;
    volumeToday: number;
    systemStatus: "NOMINAL" | "WARNING" | "CRITICAL";
    uptime: string;
}

export function AdminTerminalHUD() {
    const [currentTime, setCurrentTime] = useState("");
    const [stats, setStats] = useState<LiveStats>({
        nodesActive: 1402,
        volumeToday: 2400000,
        systemStatus: "NOMINAL",
        uptime: "99.9%"
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }));
        }, 1000);

        // Simulate live stats updates
        const statsTimer = setInterval(() => {
            setStats(prev => ({
                ...prev,
                nodesActive: prev.nodesActive + Math.floor(Math.random() * 3) - 1,
                volumeToday: prev.volumeToday + Math.floor(Math.random() * 10000)
            }));
        }, 5000);

        return () => {
            clearInterval(timer);
            clearInterval(statsTimer);
        };
    }, []);

    const formatCurrency = (n: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            notation: "compact",
            maximumFractionDigits: 1
        }).format(n);

    const statusColor = {
        NOMINAL: "text-emerald-400",
        WARNING: "text-yellow-400",
        CRITICAL: "text-red-400"
    };

    const statusBg = {
        NOMINAL: "bg-emerald-500",
        WARNING: "bg-yellow-500",
        CRITICAL: "bg-red-500"
    };

    return (
        <motion.header
            className="bg-stone-950 border-b border-emerald-900/50 px-6 py-3 font-mono"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Left: Brand */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 border border-emerald-500/30 flex items-center justify-center bg-emerald-900/20">
                            <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-[0.15em] text-white">
                                SADEC<span className="text-emerald-400">.OS</span>
                            </h1>
                            <div className="text-[10px] text-stone-500 tracking-wider">
                                ADMIN_TERMINAL v4.0
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Live Stats */}
                <div className="flex items-center gap-6 text-xs">
                    {/* Nodes Active */}
                    <div className="flex items-center gap-2 bg-stone-900/50 px-3 py-1.5 rounded border border-stone-800">
                        <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-stone-400">NODES:</span>
                        <span className="text-white font-bold">{stats.nodesActive.toLocaleString()}</span>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center gap-2 bg-stone-900/50 px-3 py-1.5 rounded border border-stone-800">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-stone-400">VOLUME:</span>
                        <span className="text-emerald-400 font-bold">{formatCurrency(stats.volumeToday)}</span>
                    </div>

                    {/* Uptime */}
                    <div className="flex items-center gap-2 bg-stone-900/50 px-3 py-1.5 rounded border border-stone-800">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-stone-400">UPTIME:</span>
                        <span className="text-white font-bold">{stats.uptime}</span>
                    </div>
                </div>

                {/* Right: System Status */}
                <div className="flex items-center gap-4">
                    {/* Time */}
                    <div className="text-xs text-stone-500">
                        <span className="text-stone-400">TIME:</span>{" "}
                        <span className="text-white font-mono">{currentTime}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 bg-emerald-900/20 px-3 py-1.5 rounded border border-emerald-500/30">
                        <div className={`w-2 h-2 rounded-full ${statusBg[stats.systemStatus]} animate-pulse`} />
                        <Shield className={`w-3.5 h-3.5 ${statusColor[stats.systemStatus]}`} />
                        <span className={`text-xs font-bold ${statusColor[stats.systemStatus]}`}>
                            SYSTEM: {stats.systemStatus}
                        </span>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}

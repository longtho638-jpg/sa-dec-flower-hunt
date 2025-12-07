"use client";

import { motion } from "framer-motion";
import { CreditScoreVisual, InventoryVisual, LogisticsMapVisual } from "@/components/ui/node-visuals";
import { StreamingChart, DnaSpinner, GlobeNetwork } from "@/components/ui/animated-charts";
import { LiveTicker } from "@/components/ui/live-ticker";
import { Activity, Server, Users, DollarSign, Database, Terminal } from "lucide-react";

export default function AdminTerminalPage() {
    return (
        <div className="min-h-screen bg-black text-emerald-400 font-mono p-6 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            {/* HUD Header */}
            <header className="flex items-center justify-between mb-8 border-b border-emerald-900/50 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-emerald-500/30 flex items-center justify-center bg-emerald-900/20">
                        <Terminal className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-[0.2em] text-white">COMMAND_CENTER<span className="text-emerald-500">_v3.0</span></h1>
                        <div className="flex gap-4 text-xs text-stone-500 mt-1 uppercase">
                            <span>Status: <span className="text-emerald-400">ONLINE</span></span>
                            <span>Uptime: <span className="text-emerald-400">99.99%</span></span>
                            <span>Latency: <span className="text-emerald-400">12ms</span></span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-8 text-right">
                    <div>
                        <div className="text-[10px] text-stone-500 uppercase">Total Revenue</div>
                        <div className="text-xl font-bold text-white">$2,402,194.00</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-stone-500 uppercase">Active Nodes</div>
                        <div className="text-xl font-bold text-white">1,402</div>
                    </div>
                </div>
            </header>

            {/* Main Grid: 5-Node Ecosystem */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[600px] mb-8">

                {/* 1. BANKS (Top Left) */}
                <div className="col-span-1 bg-stone-900/40 border border-emerald-500/20 p-4 relative flex flex-col group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><DollarSign className="w-4 h-4" /> FINTECH_NODE</h3>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex-1 relative overflow-hidden rounded border border-emerald-500/10 bg-black/50">
                        <CreditScoreVisual />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
                        <div className="bg-emerald-900/20 p-2 rounded">
                            <div className="text-stone-500">LOANS_ACTIVE</div>
                            <div className="text-white font-bold">$840K</div>
                        </div>
                        <div className="bg-emerald-900/20 p-2 rounded">
                            <div className="text-stone-500">RISK_RATIO</div>
                            <div className="text-emerald-400 font-bold">0.4%</div>
                        </div>
                    </div>
                </div>

                {/* 2. SUPPLIERS (Top Left-Center) */}
                <div className="col-span-1 bg-stone-900/40 border border-emerald-500/20 p-4 relative flex flex-col group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Database className="w-4 h-4" /> SUPPLY_NODE</h3>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex-1 relative overflow-hidden rounded border border-emerald-500/10 bg-black/50">
                        <InventoryVisual />
                    </div>
                    <div className="mt-4 text-[10px] bg-emerald-900/20 p-2 rounded">
                        <span className="text-stone-500">RESTOCK_ALERT:</span> <span className="text-amber-400">NPK-20 (LOW)</span>
                    </div>
                </div>

                {/* 3. FARMERS (Center Large) */}
                <div className="col-span-2 row-span-2 bg-stone-900/40 border border-emerald-500/20 p-4 relative flex flex-col group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Server className="w-4 h-4" /> PRODUCTION_CORE</h3>
                        <div className="flex items-center gap-2 text-[10px] text-stone-500">
                            <span>SENSORS: 14,200</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden rounded border border-emerald-500/10 bg-black/50 mb-4 h-64">
                        <StreamingChart />
                        <div className="absolute top-2 left-2 text-[10px] text-emerald-500 font-mono">REAL-TIME YIELD PREDICTION</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-emerald-900/10 border border-emerald-500/10 p-3">
                            <div className="text-[10px] text-stone-500 mb-1">AVG_TEMP</div>
                            <div className="text-xl text-white font-bold">28.4°C</div>
                        </div>
                        <div className="bg-emerald-900/10 border border-emerald-500/10 p-3">
                            <div className="text-[10px] text-stone-500 mb-1">SOIL_MOISTURE</div>
                            <div className="text-xl text-white font-bold">62%</div>
                        </div>
                        <div className="bg-emerald-900/10 border border-emerald-500/10 p-3">
                            <div className="text-[10px] text-stone-500 mb-1">HARVEST_READY</div>
                            <div className="text-xl text-emerald-400 font-bold">4.2 Tons</div>
                        </div>
                    </div>
                </div>

                {/* 4. LOGISTICS (Bottom Left) */}
                <div className="col-span-1 bg-stone-900/40 border border-emerald-500/20 p-4 relative flex flex-col group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Activity className="w-4 h-4" /> LOGISTICS_NET</h3>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex-1 relative overflow-hidden rounded border border-emerald-500/10 bg-black/50">
                        <LogisticsMapVisual />
                    </div>
                </div>

                {/* 5. BUYERS (Bottom Left-Center) */}
                <div className="col-span-1 bg-stone-900/40 border border-emerald-500/20 p-4 relative flex flex-col group hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Users className="w-4 h-4" /> MARKET_DEMAND</h3>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex-1 relative overflow-hidden rounded border border-emerald-500/10 bg-black/50 flex items-center justify-center">
                        <GlobeNetwork />
                    </div>
                    <div className="mt-4 text-[10px] text-center text-stone-500">
                        GLOBAL_TRAFFIC: <span className="text-white">24K/hr</span>
                    </div>
                </div>

            </div>

            {/* Live System Log */}
            <div className="border border-emerald-500/20 bg-stone-950 p-4 font-mono text-[10px] h-32 overflow-hidden relative">
                <div className="absolute top-2 right-2 text-emerald-700">SYSTEM_LOG</div>
                <div className="space-y-1 text-emerald-500/60">
                    <div>[11:02:41] BANK_NODE: Credit check approved for FARM_ID_928 (Score: 840)</div>
                    <div>[11:02:38] SENSOR_NET: Alert resolved - Sector 4 Humidity Normalized</div>
                    <div>[11:02:35] MARKET: New Order #92837 from SG_BUYER ($4,200)</div>
                    <div>[11:02:32] LOGISTICS: Truck #42 Arrived at HUB_CENTRAL</div>
                    <div className="animate-pulse">[11:02:30] SYSTEM: 5-Node Sync Complete...</div>
                </div>
            </div>

            {/* Floating Ticker */}
            <div className="fixed bottom-0 left-64 right-0 z-50">
                <LiveTicker />
            </div>
        </div>
    );
}

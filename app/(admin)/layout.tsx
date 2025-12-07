import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, TrendingUp, Settings, Activity } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-stone-950 text-white font-mono flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-stone-800 bg-stone-950 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-stone-800">
                    <h1 className="text-xl font-bold text-green-500 tracking-wider flex items-center gap-2">
                        <Activity className="w-6 h-6" />
                        NEXUS OS
                    </h1>
                    <p className="text-stone-500 text-xs mt-1">v4.0.1 Autonomous</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-stone-900/50 text-green-400 rounded-lg border border-stone-800 hover:bg-stone-900 transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-bold">Command Center</span>
                    </Link>
                    <Link href="/org-chart" className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:bg-stone-900/30 hover:text-stone-200 rounded-lg transition-colors group">
                        <Users className="w-5 h-5 group-hover:text-green-400 transition-colors" />
                        <span className="group-hover:text-white transition-colors">The Machine (Org)</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:bg-stone-900/30 hover:text-stone-200 rounded-lg transition-colors">
                        <TrendingUp className="w-5 h-5" />
                        <span>Growth Metrics</span>
                    </Link>
                    <Link href="/marketing" className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:bg-stone-900/30 hover:text-stone-200 rounded-lg transition-colors hover:text-pink-400">
                        <TrendingUp className="w-5 h-5 text-pink-500" />
                        <span>Marketing & Viral</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:bg-stone-900/30 hover:text-stone-200 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                        <span>System Config</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-stone-800">
                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-900/30 rounded-lg border border-stone-800/50">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <div>
                            <p className="text-xs text-stone-400">System Status</p>
                            <p className="text-sm font-bold text-green-500">OPERATIONAL</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 bg-stone-950 min-h-screen">
                {children}
            </main>
        </div>
    );
}

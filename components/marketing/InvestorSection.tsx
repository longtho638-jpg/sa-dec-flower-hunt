"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Shield, FileText, ArrowRight, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PARTNER_LOGOS = [
    { name: "Agribank", type: "bank" },
    { name: "HDBank", type: "bank" },
    { name: "GHTK", type: "logistics" },
    { name: "VNPost", type: "logistics" },
    { name: "Saigon Co.op", type: "retail" },
];

const LIVE_STATS = [
    { label: "GMV Total", value: "₫2.4B", icon: DollarSign, color: "emerald" },
    { label: "Nợ xấu", value: "0.8%", icon: Shield, color: "green" },
    { label: "Retention", value: "97%", icon: Users, color: "cyan" },
    { label: "MoM Growth", value: "+23%", icon: TrendingUp, color: "amber" },
];

export function InvestorSection() {
    return (
        <section className="py-16 border-t border-emerald-500/10">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-mono mb-2">
                        🏦 ĐỐI TÁC & NHÀ ĐẦU TƯ
                    </p>
                    <h2 className="text-2xl font-light text-white">
                        Xây dựng cùng <span className="text-emerald-400 font-bold font-mono">SADEC.OS</span>
                    </h2>
                </div>

                {/* Partner Logos */}
                <div className="mb-12">
                    <p className="text-[10px] text-stone-600 uppercase tracking-widest font-mono text-center mb-4">
                        Đối tác tiềm năng<span className="text-stone-700 ml-2">[đang đàm phán]</span>
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        {PARTNER_LOGOS.map((partner, i) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-6 py-3 bg-stone-900/50 border border-stone-800 rounded-lg text-stone-400 text-sm font-mono hover:border-emerald-500/30 hover:text-white transition-all cursor-pointer"
                            >
                                {partner.name}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
                    {LIVE_STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="text-center p-4 bg-black/40 border border-emerald-500/10 rounded-lg"
                        >
                            <stat.icon className={`w-5 h-5 mx-auto mb-2 text-${stat.color}-500`} />
                            <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                            <div className="text-[10px] text-stone-500 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Investor CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-xl mx-auto bg-gradient-to-r from-amber-950/30 to-amber-900/20 border border-amber-500/30 rounded-lg p-8 text-center"
                >
                    <Building2 className="w-10 h-10 mx-auto mb-4 text-amber-500" />
                    <h3 className="text-xl font-bold text-white mb-2">Dành cho Nhà Đầu Tư</h3>
                    <p className="text-stone-400 text-sm mb-6">
                        Tham gia xây dựng hệ sinh thái nông nghiệp số lớn nhất Đồng bằng sông Cửu Long
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/investor/deck">
                            <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs tracking-wider">
                                <FileText className="w-4 h-4 mr-2" />
                                XEM PITCH DECK
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="border-amber-500/50 text-amber-400 hover:bg-amber-950/50 font-mono text-xs tracking-wider"
                        >
                            LIÊN HỆ ĐẦU TƯ
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

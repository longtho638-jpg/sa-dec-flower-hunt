"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Layers, Code, Leaf, Dna, Database, Globe, TrendingUp, Activity } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { MarketingConfig } from "@/lib/marketing";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { KineticText, TypewriterEffect } from "@/components/ui/kinetic-text";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlitchButton } from "@/components/ui/glitch-button";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { LiveTicker } from "@/components/ui/live-ticker";
import { NeuralNetwork } from "@/components/ui/neural-network";
import { StreamingChart, DnaSpinner, GlobeNetwork } from "@/components/ui/animated-charts";
import { CreditScoreVisual, InventoryVisual, LogisticsMapVisual } from "@/components/ui/node-visuals";

import { useLanguage } from "@/lib/i18n";

interface LandingPageProps {
    config: MarketingConfig;
}

export function LandingPageClient({ config }: LandingPageProps) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <AuroraBackground className="overflow-x-hidden selection:bg-emerald-500/30">
            <LiveTicker />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

            <div className="relative z-10 w-full min-h-screen flex flex-col font-sans mb-10">
                {/* Enterprise Header */}
                <header className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-40">
                    <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center">
                                <span className="text-xs">💠</span>
                            </div>
                            <div>
                                <h1 className="text-sm font-bold tracking-[0.2em] font-mono text-white">SADEC<span className="text-emerald-500">.OS</span></h1>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-stone-500 tracking-widest uppercase">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>{t("common.sys_nominal")}</span>
                            </div>
                            <span className="hover:text-emerald-400 cursor-pointer transition-colors">{t("common.nodes")}: 1,402</span>
                            <span className="hover:text-emerald-400 cursor-pointer transition-colors">{t("common.volume")}: $2.4M</span>
                        </div>

                        <Button
                            onClick={() => setIsLoginModalOpen(true)}
                            variant="outline"
                            className="bg-emerald-900/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 font-mono text-[10px] tracking-widest h-8"
                        >
                            {t("nav.login_terminal")}
                        </Button>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col container mx-auto px-6 pt-16 pb-32 relative">
                    {/* Neural Network Overlay */}
                    <div className="absolute inset-0 -z-10 h-[800px] overflow-hidden pointer-events-none">
                        <NeuralNetwork />
                    </div>

                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                        <div className="flex flex-col text-left relative z-20">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-3 mb-6"
                            >
                                <div className="h-[1px] w-8 bg-emerald-500/50"></div>
                                <span className="text-[10px] font-mono text-emerald-400 tracking-[0.3em] uppercase">
                                    {t("landing.hero.badge")}
                                </span>
                            </motion.div>

                            <div className="mb-6">
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2 font-mono">
                                    {t("landing.hero.title_prefix")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">{t("landing.hero.title_highlight")}</span>
                                </h1>
                                <p className="text-stone-500 font-mono text-sm tracking-widest uppercase">
                                    {t("landing.hero.subtitle")}
                                </p>
                            </div>

                            <h2 className="text-xl text-stone-300 font-light mb-8 max-w-xl leading-relaxed border-l-2 border-emerald-500/20 pl-4"
                                dangerouslySetInnerHTML={{ __html: t("landing.mission") }}
                            />

                            <div className="flex flex-col sm:flex-row gap-4">
                                <GlitchButton text={t("landing.cta.capital")} onClick={() => setIsLoginModalOpen(true)} className="w-52 bg-emerald-600 hover:bg-emerald-500 font-mono text-xs tracking-widest" />
                                <Button size="lg" variant="ghost" className="text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 px-6 rounded-none font-mono text-xs tracking-widest">
                                    <Activity className="mr-2 w-4 h-4" /> VIEW_DECK.PDF
                                </Button>
                            </div>
                        </div>

                        {/* Data Visualization / Digital Twin Abstract */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative hidden lg:block h-[500px] w-full"
                        >
                            <div className="absolute inset-0 bg-black/60 rounded-sm border border-emerald-500/20 backdrop-blur-sm overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan" />

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-emerald-500/10 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                                    <div className="w-full h-full border-t border-emerald-500/30 rounded-full" />
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/10 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                                    <div className="w-full h-full border-b border-emerald-500/30 rounded-full" />
                                </div>

                                {/* Center Stats */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                                    <div className="text-4xl font-mono font-bold text-white tracking-tighter">1,402</div>
                                    <div className="text-[9px] text-emerald-500 uppercase tracking-widest font-mono">Active Nodes</div>
                                </div>

                                {/* Floating Stats Cards - "Trading Style" */}
                                <div className="absolute top-10 right-10 bg-black/80 border border-emerald-500/30 p-3 w-40">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-[9px] text-stone-500 uppercase">YIELD</div>
                                        <div className="text-[9px] text-emerald-400">▲ 24%</div>
                                    </div>
                                    <div className="h-10 w-full bg-emerald-900/20 relative overflow-hidden">
                                        <StreamingChart />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Value Chain Pillars - Bento Grid */}
                    <div className="mt-20">
                        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
                            <div>
                                <h2 className="text-[10px] font-mono text-emerald-500 tracking-[0.2em] uppercase mb-2">FULL STACK ECOSYSTEM</h2>
                                <h3 className="text-2xl font-light text-white tracking-wide">THE <span className="font-mono text-emerald-400 font-bold">UNIFIED</span> NODE ARCHITECTURE</h3>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-[10px] text-stone-500 font-mono">SYSTEM COVERAGE</div>
                                <div className="text-xl text-white font-mono">5 KEY NODES</div>
                            </div>
                        </div>

                        <BentoGrid className="max-w-7xl mx-auto">
                            {/* Node 1: Banks (Fintech) */}
                            <BentoGridItem
                                title="NGÂN HÀNG (FINTECH)"
                                description={<span className="text-[11px]">Feature: <b>Tín Dụng Xanh (Green Credit)</b><br /><span className="text-stone-500">Data: Risk assessment based on IoT sensor data (Smart Contract).</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><CreditScoreVisual /></div>}
                                icon={<TrendingUp className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm"
                            />

                            {/* Node 2: Suppliers */}
                            <BentoGridItem
                                title="NHÀ CUNG CẤP (SUPPLIERS)"
                                description={<span className="text-[11px]">Feature: <b>Marketplace Vật Tư</b><br /><span className="text-stone-500">Data: Real-time inventory & price matching.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><InventoryVisual /></div>}
                                icon={<Layers className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm"
                            />

                            {/* Node 3: Farmers (Production) - Centerpiece */}
                            <BentoGridItem
                                title="NHÀ VƯỜN (FARMERS)"
                                description={<span className="text-[11px]">Feature: <b>Canh Tác Chính Xác (Precision Farming)</b><br /><span className="text-stone-500">Data: Real-time Growth Monitoring & Automated Care.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><StreamingChart /></div>}
                                icon={<Leaf className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-2 bg-black/60 border-emerald-500/20 rounded-sm"
                            />

                            {/* Node 4: Logistics */}
                            <BentoGridItem
                                title="VẬN CHUYỂN (LOGISTICS)"
                                description={<span className="text-[11px]">Feature: <b>Chuỗi Cung Ứng Lạnh</b><br /><span className="text-stone-500">Data: Temperature/Humidity tracking during transport.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><LogisticsMapVisual /></div>}
                                icon={<Activity className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-2 bg-black/60 border-emerald-500/20 rounded-sm"
                            />

                            {/* Node 5: Buyers/Users */}
                            <BentoGridItem
                                title="NGƯỜI DÙNG (BUYERS)"
                                description={<span className="text-[11px]">Feature: <b>Trải Nghiệm Thực Tế Ảo (Metaverse)</b><br /><span className="text-stone-500">Data: Immersive AR Shopping & Traceability.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40 flex items-center justify-center"><Globe className="w-10 h-10 text-emerald-500/50" /></div>}
                                icon={<QrCode className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm"
                            />

                            {/* R&D Foundation (Bonus) */}
                            <BentoGridItem
                                title="R&D / GENETICS"
                                description={<span className="text-[11px]">Core: <b>Công Nghệ Giống</b><br /><span className="text-stone-500">Data: DNA Sequencing & IP Protection.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><DnaSpinner /></div>}
                                icon={<Dna className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm"
                            />
                        </BentoGrid>
                    </div>
                </main>

                <footer className="border-t border-emerald-900/30 py-6 text-center text-[9px] text-emerald-900/60 font-mono bg-black/90 backdrop-blur-xl mb-10">
                    SADEC.OS ENTERPRISE TERMINAL // COPYRIGHT 2026 // ALL TRADES FINAL
                </footer>
            </div>
        </AuroraBackground>
    );
}

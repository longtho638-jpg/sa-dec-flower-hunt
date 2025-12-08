"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, Layers, Code, Leaf, Dna, Database, Globe, TrendingUp, Activity, ShoppingBag } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { MarketingConfig } from "@/lib/marketing";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlitchButton } from "@/components/ui/glitch-button";
import { LiveTicker } from "@/components/ui/live-ticker";
import { NeuralNetwork } from "@/components/ui/neural-network";
import { StreamingChart, DnaSpinner } from "@/components/ui/animated-charts";
import { CreditScoreVisual, InventoryVisual, LogisticsMapVisual } from "@/components/ui/node-visuals";
import { LeadWizard } from "@/components/marketing/LeadWizard";
import { StakeholderSelector } from "@/components/marketing/StakeholderSelector";
import { TrustBadgesSection } from "@/components/marketing/TrustBadgesSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { StakeholderCTABlocks } from "@/components/marketing/StakeholderCTABlocks";
import { FAQSection } from "@/components/marketing/FAQSection";
import { FloatingAgentButton } from "@/components/marketing/FloatingAgentButton";
import { FestivalBanner } from "@/components/marketing/FestivalBanner";
import { ROICalculator } from "@/components/marketing/ROICalculator";
import { PricingSection } from "@/components/marketing/PricingSection";
import { InvestorSection } from "@/components/marketing/InvestorSection";
import { GovernmentSection } from "@/components/marketing/GovernmentSection";
import { PressSection } from "@/components/marketing/PressSection";
import { LiveCounters } from "@/components/marketing/LiveCounters";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { SuccessTimeline } from "@/components/marketing/SuccessTimeline";
import { UrgencyBanner } from "@/components/marketing/UrgencyBanner";
import { InlineAgentWidget } from "@/components/marketing/InlineAgentWidget";

import { useLanguage } from "@/lib/i18n";

interface LandingPageProps {
    config: MarketingConfig;
}

export function LandingPageClient({ config }: LandingPageProps) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLeadWizardOpen, setIsLeadWizardOpen] = useState(false);
    const [initialRole, setInitialRole] = useState<"farmer" | "buyer" | "bank" | "supplier" | "logistics" | "research" | "government" | "media" | undefined>();
    const { t } = useLanguage();

    const handleOpenWizard = (role?: "farmer" | "buyer" | "bank" | "supplier" | "logistics" | "research" | "government" | "media") => {
        setInitialRole(role);
        setIsLeadWizardOpen(true);
    };

    return (
        <AuroraBackground className="overflow-x-hidden selection:bg-emerald-500/30">
            <LiveTicker />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            <LeadWizard
                isOpen={isLeadWizardOpen}
                onClose={() => setIsLeadWizardOpen(false)}
                initialRole={initialRole}
            />

            <div className="relative z-10 w-full min-h-screen flex flex-col font-sans mb-10">
                {/* Festival Promo Banner */}
                <FestivalBanner />

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

                    {/* FARMER-FIRST Hero Section */}
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
                                    🌱 Dành cho Nhà Vườn Sa Đéc
                                </span>
                            </motion.div>

                            <div className="mb-6">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                                    Bán Hoa <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Không Cần Lo</span>
                                </h1>
                                <p className="text-stone-400 text-lg mb-2">
                                    Chúng tôi lo <strong className="text-white">marketing</strong>, <strong className="text-white">vận chuyển</strong>, <strong className="text-white">thu tiền</strong>.
                                </p>
                                <p className="text-stone-500 text-sm">
                                    Bạn chỉ cần chăm sóc vườn hoa.
                                </p>
                            </div>

                            {/* PRIMARY CTA: Farmer */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <GlitchButton
                                    text="ĐĂNG KÝ BÁN HOA"
                                    onClick={() => handleOpenWizard("farmer")}
                                    className="w-56 bg-emerald-600 hover:bg-emerald-500 font-mono text-xs tracking-widest"
                                />
                                {/* Secondary: Buyer */}
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    onClick={() => handleOpenWizard("buyer")}
                                    className="text-stone-400 hover:text-white hover:bg-white/5 border border-stone-800 px-6 rounded-none font-mono text-xs tracking-widest"
                                >
                                    <ShoppingBag className="mr-2 w-4 h-4" />
                                    Tôi muốn MUA HOA
                                </Button>
                            </div>

                            {/* Tertiary: Other Stakeholders */}
                            <StakeholderSelector onSelect={(role) => handleOpenWizard(role as any)} />

                            {/* Social Proof */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 flex items-center gap-4 text-[10px] text-stone-600 font-mono"
                            >
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center text-[8px]">
                                            🌸
                                        </div>
                                    ))}
                                </div>
                                <span>47+ nhà vườn đã đăng ký</span>
                            </motion.div>
                        </div>

                        {/* Data Visualization */}
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

                                {/* Floating Stats Cards */}
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

                    {/* Trust Badges Section */}
                    <TrustBadgesSection />

                    {/* Live Counters (SOPOps) */}
                    <LiveCounters />

                    {/* Urgency Banner (FOMO) */}
                    <UrgencyBanner onOpenWizard={() => handleOpenWizard("farmer")} />

                    {/* Value Chain Pillars - Bento Grid */}
                    <div className="mt-20">
                        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
                            <div>
                                <h2 className="text-[10px] font-mono text-emerald-500 tracking-[0.2em] uppercase mb-2">HỆ SINH THÁI 5-NODE</h2>
                                <h3 className="text-2xl font-light text-white tracking-wide">Chuỗi Giá Trị <span className="font-mono text-emerald-400 font-bold">HOÀN CHỈNH</span></h3>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-[10px] text-stone-500 font-mono">ĐỘ BAO PHỦ</div>
                                <div className="text-xl text-white font-mono">5 NODES</div>
                            </div>
                        </div>

                        <BentoGrid className="max-w-7xl mx-auto">
                            {/* Node 1: Banks (Fintech) */}
                            <BentoGridItem
                                title="NGÂN HÀNG (FINTECH)"
                                description={<span className="text-[11px]">Feature: <b>Tín Dụng Xanh</b><br /><span className="text-stone-500">Data: Risk assessment based on IoT sensor data.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><CreditScoreVisual /></div>}
                                icon={<TrendingUp className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm cursor-pointer hover:border-emerald-500/50 transition-colors"
                                onClick={() => handleOpenWizard("bank")}
                            />

                            {/* Node 2: Suppliers */}
                            <BentoGridItem
                                title="NHÀ CUNG CẤP (SUPPLIERS)"
                                description={<span className="text-[11px]">Feature: <b>Marketplace Vật Tư</b><br /><span className="text-stone-500">Data: Real-time inventory & price matching.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><InventoryVisual /></div>}
                                icon={<Layers className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm cursor-pointer hover:border-emerald-500/50 transition-colors"
                                onClick={() => handleOpenWizard("supplier")}
                            />

                            {/* Node 3: Farmers (Production) - Centerpiece */}
                            <BentoGridItem
                                title="🌱 NHÀ VƯỜN (FARMERS) ★"
                                description={<span className="text-[11px]">Feature: <b>Bán Hoa Trực Tiếp</b><br /><span className="text-stone-500">Không cần lo marketing, vận chuyển, thu tiền.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><StreamingChart /></div>}
                                icon={<Leaf className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-2 bg-emerald-950/30 border-emerald-500/40 rounded-sm cursor-pointer hover:border-emerald-500 transition-colors"
                                onClick={() => handleOpenWizard("farmer")}
                            />

                            {/* Node 4: Logistics */}
                            <BentoGridItem
                                title="VẬN CHUYỂN (LOGISTICS)"
                                description={<span className="text-[11px]">Feature: <b>Chuỗi Cung Ứng Lạnh</b><br /><span className="text-stone-500">Data: Temperature/Humidity tracking.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><LogisticsMapVisual /></div>}
                                icon={<Activity className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-2 bg-black/60 border-emerald-500/20 rounded-sm cursor-pointer hover:border-emerald-500/50 transition-colors"
                                onClick={() => handleOpenWizard("logistics")}
                            />

                            {/* Node 5: Buyers/Users */}
                            <BentoGridItem
                                title="NGƯỜI DÙNG (BUYERS)"
                                description={<span className="text-[11px]">Feature: <b>Mua Hoa Tận Gốc</b><br /><span className="text-stone-500">Giá tốt nhất, ship tận nhà.</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40 flex items-center justify-center"><Globe className="w-10 h-10 text-emerald-500/50" /></div>}
                                icon={<QrCode className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm cursor-pointer hover:border-emerald-500/50 transition-colors"
                                onClick={() => handleOpenWizard("buyer")}
                            />

                            {/* R&D Foundation (Bonus) - NOW CLICKABLE */}
                            <BentoGridItem
                                title="R&D / GENETICS"
                                description={<span className="text-[11px]">Core: <b>Công Nghệ Giống</b><br /><span className="text-stone-500">R&D Pipeline & IP Registry [Coming Soon]</span></span>}
                                header={<div className="h-full min-h-[9rem] w-full border border-emerald-500/10 bg-black/40"><DnaSpinner /></div>}
                                icon={<Dna className="h-4 w-4 text-emerald-400" />}
                                className="md:col-span-1 bg-black/60 border-emerald-500/20 rounded-sm cursor-pointer hover:border-emerald-500/50 transition-colors"
                                onClick={() => handleOpenWizard("research")}
                            />
                        </BentoGrid>
                    </div>

                    {/* Testimonials Section */}
                    <TestimonialsSection />

                    {/* FinOps Sections */}
                    <ROICalculator />
                    <PricingSection />
                    <InvestorSection />

                    {/* SOPOps Sections */}
                    <GovernmentSection onOpenWizard={handleOpenWizard} />
                    <PressSection onOpenWizard={handleOpenWizard} />
                    <ComparisonTable />
                    <SuccessTimeline />
                    <InlineAgentWidget />

                    {/* Stakeholder CTA Blocks */}
                    <StakeholderCTABlocks onOpenWizard={handleOpenWizard} />

                    {/* FAQ Section */}
                    <FAQSection />
                </main>

                {/* Floating Agent Button */}
                <FloatingAgentButton />

                <footer className="border-t border-emerald-900/30 py-6 text-center text-[9px] text-emerald-900/60 font-mono bg-black/90 backdrop-blur-xl mb-10">
                    SADEC.OS ENTERPRISE TERMINAL // COPYRIGHT 2026 // ALL TRADES FINAL
                </footer>
            </div>
        </AuroraBackground>
    );
}

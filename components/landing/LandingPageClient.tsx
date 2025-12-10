"use client";

// ============================================================================
// LANDING PAGE CLIENT - Refactored for Readability
// ============================================================================
// Main orchestrator - delegates to extracted components
// ============================================================================

import { useState, useCallback, lazy, Suspense } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LiveTicker } from "@/components/ui/live-ticker";
import { NeuralNetwork } from "@/components/ui/neural-network";
import { LoginModal } from "@/components/LoginModal";
import { LeadWizard } from "@/components/marketing/LeadWizard";
import { MarketingConfig } from "@/lib/marketing";

// Extracted components
import { LandingHeader } from "./LandingHeader";
import { HeroSection } from "./HeroSection";
import { ValueChainGrid } from "./ValueChainGrid";
import { QuickLinks } from "./QuickLinks";

// Lazy-loaded sections (performance optimization)
const TetCountdown = lazy(() => import("@/components/widgets/TetCountdown").then(m => ({ default: m.TetCountdown })));
const FlashSaleBanner = lazy(() => import("@/components/shop/FlashSaleBanner").then(m => ({ default: m.FlashSaleBanner })));
const FestivalBanner = lazy(() => import("@/components/marketing/FestivalBanner").then(m => ({ default: m.FestivalBanner })));
const TrustBadgesSection = lazy(() => import("@/components/marketing/TrustBadgesSection").then(m => ({ default: m.TrustBadgesSection })));
const LiveCounters = lazy(() => import("@/components/marketing/LiveCounters").then(m => ({ default: m.LiveCounters })));
const UrgencyBanner = lazy(() => import("@/components/marketing/UrgencyBanner").then(m => ({ default: m.UrgencyBanner })));
const TestimonialsSection = lazy(() => import("@/components/marketing/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ROICalculator = lazy(() => import("@/components/marketing/ROICalculator").then(m => ({ default: m.ROICalculator })));
const PricingSection = lazy(() => import("@/components/marketing/PricingSection").then(m => ({ default: m.PricingSection })));
const InvestorSection = lazy(() => import("@/components/marketing/InvestorSection").then(m => ({ default: m.InvestorSection })));
const GovernmentSection = lazy(() => import("@/components/marketing/GovernmentSection").then(m => ({ default: m.GovernmentSection })));
const PressSection = lazy(() => import("@/components/marketing/PressSection").then(m => ({ default: m.PressSection })));
const ComparisonTable = lazy(() => import("@/components/marketing/ComparisonTable").then(m => ({ default: m.ComparisonTable })));
const SuccessTimeline = lazy(() => import("@/components/marketing/SuccessTimeline").then(m => ({ default: m.SuccessTimeline })));
const InlineAgentWidget = lazy(() => import("@/components/marketing/InlineAgentWidget").then(m => ({ default: m.InlineAgentWidget })));
const StakeholderCTABlocks = lazy(() => import("@/components/marketing/StakeholderCTABlocks").then(m => ({ default: m.StakeholderCTABlocks })));
const FAQSection = lazy(() => import("@/components/marketing/FAQSection").then(m => ({ default: m.FAQSection })));
const FloatingAgentButton = lazy(() => import("@/components/marketing/FloatingAgentButton").then(m => ({ default: m.FloatingAgentButton })));

// Types
type Role = "farmer" | "buyer" | "bank" | "supplier" | "logistics" | "research" | "government" | "media";

interface LandingPageProps {
    config: MarketingConfig;
}

// Loading placeholder
const SectionLoader = () => (
    <div className="h-32 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
    </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LandingPageClient({ config }: LandingPageProps) {
    // State
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLeadWizardOpen, setIsLeadWizardOpen] = useState(false);
    const [initialRole, setInitialRole] = useState<Role | undefined>();

    // Handlers (memoized for performance)
    const handleOpenLogin = useCallback(() => setIsLoginModalOpen(true), []);
    const handleCloseLogin = useCallback(() => setIsLoginModalOpen(false), []);
    const handleCloseWizard = useCallback(() => setIsLeadWizardOpen(false), []);

    const handleOpenWizard = useCallback((role?: Role) => {
        setInitialRole(role);
        setIsLeadWizardOpen(true);
    }, []);

    return (
        <AuroraBackground className="overflow-x-hidden selection:bg-emerald-500/30">
            {/* Top bar */}
            <LiveTicker />

            {/* Modals */}
            <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLogin} />
            <LeadWizard
                isOpen={isLeadWizardOpen}
                onClose={handleCloseWizard}
                initialRole={initialRole}
            />

            <div className="relative z-10 w-full min-h-screen flex flex-col font-sans mb-10">
                {/* Festival banner */}
                <Suspense fallback={null}>
                    <FestivalBanner />
                </Suspense>

                {/* Header */}
                <LandingHeader onLoginClick={handleOpenLogin} />

                {/* Main content */}
                <main className="flex-1 flex flex-col container mx-auto px-6 pt-16 pb-32 relative">
                    {/* Background animation */}
                    <div className="absolute inset-0 -z-10 h-[800px] overflow-hidden pointer-events-none">
                        <NeuralNetwork />
                    </div>

                    {/* Hero */}
                    <HeroSection onOpenWizard={handleOpenWizard} />

                    {/* WOW Sections */}
                    <section className="space-y-12">
                        <Suspense fallback={<SectionLoader />}>
                            <TetCountdown variant="compact" />
                        </Suspense>

                        <Suspense fallback={<SectionLoader />}>
                            <FlashSaleBanner />
                        </Suspense>

                        <QuickLinks />
                    </section>

                    {/* Trust & Social Proof */}
                    <Suspense fallback={<SectionLoader />}>
                        <TrustBadgesSection />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <LiveCounters />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <UrgencyBanner onOpenWizard={() => handleOpenWizard("farmer")} />
                    </Suspense>

                    {/* Value Chain */}
                    <ValueChainGrid onOpenWizard={handleOpenWizard} />

                    {/* Testimonials */}
                    <Suspense fallback={<SectionLoader />}>
                        <TestimonialsSection />
                    </Suspense>

                    {/* FinOps */}
                    <Suspense fallback={<SectionLoader />}>
                        <ROICalculator />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <PricingSection />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <InvestorSection />
                    </Suspense>

                    {/* SOPOps */}
                    <Suspense fallback={<SectionLoader />}>
                        <GovernmentSection onOpenWizard={handleOpenWizard} />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <PressSection onOpenWizard={handleOpenWizard} />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <ComparisonTable />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <SuccessTimeline />
                    </Suspense>

                    <Suspense fallback={<SectionLoader />}>
                        <InlineAgentWidget />
                    </Suspense>

                    {/* CTAs */}
                    <Suspense fallback={<SectionLoader />}>
                        <StakeholderCTABlocks onOpenWizard={handleOpenWizard} />
                    </Suspense>

                    {/* FAQ */}
                    <Suspense fallback={<SectionLoader />}>
                        <FAQSection />
                    </Suspense>
                </main>

                {/* Floating button */}
                <Suspense fallback={null}>
                    <FloatingAgentButton />
                </Suspense>

                {/* Footer */}
                <footer className="border-t border-emerald-900/30 py-6 text-center text-[9px] text-emerald-900/60 font-mono bg-black/90 backdrop-blur-xl mb-10">
                    SADEC.OS ENTERPRISE TERMINAL // COPYRIGHT 2026 // ALL TRADES FINAL
                </footer>
            </div>
        </AuroraBackground>
    );
}

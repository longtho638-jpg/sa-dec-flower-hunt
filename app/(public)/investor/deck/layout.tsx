import { SlideNavigation } from "@/components/investor/SlideNavigation";
import { ReactNode } from "react";

export default function InvestorDeckLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            {/* Slide Content */}
            <main className="relative z-10">
                {children}
            </main>

            {/* Navigation */}
            <SlideNavigation />
        </div>
    );
}

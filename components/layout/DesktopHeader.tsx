"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AgriosLogo } from "@/components/brand/AgriosLogo";
import { NeonButton } from "@/components/ui/neon-button";
import { useLanguage } from "@/lib/i18n";
import { WOWLanguageToggle } from "@/components/wow/WOWLanguageToggle";
import { motion } from "framer-motion";
import { ShoppingBag, Map, ScanLine, Sprout } from "lucide-react";

export function DesktopHeader() {
    const pathname = usePathname();
    const { t } = useLanguage();

    const navLinks = [
        { href: "/hunt", label: t('nav.scan'), icon: ScanLine },
        { href: "/shop", label: t('nav.shop'), icon: ShoppingBag },
        { href: "/map", label: t('nav.map'), icon: Map },
        { href: "/partner", label: t('nav.partner'), icon: Sprout },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 py-4 bg-black/50 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
                <AgriosLogo className="w-8 h-8 group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all" />
                <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-white leading-none">
                        AGRIOS<span className="text-emerald-500">.tech</span>
                    </span>
                    <span className="text-[10px] text-emerald-500/60 font-mono tracking-widest uppercase">
                        Garden OS
                    </span>
                </div>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                relative flex items-center gap-2 text-sm font-medium transition-colors
                                ${isActive ? "text-emerald-400" : "text-stone-400 hover:text-white"}
                            `}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 -z-10 bg-emerald-500/10 rounded-full blur-[2px]"
                                />
                            )}
                            <link.icon className="w-4 h-4" />
                            {link.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <WOWLanguageToggle />

                <Link href="/auth/login">
                    <NeonButton variant="outline" className="h-9 px-4 text-xs">
                        LOGIN_NODE
                    </NeonButton>
                </Link>
            </div>
        </header>
    );
}

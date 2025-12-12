"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AgriosVectorLogo } from "@/components/brand/AgriosVectorLogo";
import { NeonButton } from "@/components/ui/neon-button";
import { useLanguage } from "@/lib/i18n";
import { WOWLanguageToggle } from "@/components/wow/WOWLanguageToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    ShoppingBag, Map, ScanLine, Sprout, ChevronDown,
    Sparkles, Trophy, Home as HomeIcon, Tent,
    Truck, Store, Users, TreeDeciduous, Heart,
    Info, Phone, FileText, Briefcase
} from "lucide-react";

// Type for navigation items
interface NavItem {
    href: string;
    label: string;
    labelEn: string;
    icon: any;
    hot?: boolean;
}

// Navigation Structure - Data Integrity: All Routes Mapped
const NAV_STRUCTURE: Record<string, { label: string; labelEn: string; icon: any; items: NavItem[] }> = {
    explore: {
        label: "Khám Phá",
        labelEn: "Explore",
        icon: Sparkles,
        items: [
            { href: "/festival", label: "Lễ Hội Hoa", labelEn: "Festival", icon: Sparkles, hot: true },
            { href: "/hub", label: "Trung Tâm", labelEn: "Hub", icon: HomeIcon },
            { href: "/farmstay", label: "Farmstay", labelEn: "Farmstay", icon: Tent },
            { href: "/leaderboard", label: "Bảng Xếp Hạng", labelEn: "Leaderboard", icon: Trophy },
            { href: "/map", label: "Bản Đồ Hoa", labelEn: "Flower Map", icon: Map },
        ]
    },
    commerce: {
        label: "Mua Sắm",
        labelEn: "Shop",
        icon: ShoppingBag,
        items: [
            { href: "/shop", label: "Cửa Hàng", labelEn: "Shop", icon: ShoppingBag },
            { href: "/hunt", label: "Săn Hoa AR", labelEn: "AR Hunt", icon: ScanLine, hot: true },
            { href: "/adopt", label: "Nhận Nuôi Hoa", labelEn: "Adopt Flower", icon: Heart },
            { href: "/badges", label: "Huy Hiệu", labelEn: "Badges", icon: Trophy },
        ]
    },
    partners: {
        label: "Đối Tác",
        labelEn: "Partners",
        icon: Users,
        items: [
            { href: "/partner", label: "Đăng Ký Đối Tác", labelEn: "Partner Portal", icon: Sprout },
            { href: "/suppliers", label: "Nhà Cung Cấp", labelEn: "Suppliers", icon: Store },
            { href: "/trader", label: "Thương Lái", labelEn: "Traders", icon: Briefcase },
            { href: "/logistics", label: "Logistics", labelEn: "Logistics", icon: Truck },
        ]
    },
};

export function DesktopHeader() {
    const pathname = usePathname();
    const { t, language } = useLanguage();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const isVi = language === 'vi';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 hidden md:block">
            <div className="flex items-center justify-between px-8 py-3 bg-black/70 backdrop-blur-xl border-b border-white/5">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <AgriosVectorLogo className="h-10 w-auto group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all" variant="full" />
                </Link>

                {/* Main Navigation */}
                <nav className="flex items-center gap-1">
                    {Object.entries(NAV_STRUCTURE).map(([key, section]) => (
                        <div
                            key={key}
                            className="relative"
                            onMouseEnter={() => setOpenDropdown(key)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-stone-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                                <section.icon className="w-4 h-4" />
                                {isVi ? section.label : section.labelEn}
                                <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === key ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {openDropdown === key && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 mt-1 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                    >
                                        {section.items.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isActive
                                                        ? 'bg-emerald-500/20 text-emerald-400'
                                                        : 'text-stone-400 hover:bg-white/5 hover:text-white'
                                                        }`}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    {isVi ? item.label : item.labelEn}
                                                    {item.hot && (
                                                        <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                                                            HOT
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* Direct Links */}
                    <Link
                        href="/insights"
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5 ${pathname === '/insights' ? 'text-emerald-400' : 'text-stone-300 hover:text-white'
                            }`}
                    >
                        {isVi ? 'Insights' : 'Insights'}
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <WOWLanguageToggle />
                    <Link href="/farmer">
                        <NeonButton variant="outline" className="h-9 px-4 text-xs">
                            {isVi ? 'ĐĂNG NHẬP' : 'LOGIN'}
                        </NeonButton>
                    </Link>
                </div>
            </div>
        </header>
    );
}


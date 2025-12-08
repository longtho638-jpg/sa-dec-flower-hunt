"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ScanLine,
    Trophy,
    MapPin,
    ShoppingBag,
    Sparkles,
    Calendar,
    Clock,
    Terminal,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Festival Date: December 27, 2025
const FESTIVAL_DATE = new Date("2025-12-27T08:00:00+07:00");

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeLeft(): TimeLeft {
    const now = new Date();
    const difference = FESTIVAL_DATE.getTime() - now.getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export default function FestivalHubPage() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const quickLinks = [
        {
            href: "/scan",
            icon: ScanLine,
            title: "SĂN_QR",
            description: "Quét mã → +Điểm",
            badge: "HOT"
        },
        {
            href: "/leaderboard",
            icon: Trophy,
            title: "BẢNG_XẾP_HẠNG",
            description: "Top hunters",
            badge: null
        },
        {
            href: "/festival/check-in",
            icon: MapPin,
            title: "CHECK_IN",
            description: "GPS → Voucher 50K",
            badge: "GIFT"
        },
        {
            href: "/shop",
            icon: ShoppingBag,
            title: "MUA_HOA",
            description: "Ship tận nhà",
            badge: null
        }
    ];

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-hidden">
            {/* Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Ambient Glow */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 border-b border-emerald-500/20 bg-black/80 backdrop-blur-sm">
                <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs text-emerald-500 uppercase tracking-wider">Festival_OS</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>LIVE</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative z-10 pt-8 pb-6 px-4">
                <motion.div
                    className="text-center max-w-md mx-auto"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-4 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-emerald-400 uppercase tracking-wider font-bold">
                            Lễ Hội Hoa 2025
                        </span>
                    </div>

                    <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500">
                        SA_ĐÉC
                    </h1>
                    <h2 className="text-lg text-stone-400 uppercase tracking-widest">
                        Flower Hunt Festival
                    </h2>

                    <div className="flex items-center justify-center gap-2 mt-4 text-stone-500 text-xs">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">27/12/2025</span>
                    </div>
                </motion.div>
            </div>

            {/* Countdown Section */}
            <motion.div
                className="relative z-10 px-4 mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="max-w-md mx-auto bg-stone-950 border border-emerald-500/30 rounded-lg p-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-emerald-500 uppercase tracking-wider font-bold">
                            Đếm Ngược
                        </span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {[
                            { value: timeLeft.days, label: "NGÀY" },
                            { value: timeLeft.hours, label: "GIỜ" },
                            { value: timeLeft.minutes, label: "PHÚT" },
                            { value: timeLeft.seconds, label: "GIÂY" }
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                className="text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                <div className="bg-black border border-emerald-500/20 rounded-lg p-3">
                                    <motion.div
                                        key={item.value}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-black text-emerald-400 font-mono"
                                    >
                                        {String(item.value).padStart(2, '0')}
                                    </motion.div>
                                </div>
                                <div className="text-[10px] text-stone-600 mt-2 uppercase tracking-wider">
                                    {item.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Quick Links Grid */}
            <div className="relative z-10 px-4 pb-24">
                <div className="max-w-md mx-auto space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-stone-500 uppercase tracking-wider">
                            Tham Gia Ngay
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {quickLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                <Link href={link.href}>
                                    <div className="relative bg-stone-950 border border-emerald-500/20 rounded-lg p-4 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all active:scale-95">
                                        {link.badge && (
                                            <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full">
                                                {link.badge}
                                            </span>
                                        )}
                                        <link.icon className="w-6 h-6 text-emerald-500 mb-2" />
                                        <h3 className="font-bold text-white text-xs uppercase tracking-wider">{link.title}</h3>
                                        <p className="text-stone-500 text-[10px] mt-1">{link.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Partner CTA */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <Link href="/partner/register">
                            <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm uppercase tracking-wider rounded-lg mt-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                🌿 Nhà Vườn Đăng Ký Bán Hoa
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-emerald-500/10 bg-black/80 backdrop-blur-sm p-3">
                <div className="text-center text-stone-600 text-[10px] uppercase tracking-wider font-mono">
                    Powered by <span className="text-emerald-500">Sa_Dec_Flower_Hunt</span>
                </div>
            </div>
        </div>
    );
}

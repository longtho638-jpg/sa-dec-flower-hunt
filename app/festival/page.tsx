"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ScanLine,
    Trophy,
    MapPin,
    ShoppingBag,
    Flower2,
    Sparkles,
    Calendar,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

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

        // Countdown timer
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Initial confetti burst
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.3 },
                colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#ec4899']
            });
        }, 500);

        return () => clearInterval(timer);
    }, []);

    const quickLinks = [
        {
            href: "/scan",
            icon: ScanLine,
            title: "Săn QR Code",
            description: "Quét mã → Nhận điểm",
            color: "from-red-500 to-orange-500",
            badge: "HOT"
        },
        {
            href: "/leaderboard",
            icon: Trophy,
            title: "Bảng Xếp Hạng",
            description: "Top hunters",
            color: "from-yellow-500 to-amber-500",
            badge: null
        },
        {
            href: "/festival/check-in",
            icon: MapPin,
            title: "Check-in Lễ Hội",
            description: "GPS → Voucher 50K",
            color: "from-green-500 to-emerald-500",
            badge: "GIFT"
        },
        {
            href: "/shop",
            icon: ShoppingBag,
            title: "Mua Hoa Tết",
            description: "Ship tận nhà",
            color: "from-pink-500 to-rose-500",
            badge: null
        }
    ];

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Floating Flowers */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                            y: -50,
                            rotate: 0,
                            opacity: 0.6
                        }}
                        animate={{
                            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
                            rotate: 360,
                            opacity: [0.6, 0.8, 0.6]
                        }}
                        transition={{
                            duration: 8 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        {['🌸', '🌺', '🌼', '🌷', '💮'][i % 5]}
                    </motion.div>
                ))}
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pt-12 pb-8 px-4">
                <motion.div
                    className="text-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Flower2 className="w-8 h-8 text-yellow-300 animate-bounce" />
                        <span className="text-sm font-bold bg-yellow-400 text-red-900 px-3 py-1 rounded-full">
                            LỄ HỘI HOA 2025
                        </span>
                        <Flower2 className="w-8 h-8 text-yellow-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-300 drop-shadow-2xl">
                        SA ĐÉC
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-white/90">
                        Flower Hunt Festival
                    </h2>

                    <div className="flex items-center justify-center gap-2 mt-4 text-yellow-200/80 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>27 Tháng 12, 2025</span>
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
                <div className="max-w-md mx-auto bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-yellow-300" />
                        <span className="text-sm font-bold text-yellow-200 uppercase tracking-wider">
                            Đếm Ngược
                        </span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {[
                            { value: timeLeft.days, label: "Ngày" },
                            { value: timeLeft.hours, label: "Giờ" },
                            { value: timeLeft.minutes, label: "Phút" },
                            { value: timeLeft.seconds, label: "Giây" }
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                className="text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                            >
                                <div className="bg-gradient-to-b from-yellow-500 to-orange-600 rounded-xl p-3 shadow-lg border border-yellow-400/30">
                                    <motion.div
                                        key={item.value}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl md:text-4xl font-black text-white"
                                    >
                                        {String(item.value).padStart(2, '0')}
                                    </motion.div>
                                </div>
                                <div className="text-xs text-white/60 mt-2 font-medium">
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
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <span className="text-sm font-bold text-white/80 uppercase tracking-wider">
                            Tham Gia Ngay
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {quickLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                <Link href={link.href}>
                                    <div className={`relative bg-gradient-to-br ${link.color} rounded-2xl p-5 shadow-xl hover:scale-105 transition-transform active:scale-95 border border-white/20`}>
                                        {link.badge && (
                                            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
                                                {link.badge}
                                            </span>
                                        )}
                                        <link.icon className="w-8 h-8 text-white mb-3" />
                                        <h3 className="font-bold text-white text-sm">{link.title}</h3>
                                        <p className="text-white/70 text-xs mt-1">{link.description}</p>
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
                            <Button className="w-full h-14 bg-white text-red-700 font-bold text-lg hover:bg-gray-100 shadow-xl rounded-2xl mt-6">
                                🌿 Nhà Vườn Đăng Ký Bán Hoa
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="text-center text-white/40 text-xs">
                    Powered by <span className="text-yellow-400 font-bold">Sa Dec Flower Hunt</span>
                </div>
            </div>
        </div>
    );
}

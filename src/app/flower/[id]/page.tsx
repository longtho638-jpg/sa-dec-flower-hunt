"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { flowers } from "@/lib/dummyData";
import { ChevronLeft, Share2, Info, Sparkles } from "lucide-react";

export default function FlowerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [flower, setFlower] = useState<(typeof flowers)[0] | null>(null);
    const [isCollected, setIsCollected] = useState(false);

    useEffect(() => {
        if (params.id) {
            const foundFlower = flowers.find((f) => f.id === params.id);
            if (foundFlower) {
                setFlower(foundFlower);
            }
        }
    }, [params.id]);

    const handleCollect = () => {
        if (isCollected) return;

        setIsCollected(true);

        // Confetti explosion
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ["#06b6d4", "#a855f7", "#ec4899"],
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ["#06b6d4", "#a855f7", "#ec4899"],
            });
        }, 250);
    };

    if (!flower) return <div className="h-screen bg-[#0f0f1a]" />;

    return (
        <div className="relative h-screen w-full bg-[#0f0f1a] overflow-hidden font-sans text-white">
            {/* Aurora Background (visible behind glass) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-cyan/20 via-purple/20 to-pink/20 blur-[100px] animate-pulse" />
            </div>

            {/* Top Image Section (60% height) */}
            <div className="absolute top-0 left-0 w-full h-[65%] z-0">
                <Image
                    src={flower.imageUrl}
                    alt={flower.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0f0f1a]" />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-6 right-6 z-20 flex gap-3">
                <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom Sheet Information */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                className="absolute bottom-0 left-0 w-full h-[45%] glass-panel rounded-t-[2.5rem] z-10 flex flex-col px-8 pt-10 pb-6 border-t border-white/10 bg-[#0f0f1a]/60 backdrop-blur-xl"
            >
                {/* Drag Handle */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full" />

                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-cyan/20 text-cyan text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-cyan/20">
                                {flower.personality}
                            </span>
                        </div>
                        <h1 className="font-sans text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
                            {flower.name}
                        </h1>
                    </div>

                    {/* Meaning Quote */}
                    <div className="mb-6 pl-4 border-l-4 border-purple italic text-white/80">
                        "{flower.meaning}"
                    </div>

                    {/* Story / Info */}
                    <div className="mb-24">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-pink" />
                            Câu chuyện
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            {flower.story}
                        </p>
                    </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-8 left-8 right-8">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCollect}
                        disabled={isCollected}
                        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group ${isCollected
                                ? "bg-white/10 text-white/50 cursor-default border border-white/5"
                                : "bg-gradient-to-r from-cyan via-purple to-pink text-white hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]"
                            }`}
                    >
                        {isCollected ? (
                            <span>Đã thu thập ✅</span>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 animate-pulse" />
                                <span>Thu thập ngay</span>
                                <span className="bg-black/20 px-2 py-0.5 rounded text-sm ml-1">
                                    +10 điểm
                                </span>
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

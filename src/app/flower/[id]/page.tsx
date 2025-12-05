"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { flowers } from "@/lib/dummyData";
import { ChevronLeft, Share2, Info } from "lucide-react";

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
            } else {
                // Handle not found
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
                colors: ['#DC2626', '#FACC15', '#00A86B']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#DC2626', '#FACC15', '#00A86B']
            });
        }, 250);
    };

    if (!flower) return <div className="h-screen bg-white" />;

    return (
        <div className="relative h-screen w-full bg-white overflow-hidden font-sans">
            {/* Top Image Section (60% height) */}
            <div className="absolute top-0 left-0 w-full h-[65%] z-0">
                <Image
                    src={flower.imageUrl}
                    alt={flower.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-6 right-6 z-20 flex gap-3">
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom Sheet Information */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                className="absolute bottom-0 left-0 w-full h-[45%] bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10 flex flex-col px-8 pt-10 pb-6"
            >
                {/* Drag Handle */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />

                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-tet-yellow/20 text-yellow-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                {flower.personality}
                            </span>
                        </div>
                        <h1 className="font-serif text-3xl font-bold text-gray-900 leading-tight">
                            {flower.name}
                        </h1>
                    </div>

                    {/* Meaning Quote */}
                    <div className="mb-6 pl-4 border-l-4 border-tet-yellow italic text-gray-600">
                        "{flower.meaning}"
                    </div>

                    {/* Story / Info */}
                    <div className="mb-20">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-tet-red" />
                            Câu chuyện
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
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
                        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl shadow-tet-red/30 transition-all flex items-center justify-center gap-2 ${isCollected
                                ? "bg-gray-100 text-gray-500 cursor-default"
                                : "bg-tet-red text-white hover:bg-red-700 animate-pulse"
                            }`}
                    >
                        {isCollected ? (
                            <span>Đã thu thập ✅</span>
                        ) : (
                            <>
                                <span>Thu thập ngay</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-sm">+10 điểm</span>
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

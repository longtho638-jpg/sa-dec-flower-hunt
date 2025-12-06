"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, AlertTriangle, Check, Scan, Leaf, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for "Resilient" Flowers
const WARRIOR_FLOWERS = [
    {
        id: 1,
        name: "Hoa Giấy Ngũ Sắc",
        code: "WARRIOR-01",
        tempLimit: 42,
        waterNeeds: "Thấp",
        tag: "Chống Nắng Cực Đỉnh",
        image: "https://images.unsplash.com/photo-1596627889380-6925fc74c2d4?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Dừa Cạn Rủ",
        code: "WARRIOR-02",
        tempLimit: 38,
        waterNeeds: "Trung bình",
        tag: "Bền Bỉ Quanh Năm",
        image: "https://images.unsplash.com/photo-1549419139-281c03e85785?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Mười Giờ Thái",
        code: "WARRIOR-03",
        tempLimit: 45,
        waterNeeds: "Rất thấp",
        tag: "Nữ Hoàng Sa Mạc",
        image: "https://images.unsplash.com/photo-1505670984180-87a40b3c2009?q=80&w=600&auto=format&fit=crop"
    }
];

export function ClimateScanner() {
    const [status, setStatus] = useState<"idle" | "scanning" | "result">("idle");
    const [temp, setTemp] = useState(30);
    const [resultFlower, setResultFlower] = useState(WARRIOR_FLOWERS[0]);

    const startScan = () => {
        setStatus("scanning");
        let currentTemp = 30;

        // Simulate scanning animation
        const interval = setInterval(() => {
            currentTemp += Math.random() > 0.5 ? 1 : 0.5;
            setTemp(Math.min(38, Number(currentTemp.toFixed(1))));
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setStatus("result");
            // Pick a random flower
            setResultFlower(WARRIOR_FLOWERS[Math.floor(Math.random() * WARRIOR_FLOWERS.length)]);
        }, 2500);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-700 relative">
            {/* Tech Overlay Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            <div className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="text-xs font-mono text-green-400 border border-green-400/30 px-2 py-1 rounded">
                        SYSTEM: ONLINE
                    </div>
                    <Scan className="text-green-400 animate-pulse w-5 h-5" />
                </div>

                <AnimatePresence mode="wait">
                    {status === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-10"
                        >
                            <Thermometer className="w-20 h-20 mx-auto text-orange-500 mb-6" />
                            <h2 className="text-2xl font-bold mb-2">Kiểm Tra Vườn Nhà</h2>
                            <p className="text-stone-400 mb-8 text-sm">
                                AI sẽ phân tích nhiệt độ và bức xạ nhiệt khu vực của bạn để tìm loài hoa phù hợp nhất.
                            </p>
                            <Button
                                onClick={startScan}
                                className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg font-bold shadow-[0_0_20px_rgba(239,68,68,0.5)] border-none"
                            >
                                BẮT ĐẦU QUÉT
                            </Button>
                        </motion.div>
                    )}

                    {status === "scanning" && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-10"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                                <span className="absolute inset-0 border-4 border-t-orange-500 border-r-transparent border-b-orange-500 border-l-transparent rounded-full animate-spin"></span>
                                <span className="text-4xl font-mono font-bold text-orange-400">{temp}°C</span>
                            </div>
                            <h2 className="text-xl font-bold animate-pulse text-orange-400">ĐANG PHÂN TÍCH...</h2>
                            <p className="font-mono text-xs text-stone-500 mt-2">
                                Data Source: Satellite Imagery<br />
                                Analyzing UV Index...<br />
                                Detecting Heat Island Effect...
                            </p>
                        </motion.div>
                    )}

                    {status === "result" && (
                        <motion.div
                            key="result"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-left"
                        >
                            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl mb-6 flex gap-3 items-start">
                                <AlertTriangle className="text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-red-400 text-sm">CẢNH BÁO: NHIỆT ĐỘ CỰC ĐOAN</h3>
                                    <p className="text-xs text-red-200/70 mt-1">
                                        Khu vực của bạn chịu hiệu ứng "Đảo Nhiệt Đô Thị". Nhiệt độ bề mặt có thể đạt {temp + 5}°C.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-stone-800 rounded-2xl p-4 border border-stone-700">
                                <div className="text-xs text-stone-400 mb-2 font-mono">ĐỀ XUẤT TỐI ƯU (MATCH: 98%)</div>
                                <div className="flex gap-4">
                                    <img
                                        src={resultFlower.image}
                                        alt={resultFlower.name}
                                        className="w-24 h-24 object-cover rounded-lg bg-stone-700"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{resultFlower.name}</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="bg-orange-500/20 text-orange-300 text-[10px] px-2 py-1 rounded-full border border-orange-500/30 flex items-center gap-1">
                                                <Thermometer className="w-3 h-3" /> Chịu nhiệt {resultFlower.tempLimit}°C
                                            </span>
                                            <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-1 rounded-full border border-blue-500/30 flex items-center gap-1">
                                                <Droplets className="w-3 h-3" /> Nước: {resultFlower.waterNeeds}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 font-bold text-white">
                                    CHỌN CHIẾN BINH NÀY
                                </Button>
                            </div>

                            <button
                                onClick={() => setStatus("idle")}
                                className="w-full text-center text-stone-500 text-xs mt-4 hover:text-stone-300 underline"
                            >
                                Quét lại vị trí khác
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

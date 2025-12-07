"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Scanner } from '@yudiel/react-qr-scanner';
import confetti from 'canvas-confetti';
import { motion } from "framer-motion";
import { ScanLine, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QRScanner() {
    const [scanned, setScanned] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);
    const router = useRouter();

    // Sound effect
    const playSuccessSound = () => {
        const audio = new Audio('/sounds/success.mp3'); // We'll need this file, or use a data URI fallback
        audio.play().catch(e => console.log("Audio play failed", e));
    };

    const handleScan = async (text: string) => {
        if (scanned || !text) return;

        setScanned(true);
        setScanResult(text);

        // 1. Haptic Feedback
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        // 2. Confetti WOW
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ef4444', '#22c55e', '#eab308'] // Red, Green, Gold
        });

        // 3. Sound (Optional - browser policy might block)
        // playSuccessSound();

        // 4. Process Logic (Mock for now)
        toast.success("🎯 TUYỆT VỜI! ĐÃ QUÉT TRÚNG", {
            description: "Bạn vừa tìm thấy 'Hoa Hồng Sa Đéc'. +500 Điểm!",
            duration: 4000,
            style: {
                background: '#10b981', // Emerald 500
                color: 'white',
                border: 'none',
                fontWeight: 'bold'
            },
            icon: <Zap className="w-5 h-5 text-yellow-300" />
        });

        // 5. Navigate or Reset
        setTimeout(() => {
            // In real app: router.push(`/flower/${extractedIdFromQR}`);
            // For demo: Just reset
            setScanned(false);
            setScanResult(null);
        }, 3000);
    };

    const handleError = (error: unknown) => {
        console.error("QR Error:", error);
        // Only show toast if it's a permission error
        // toast.error("Không thể mở camera. Hãy cấp quyền!");
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black z-0"></div>

            {/* Header */}
            <div className="relative z-10 mb-8 text-center">
                <h1 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <ScanLine className="w-6 h-6 text-red-500 animate-pulse" />
                    Máy Quét AR
                </h1>
                <p className="text-white/60 text-sm">Tìm mã QR trên các chậu hoa để săn quà</p>
            </div>

            {/* Scanner Container */}
            <div className="w-full max-w-sm aspect-[3/4] bg-stone-900 rounded-3xl overflow-hidden relative border border-stone-800 shadow-2xl z-10">

                {/* Real Camera Scanner */}
                <div className="absolute inset-0 w-full h-full">
                    <Scanner
                        onScan={(result) => {
                            if (result && result.length > 0) {
                                handleScan(result[0].rawValue);
                            }
                        }}
                        onError={handleError}
                        components={{
                            // Hide default UI elements if desired, or keep them
                        }}
                        styles={{
                            container: {
                                width: '100%',
                                height: '100%'
                            },
                            video: {
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%'
                            }
                        }}
                        allowMultiple={true}
                        scanDelay={2000} // Prevent rapid fire
                    />
                </div>

                {/* Overlay UI - The "WOW" Frame */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Darken corners for focus */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_rgba(0,0,0,0.8)_100%)]"></div>

                    {/* Animated Scanning Line */}
                    {!scanned && (
                        <motion.div
                            animate={{ top: ['5%', '95%', '5%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-4 right-4 h-0.5 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20"
                        />
                    )}

                    {/* Corner Reticles */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-white/80 rounded-tl-2xl"></div>
                    <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-white/80 rounded-tr-2xl"></div>
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-white/80 rounded-bl-2xl"></div>
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-white/80 rounded-br-2xl"></div>

                    {/* Center Focus (Optional) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="w-48 h-48 border border-white/30 rounded-lg"></div>
                    </div>
                </div>

                {/* Scanned Success Overlay */}
                {scanned && (
                    <div className="absolute inset-0 bg-green-500/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in active:animate-out fade-out">
                        <div className="bg-white p-6 rounded-full shadow-xl mb-4">
                            <Zap className="w-12 h-12 text-green-600 fill-green-600" />
                        </div>
                        <h3 className="text-white text-2xl font-bold">Thành Công!</h3>
                        <p className="text-white/90 font-mono mt-2">{scanResult?.substring(0, 15)}...</p>
                    </div>
                )}
            </div>

            {/* Helper Text */}
            <div className="mt-8 text-center text-stone-500 max-w-xs text-sm z-10">
                <p className="mb-4">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Camera đang hoạt động
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 rounded-full border border-stone-700 text-stone-400 hover:bg-stone-900 transition-colors"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
}

"use client";

// ============================================================================
// HUNT PAGE - Loot Box Collection Game
// ============================================================================
// Du khách săn hộp quà từ các vườn hoa Sa Đéc
// Real-time updates từ Garden OS khi nông dân cập nhật kho
// ============================================================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Gift, MapPin, Sparkles, Star, Clock,
    Compass, Trophy, Zap, ChevronRight, RefreshCw
} from "lucide-react";
import { useGardenRealtime } from "@/hooks/useGardenRealtime";
import { LootBoxGrid, LootBoxAlert } from "@/components/game/LootBox";
import Link from "next/link";

// Rarity badge component
function RarityBadge({ rarity }: { rarity: string }) {
    const config: Record<string, { bg: string; text: string; icon: string }> = {
        COMMON: { bg: "bg-stone-600", text: "text-stone-100", icon: "📦" },
        RARE: { bg: "bg-blue-600", text: "text-blue-100", icon: "🎁" },
        EPIC: { bg: "bg-purple-600", text: "text-purple-100", icon: "💎" },
        LEGENDARY: { bg: "bg-gradient-to-r from-amber-500 to-orange-500", text: "text-white", icon: "👑" },
    };

    const c = config[rarity] || config.COMMON;

    return (
        <span className={`${c.bg} ${c.text} px-2 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1`}>
            {c.icon} {rarity}
        </span>
    );
}

// Stats card
function StatCard({ icon, value, label, color }: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    color: string;
}) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-stone-900/50 border border-stone-800 rounded-xl p-4 text-center`}
        >
            <div className={`${color} mb-2`}>{icon}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-stone-500 text-xs">{label}</div>
        </motion.div>
    );
}

// Garden card with inventory
function GardenCard({ garden, inventory }: {
    garden: { id: string; name: string; address?: string; specialties?: string[] };
    inventory: { quantity: number; flower_name: string }[];
}) {
    const totalFlowers = inventory.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const isHot = totalFlowers >= 50;

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`
        bg-stone-900/50 border rounded-xl p-4 relative overflow-hidden
        ${isHot ? 'border-amber-500/50' : 'border-stone-800'}
      `}
        >
            {isHot && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    🔥 HOT
                </div>
            )}

            <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                    🌸
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-bold">{garden.name}</h3>
                    {garden.address && (
                        <p className="text-stone-500 text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {garden.address}
                        </p>
                    )}
                </div>
            </div>

            {/* Inventory summary */}
            <div className="mt-4 flex flex-wrap gap-2">
                {inventory.slice(0, 3).map((item, i) => (
                    <span key={i} className="bg-stone-800 text-stone-300 text-xs px-2 py-1 rounded-full">
                        {item.flower_name}: {item.quantity}
                    </span>
                ))}
            </div>

            {/* Total */}
            <div className="mt-4 flex items-center justify-between">
                <span className="text-stone-500 text-sm">Tổng kho:</span>
                <span className={`font-bold ${isHot ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {totalFlowers} chậu
                </span>
            </div>

            <Link
                href={`/shop?garden=${garden.id}`}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
                Xem vườn <ChevronRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}

export default function HuntPage() {
    const {
        gardens,
        inventory,
        lootBoxes,
        hotGardens,
        loading,
        connected,
        refetch
    } = useGardenRealtime();

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setTimeout(() => setRefreshing(false), 1000);
    };

    // Count loot by rarity
    const lootByRarity = {
        COMMON: lootBoxes.filter(l => l.rarity === 'COMMON').length,
        RARE: lootBoxes.filter(l => l.rarity === 'RARE').length,
        EPIC: lootBoxes.filter(l => l.rarity === 'EPIC').length,
        LEGENDARY: lootBoxes.filter(l => l.rarity === 'LEGENDARY').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
            {/* Floating Loot Alert */}
            <LootBoxAlert />

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
                            initial={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [null, `${Math.random() * 100}%`],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 px-4 py-12 text-center">
                    {/* Connection status */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                        <span className="text-stone-500 text-sm">
                            {connected ? 'Live tracking' : 'Đang kết nối...'}
                        </span>
                    </div>

                    {/* Title */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent mb-2">
                            🎯 SĂN HOA SA ĐÉC
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Thu thập hộp quà từ các vườn hoa
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mt-8">
                        <StatCard
                            icon={<Gift className="w-6 h-6 mx-auto" />}
                            value={lootBoxes.length}
                            label="Hộp quà"
                            color="text-amber-400"
                        />
                        <StatCard
                            icon={<Sparkles className="w-6 h-6 mx-auto" />}
                            value={lootByRarity.RARE + lootByRarity.EPIC + lootByRarity.LEGENDARY}
                            label="Hiếm+"
                            color="text-blue-400"
                        />
                        <StatCard
                            icon={<MapPin className="w-6 h-6 mx-auto" />}
                            value={hotGardens.length}
                            label="Vườn hot"
                            color="text-emerald-400"
                        />
                        <StatCard
                            icon={<Compass className="w-6 h-6 mx-auto" />}
                            value={gardens.length}
                            label="Tổng vườn"
                            color="text-purple-400"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 pb-24">
                {/* Refresh button */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Gift className="w-5 h-5 text-amber-400" />
                        Hộp Quà Đang Chờ
                    </h2>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="text-stone-400 hover:text-white flex items-center gap-1 text-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        Làm mới
                    </button>
                </div>

                {/* Loot Boxes Grid */}
                <LootBoxGrid userId={undefined} />

                {/* Hot Gardens Section */}
                {hotGardens.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                            <Zap className="w-5 h-5 text-amber-400" />
                            Vườn Đang Hot
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hotGardens.map(garden => {
                                const gardenInventory = inventory.filter(i => i.garden_id === garden.id);
                                return (
                                    <GardenCard
                                        key={garden.id}
                                        garden={garden}
                                        inventory={gardenInventory}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* All Gardens */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                        Tất Cả Nhà Vườn ({gardens.length})
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full"
                            />
                        </div>
                    ) : gardens.length === 0 ? (
                        <div className="text-center py-12 bg-stone-900/50 rounded-2xl border border-stone-800">
                            <MapPin className="w-12 h-12 mx-auto text-stone-600 mb-4" />
                            <p className="text-stone-400">Chưa có nhà vườn nào</p>
                            <p className="text-stone-500 text-sm mt-1">
                                Khi nông dân đăng ký qua Garden OS, vườn sẽ xuất hiện ở đây
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {gardens.map(garden => {
                                const gardenInventory = inventory.filter(i => i.garden_id === garden.id);
                                return (
                                    <GardenCard
                                        key={garden.id}
                                        garden={garden}
                                        inventory={gardenInventory}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* How to Play */}
                <div className="mt-12 bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-6 border border-stone-700">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-400" />
                        Cách Chơi
                    </h3>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                            <div>
                                <p className="text-white font-medium">Theo dõi vườn hot</p>
                                <p className="text-stone-400 text-sm">Khi nông dân cập nhật kho &gt;50 chậu, hộp quà sẽ xuất hiện</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                            <div>
                                <p className="text-white font-medium">Mở hộp quà</p>
                                <p className="text-stone-400 text-sm">Nhận voucher giảm giá, điểm thưởng, hoặc phần quà đặc biệt</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                            <div>
                                <p className="text-white font-medium">Đến vườn mua hoa</p>
                                <p className="text-stone-400 text-sm">Sử dụng voucher khi mua hoa trực tiếp hoặc online</p>
                            </div>
                        </div>
                    </div>

                    {/* Rarity legend */}
                    <div className="mt-6 pt-4 border-t border-stone-700">
                        <p className="text-stone-500 text-sm mb-3">Độ hiếm hộp quà:</p>
                        <div className="flex flex-wrap gap-2">
                            <RarityBadge rarity="COMMON" />
                            <RarityBadge rarity="RARE" />
                            <RarityBadge rarity="EPIC" />
                            <RarityBadge rarity="LEGENDARY" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

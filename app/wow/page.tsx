"use client";

// ============================================================================
// WOW SHOWCASE PAGE - All Premium Features in One Place
// ============================================================================
// Demonstrates all WOW features with maximum visual impact
// ============================================================================

import { WowHero } from "@/components/landing/WowHero";
import { FlashSaleBanner } from "@/components/shop/FlashSaleBanner";
import { TetCountdown } from "@/components/widgets/TetCountdown";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { QuickLinks } from "@/components/landing/QuickLinks";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Gift, Flower2, Home, Star } from "lucide-react";

// Feature showcase section
function FeatureShowcase() {
    const features = [
        {
            title: "Yield Predictor AI",
            description: "Dự báo nhu cầu thị trường và định giá động dựa trên AI",
            icon: "🔮",
            gradient: "from-purple-600 to-indigo-600",
            stats: "80% chính xác"
        },
        {
            title: "Garden Digital Twin",
            description: "Bản sao số của vườn hoa, theo dõi tồn kho realtime",
            icon: "🌸",
            gradient: "from-pink-600 to-rose-600",
            stats: "Realtime sync"
        },
        {
            title: "Cold Chain IoT",
            description: "Vận chuyển lạnh với cảm biến nhiệt độ 24/7",
            icon: "🚚",
            gradient: "from-cyan-600 to-blue-600",
            stats: "18-22°C"
        },
        {
            title: "Loot Box Game",
            description: "Du khách săn hộp quà ảo, nhận phần thưởng thật",
            icon: "🎁",
            gradient: "from-amber-600 to-orange-600",
            stats: "4 rarities"
        }
    ];

    return (
        <section className="py-20 px-4 bg-stone-900/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Công nghệ <span className="text-emerald-400">IPO-Ready</span>
                    </h2>
                    <p className="text-stone-400 max-w-2xl mx-auto">
                        Hạ tầng số hiện đại cho nông nghiệp thông minh
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 relative overflow-hidden group`}
                        >
                            <div className="absolute top-0 right-0 text-8xl opacity-20 -mr-4 -mt-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <div className="relative z-10">
                                <span className="text-4xl mb-4 block">{feature.icon}</span>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-white/80 text-sm mb-4">{feature.description}</p>
                                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm text-white font-medium">
                                    <Star className="w-4 h-4" />
                                    {feature.stats}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Premium testimonial
function PremiumTestimonial() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-500/20 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
                            ))}
                        </div>

                        <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
                            "AGRIOS đã thay đổi hoàn toàn cách tôi bán hoa. Giờ tôi có thể
                            <span className="text-emerald-400"> theo dõi tồn kho realtime</span>,
                            nhận đơn hàng online, và
                            <span className="text-emerald-400"> không còn lo được mùa mất giá</span>."
                        </blockquote>

                        <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-3xl">
                                👩‍🌾
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold">Cô Tư Hồng</div>
                                <div className="text-emerald-400 text-sm">Vườn Hồng Tư Tôn - Sa Đéc</div>
                                <div className="text-stone-500 text-xs">35 năm kinh nghiệm trồng hoa</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Final CTA
function FinalCTA() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden"
                >
                    {/* Animated sparkles */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-2xl"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                y: [-20, -60],
                                x: Math.random() * 20 - 10
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                            style={{ left: `${10 + i * 8}%`, top: '50%' }}
                        >
                            ✨
                        </motion.div>
                    ))}

                    <div className="relative z-10">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-5xl mb-6"
                        >
                            🌸
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Sẵn sàng trải nghiệm?
                        </h2>
                        <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
                            Tham gia cùng 500+ nhà vườn Sa Đéc đang sử dụng AGRIOS
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/register?role=farmer"
                                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <Flower2 className="w-5 h-5" />
                                Đăng ký Nhà Vườn
                            </Link>
                            <Link
                                href="/shop"
                                className="bg-emerald-700/50 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 border border-emerald-400/50"
                            >
                                <Gift className="w-5 h-5" />
                                Mua Hoa Tết
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Main WOW page
export default function WowPage() {
    return (
        <div className="min-h-screen bg-stone-950">
            {/* Hero with all effects */}
            <WowHero />

            {/* Flash Sales */}
            <section className="px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <FlashSaleBanner />
                </div>
            </section>

            {/* Two column: Tet Countdown + Weather */}
            <section className="px-4 py-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                    <TetCountdown />
                    <WeatherWidget />
                </div>
            </section>

            {/* Feature Showcase */}
            <FeatureShowcase />

            {/* Quick Links */}
            <QuickLinks />

            {/* Testimonial */}
            <PremiumTestimonial />

            {/* Final CTA */}
            <FinalCTA />
        </div>
    );
}

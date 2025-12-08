"use client";

import Link from "next/link";
import { formatPrice } from "@/data/flowers";
import * as React from "react";
import WishlistButton from "@/components/WishlistButton";
import QRHuntProgress from "@/components/QRHuntProgress";
import { motion } from "framer-motion";
import { Sparkles, Scan, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { VoiceSearch } from "@/components/VoiceSearch";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FAQSection } from "@/components/FAQSection";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCartStore } from "@/lib/cartStore";
import { toast } from "sonner";
import { VirtualGift } from "@/components/marketing/VirtualGift";

// Dynamic imports to prevent hydration mismatches for client-heavy features
const SmartCart = dynamic(() => import("@/components/SmartCart").then(mod => mod.SmartCart), { ssr: false });
const FortuneFlower = dynamic(() => import("@/components/FortuneFlower").then(mod => mod.FortuneFlower), { ssr: false });
const TetConfetti = dynamic(() => import("@/components/TetConfetti").then(mod => mod.TetConfetti), { ssr: false });
const NewsletterForm = dynamic(() => import("@/components/NewsletterForm"), { ssr: false });

export default function Home() {
  const { t } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadProducts() {
      try {
        const { getFeaturedProducts } = await import("@/lib/api/products");
        const data = await getFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, flower: any) => {
    e.preventDefault(); // Prevent navigation link
    addItem({
      id: flower.id,
      name: flower.name,
      price: flower.basePrice,
      image: flower.image
    });
    toast.success(`Đã thêm ${flower.name} vào giỏ!`);
  };

  return (
    <div className="min-h-screen bg-background font-sans relative text-foreground overflow-hidden">
      <ParticleBackground />
      <TetConfetti />

      <div className="max-w-7xl mx-auto px-4 pt-6 relative z-10">
        {/* QR Hunt Progress */}
        <div className="mb-6">
          <QRHuntProgress />
        </div>

        {/* Viral Campaign Banner - Cyber Style */}
        <div className="mb-8">
          <Link href="/campaign">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] p-6 group">
              <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none" />
              <div className="absolute top-0 right-0 p-4 opacity-30 animate-pulse">
                <Sparkles className="w-24 h-24 text-purple-400" />
              </div>
              <Badge className="bg-yellow-400 text-black font-bold border-none mb-2 shadow-[0_0_10px_rgba(250,204,21,0.5)]">EVENT LIVE ✨</Badge>
              <h3 className="text-2xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">Thử Thách Làng Hoa</h3>
              <p className="text-purple-200 text-sm mb-4 max-w-[80%] font-light">
                <span className="text-green-400 font-mono">#SaDecFlowerChallenge</span>: Join the hunt, claim iPhone 15 & "Climate Warrior" badge.
              </p>
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all group-hover:pl-6">
                ACCESS MISSION &rarr;
              </Button>
            </div>
          </Link>
        </div>

        {/* Search Bar - Glass */}
        <div className="mb-8 relative">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 group-focus-within:text-green-400 transition-colors" />
            <Input
              placeholder={t("search.placeholder")}
              className="pl-10 pr-12 h-12 rounded-full bg-black/40 border-green-500/20 text-white placeholder:text-stone-500 focus:ring-green-500/50 focus:border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-md"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <VoiceSearch onSearch={(query) => console.log("Searching for:", query)} />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {t("home.hot")} <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </h2>
          <span className="text-green-400 text-xs font-mono bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            {loading ? "SCANNING..." : `${products.length} SPECIES DETECTED`}
          </span>
        </div>

        {/* Grid Feed - 3D Cards */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-2xl border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((flower, index) => (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/flower/${flower.id}`} className="block group h-full">
                  <ThreeDCard className="h-full bg-gray-900/60 border-white/10">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
                      <Image
                        src={flower.image}
                        alt={flower.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/10">
                          <WishlistButton
                            flowerId={flower.id}
                            flowerName={flower.name}
                          />
                        </div>
                      </div>

                      {flower.inStock === false && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm border-2 border-red-500/50">
                          <span className="text-red-500 font-black tracking-widest border-2 border-red-500 px-4 py-2 rotate-[-15deg]">DEPLETED</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 relative">
                      <div className="mb-3">
                        <h3 className="font-bold text-white line-clamp-1 mb-1 text-[15px] group-hover:text-green-400 transition-colors shadow-black drop-shadow-md">
                          {flower.name}
                        </h3>
                        <p className="text-xs text-green-400/80 line-clamp-1 font-mono uppercase tracking-wider">
                          {flower.vibe}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-white text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                          {formatPrice(flower.basePrice)}
                        </p>
                        {flower.inStock !== false && (
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all"
                            onClick={(e) => handleAddToCart(e, flower)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </ThreeDCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* FAQ Section (AEO) - Styled */}
        <div className="mt-12 opacity-80">
          <FAQSection /> {/* Need to check if FAQSection works in dark mode */}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center pb-8">
          <Button
            size="lg"
            className="w-full rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white h-14 text-lg font-bold shadow-[0_0_30px_rgba(34,197,94,0.4)] border border-green-400/30 hover:scale-105 transition-all"
          >
            {t("home.scan_cta")}
          </Button>
          <p className="text-stone-500 text-sm mt-4 font-mono uppercase tracking-widest text-[10px]">
            {t("home.scan_desc")} // INITIATE SCAN SEQUENCE
          </p>
        </div>
      </div>

      {/* Floating Smart Cart */}
      <SmartCart />
      <VirtualGift />
    </div>
  );
}
"use client";

import Link from "next/link";
import { formatPrice } from "@/data/flowers";
import * as React from "react";
import WishlistButton from "@/components/WishlistButton";
import QRHuntProgress from "@/components/QRHuntProgress";
import { motion } from "framer-motion";
import { Sparkles, Scan, ShoppingCart, Terminal, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { VoiceSearch } from "@/components/VoiceSearch";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FAQSection } from "@/components/FAQSection";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCartStore } from "@/lib/cartStore";
import { toast } from "sonner";
import { VirtualGift } from "@/components/marketing/VirtualGift";
import { GlitchButton } from "@/components/ui/glitch-button";

// Dynamic imports
const SmartCart = dynamic(() => import("@/components/SmartCart").then(mod => mod.SmartCart), { ssr: false });
const FortuneFlower = dynamic(() => import("@/components/FortuneFlower").then(mod => mod.FortuneFlower), { ssr: false });
const TetConfetti = dynamic(() => import("@/components/TetConfetti").then(mod => mod.TetConfetti), { ssr: false });

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
    e.preventDefault();
    addItem({
      id: flower.id,
      name: flower.name,
      price: flower.basePrice,
      image: flower.image
    });
    toast.success(`SYSTEM: ADDED ${flower.name.toUpperCase()} TO MODULE`);
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans relative text-white overflow-hidden selection:bg-emerald-500/30">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
      <ParticleBackground />


      {/* Header */}
      <div className="relative z-10 p-6 border-b border-emerald-900/30 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded flex items-center justify-center border border-emerald-500/30">
            <Terminal className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-mono tracking-tighter text-white flex items-center gap-2">
              {t("status.system")} <span className="text-emerald-500">v3.0</span>
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500/70 tracking-widest uppercase">{t("status.nominal")}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 font-mono text-xs text-emerald-700">
          <Link href="/scan">
            <Button variant="outline" size="sm" className="bg-black border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 font-mono text-[10px] h-8 flex items-center gap-2">
              <Scan className="w-3 h-3" />
              {t("shop.access_cam")}
            </Button>
          </Link>
          <span>{t("shop.net_id")}</span>
          <span>{t("shop.secure_link")}</span>
        </div>
        <div className="md:hidden">
          {/* Mobile Header elements if needed */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0A0A0A] border border-emerald-900/50 p-8 rounded-lg overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-50">
              <Activity className="w-24 h-24 text-emerald-900/20" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded font-mono">EVENT_ACTIVE</span>
              <span className="text-[10px] font-mono text-emerald-500 animate-pulse">● LIVE DATA STREAM</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white tracking-tight font-mono">SA_DEC_FLOWER_HUNT_2026</h3>
            <p className="text-stone-400 text-sm mb-4 font-mono max-w-xl">
              <span className="text-emerald-400">&gt;</span> INITIATE: #SaDecFlowerChallenge to unlock <span className="text-white border-b border-emerald-500/30">iPhone 15 Pro</span> & Climate Badge.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-emerald-500/50 font-mono">CMD: ACCESS_MISSION</span>
              <div className="h-px bg-emerald-900/50 flex-1" />
            </div>
          </div>
        </div>

        {/* Search Bar - Terminal Input */}
        <div className="mb-12 relative max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative flex items-center bg-black border border-emerald-500/30 rounded">
              <div className="pl-4 font-mono text-emerald-500">{'>'}</div>
              <Input
                placeholder="INPUT_SEARCH_QUERY..."
                className="pl-4 pr-12 h-12 bg-transparent border-none text-white ring-0 focus-visible:ring-0 placeholder:text-stone-700 font-mono uppercase tracking-wider"
              />
              <div className="absolute right-2">
                <VoiceSearch onSearch={(query) => console.log("Searching for:", query)} />
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6 border-l-2 border-emerald-500 pl-4">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono flex items-center gap-2">
            {t("home.hot")}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-500/50 hidden sm:inline-block">DETECTED_ITEMS:</span>
            <span className="text-emerald-400 font-mono text-sm bg-emerald-900/20 px-2 py-1 rounded">{products.length}</span>
          </div>
        </div>

        {/* Products Grid - Cyber Cards */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((flower, index) => (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/flower/${flower.id}`} className="block group h-full">
                  <div className="h-full bg-black/40 border border-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group">
                    {/* Hover Scan Effect */}
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-400/50 -translate-y-full group-hover:animate-scan-fast z-20" />

                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                      <Image
                        src={flower.image}
                        alt={flower.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                      {/* Tech Overlay */}
                      <div className="absolute top-2 left-2 z-20">
                        <span className="text-[9px] font-mono text-emerald-400 bg-black/80 px-1 border border-emerald-500/20">IMG_0{index + 1}</span>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-3 z-30">
                        <h3 className="font-bold text-white font-mono text-sm mb-1 truncate group-hover:text-emerald-400 transition-colors">
                          {flower.name.toUpperCase()}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-emerald-400 text-xs">
                            {formatPrice(flower.basePrice)}
                          </p>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-[9px] text-stone-400 font-mono">
                            [VIEW]
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Overlay */}
                    <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div onClick={(e) => handleAddToCart(e, flower)} className="w-8 h-8 bg-black/80 border border-emerald-500/40 flex items-center justify-center hover:bg-emerald-500 hover:text-black cursor-pointer transition-colors">
                        <Zap className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-20 text-center pb-8 border-t border-emerald-900/30 pt-10">
          <h3 className="text-stone-500 text-xs font-mono uppercase tracking-[0.2em] mb-4">{t("shop.ready")}</h3>
          <Link href="/scan" className="inline-block">
            <GlitchButton text={t("cmd.initiate")} onClick={() => { }} className="w-64 mx-auto" />
          </Link>
          <div className="mt-4 text-[9px] text-emerald-900 font-mono">
            {t("shop.secure")}
          </div>
        </div>
      </div>

      {/* Floating Smart Cart */}
      <SmartCart />
      <VirtualGift />
    </div>
  );
}
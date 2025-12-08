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

      <div className="max-w-7xl mx-auto px-4 pt-6 relative z-10">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-8 border-b border-emerald-900/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center rounded">
              <Terminal className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-mono font-bold tracking-tight text-white">SHOP_TERMINAL <span className="text-emerald-500">v3.0</span></h1>
              <div className="flex items-center gap-2 text-[10px] text-emerald-500/60 font-mono">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                SYSTEM NORMAL
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 font-mono text-xs text-emerald-700">
            <Link href="/scan">
              <Button variant="outline" size="sm" className="bg-black border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 font-mono text-[10px] h-8 flex items-center gap-2">
                <Scan className="w-3 h-3" />
                ACCESS_CAMERA
              </Button>
            </Link>
            <span>NET_ID: 8492-AX</span>
            <span>SECURE_LINK</span>
          </div>
        </div>

        {/* Viral Campaign Banner - Agri-OS Style */}
        <div className="mb-10">
          <Link href="/campaign">
            <div className="relative rounded overflow-hidden bg-black/40 border border-emerald-500/20 group hover:border-emerald-500/50 transition-colors">
              <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center relative z-10 p-1">
                {/* Left: Graphic */}
                <div className="w-full md:w-32 h-32 bg-emerald-900/10 flex items-center justify-center border-r border-emerald-500/10">
                  <Sparkles className="w-12 h-12 text-emerald-400 animate-spin-slow" />
                </div>

                {/* Right: Content */}
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] tracking-widest uppercase rounded-none">EVENT_ACTIVE</Badge>
                    <span className="text-[10px] text-emerald-600 font-mono animate-pulse">● LIVE DATA STREAM</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white tracking-tight font-mono">SA_DEC_FLOWER_HUNT_2026</h3>
                  <p className="text-stone-400 text-sm mb-4 font-mono max-w-xl">
                    <span className="text-emerald-400">&gt;</span> INITIATE: #SaDecFlowerChallenge to unlock <span className="text-white border-b border-emerald-500/30">iPhone 15 Pro</span> & Climate Badge.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-emerald-500/50 font-mono">CMD: ACCESS_MISSION</span>
                    <div className="h-[1px] flex-1 bg-emerald-900/30" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
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

        {/* Data Grid Header */}
        <div className="flex items-end justify-between mb-6 border-b border-white/5 pb-2">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            MARKET_LISTING
          </h2>
          <span className="text-emerald-500/60 text-[10px] font-mono bg-emerald-900/10 px-2 py-1 border border-emerald-500/10">
            {loading ? "SCANNING_NODES..." : `${products.length} ITEMS_DETECTED`}
          </span>
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
          <h3 className="text-stone-500 text-xs font-mono uppercase tracking-[0.2em] mb-4">Are you ready to innovate?</h3>
          <Link href="/scan" className="inline-block">
            <GlitchButton text="INITIATE_SCAN_SEQUENCE" onClick={() => { }} className="w-64 mx-auto" />
          </Link>
          <div className="mt-4 text-[9px] text-emerald-900 font-mono">
            SADEC_OS SECURE CONNECTION // ENCRYPTED
          </div>
        </div>
      </div>

      {/* Floating Smart Cart */}
      <SmartCart />
      <VirtualGift />
    </div>
  );
}
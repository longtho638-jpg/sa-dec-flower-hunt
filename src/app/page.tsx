"use client";

import Link from "next/link";
import { flowers } from "@/lib/dummyData";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, Home as HomeIcon, Scan, Gift } from "lucide-react";
import FlowerCard from "@/components/FlowerCard";
import SkeletonCard from "@/components/SkeletonCard";
import { useState, useEffect } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for polish
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen pb-32 relative overflow-x-hidden bg-background text-foreground">
      {/* Mobile Container Simulation */}
      <div className="max-w-md mx-auto bg-[#FDFBF7] min-h-screen shadow-2xl relative">
        {/* Sticky Glass Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 px-6 py-4 flex items-center justify-between border-b border-white/20">
          <h1 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🌸
            </motion.span>
            Sa Đéc Hunt
          </h1>
          <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden border border-white/50">
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary opacity-50" />
          </div>
        </header>

        {/* Hero Section */}
        <div className="pt-8 px-6 mb-6 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="font-serif text-3xl font-black leading-tight mb-2 text-stone-900">
              Khám Phá <br />
              <span className="text-secondary">Mùa Hoa 2026</span>
            </h2>
            <p className="text-stone-500 text-sm font-medium">
              Sưu tầm tem hoa, nhận quà cực chất!
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-8">
          <div className="relative bg-white rounded-3xl shadow-sm flex items-center px-5 py-3 transition-all border border-stone-100 focus-within:ring-2 focus-within:ring-primary/20">
            <Search className="w-5 h-5 text-stone-400 mr-3" />
            <input
              type="text"
              placeholder="Tìm loài hoa..."
              className="bg-transparent border-none outline-none text-stone-900 w-full placeholder:text-stone-400 font-medium text-sm"
            />
          </div>
        </div>

        {/* Flower Discovery Grid */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Nổi Bật
            </h3>
            <span className="text-xs text-primary font-bold cursor-pointer hover:underline">
              Xem tất cả
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-4"
              >
                {flowers.map((flower) => (
                  <Link href={`/flower/${flower.id}`} key={flower.id}>
                    <motion.div variants={item}>
                      <FlowerCard flower={flower} />
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-soft-red flex justify-between items-center py-3 px-6 border border-white/50 w-[90%] max-w-[350px] pointer-events-auto">
            <button className="flex flex-col items-center gap-1 text-primary">
              <HomeIcon className="w-6 h-6" />
            </button>

            <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-accent transition-colors group relative">
              <div className="absolute -top-10 bg-primary rounded-full p-3 shadow-lg border-4 border-[#FDFBF7] group-hover:scale-110 transition-transform">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <div className="w-6 h-6" /> {/* Spacer */}
            </button>

            <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-secondary transition-colors">
              <Gift className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

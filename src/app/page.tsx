"use client";

import Link from "next/link";
import { flowers } from "@/lib/dummyData";
import { motion } from "framer-motion";
import { Search, Heart, Home as HomeIcon, Scan, Gift } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Home() {
  return (
    <main className="min-h-screen pb-28 relative overflow-x-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-layer aurora-layer-1"></div>
        <div className="aurora-layer aurora-layer-2"></div>
        <div className="aurora-layer aurora-layer-3"></div>
      </div>
      <div className="mesh-overlay"></div>

      {/* Hero Section */}
      <div className="pt-16 px-6 mb-8 text-center relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-cyan uppercase bg-cyan/10 border border-cyan/30 rounded-full animate-fade-in-up">
            Sa Dec Flower Hunt 2026
          </span>
          <h1 className="font-sans text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Truy Tìm <br />
            <span className="text-gradient-aurora">Kho Báu Hoa</span>
          </h1>
          <p className="text-white/60 text-base max-w-xs mx-auto leading-relaxed animate-fade-in-up delay-100">
            Khám phá vẻ đẹp rực rỡ, sưu tầm tem hoa và nhận quà cực chất!
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-10 sticky top-4 z-20">
        <div className="relative glass-panel rounded-full flex items-center px-5 py-4 transition-all focus-within:ring-2 focus-within:ring-cyan/50">
          <Search className="w-5 h-5 text-cyan mr-3" />
          <input
            type="text"
            placeholder="Tìm loài hoa yêu thích..."
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/40 font-medium"
          />
        </div>
      </div>

      {/* Flower Discovery Grid */}
      <div className="px-4 relative z-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl font-bold text-white">Khám Phá</h2>
          <span className="text-xs text-cyan font-medium cursor-pointer hover:underline">
            Xem tất cả
          </span>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {flowers.map((flower) => (
            <Link href={`/flower/${flower.id}`} key={flower.id}>
              <motion.div
                variants={item}
                className="glass-card relative aspect-[4/5] rounded-2xl overflow-hidden group"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flower.imageUrl}
                  alt={flower.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Heart Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-pink/80 transition-colors z-10 border border-white/10">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1 drop-shadow-md">
                    {flower.name}
                  </h3>
                  <p className="text-cyan text-[10px] font-medium tracking-wide line-clamp-1">
                    {flower.personality}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="glass-panel rounded-2xl flex justify-around items-center py-4 px-2 backdrop-blur-xl bg-[#0f0f1a]/80">
          <button className="flex flex-col items-center gap-1 text-cyan">
            <HomeIcon className="w-6 h-6 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span className="text-[10px] font-bold">Trang chủ</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/40 hover:text-purple transition-colors group">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan to-purple rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] -mt-10 border-4 border-[#0f0f1a] group-hover:scale-110 transition-transform">
              <Scan className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium">Quét QR</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/40 hover:text-pink transition-colors">
            <Gift className="w-6 h-6" />
            <span className="text-[10px] font-medium">Bộ sưu tập</span>
          </button>
        </div>
      </div>
    </main>
  );
}

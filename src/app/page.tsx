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
    <main className="min-h-screen pb-32 relative overflow-x-hidden bg-background text-foreground">
      {/* Hero Section */}
      <div className="pt-16 px-6 mb-8 text-center relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 rounded-full">
            Sa Dec Flower Hunt 2026
          </span>
          <h1 className="font-serif text-5xl font-black leading-tight mb-4 text-primary drop-shadow-sm">
            Truy Tìm <br />
            <span className="text-secondary">Kho Báu Hoa</span>
          </h1>
          <p className="text-stone-900/70 text-base max-w-xs mx-auto leading-relaxed font-medium">
            Khám phá vẻ đẹp rực rỡ, sưu tầm tem hoa và nhận quà cực chất!
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-10 sticky top-4 z-20">
        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-soft-red flex items-center px-5 py-4 transition-all border border-white/50 focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="w-6 h-6 text-primary mr-3" />
          <input
            type="text"
            placeholder="Tìm loài hoa yêu thích..."
            className="bg-transparent border-none outline-none text-stone-900 w-full placeholder:text-stone-900/40 font-bold"
          />
        </div>
      </div>

      {/* Flower Discovery Grid */}
      <div className="px-4 relative z-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-black text-stone-900 font-serif">Khám Phá</h2>
          <span className="text-sm text-primary font-bold cursor-pointer hover:underline">
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
                className="bg-white relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-soft-yellow border border-stone-100"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flower.imageUrl}
                  alt={flower.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Heart Icon */}
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-10 shadow-sm">
                  <Heart className="w-5 h-5" />
                </button>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white font-serif font-bold text-lg leading-tight mb-1 drop-shadow-md">
                    {flower.name}
                  </h3>
                  <p className="text-secondary text-xs font-bold tracking-wide line-clamp-1 bg-black/20 backdrop-blur-sm inline-block px-2 py-0.5 rounded-lg">
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
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-soft-red flex justify-around items-center py-4 px-2 border border-white/50">
          <button className="flex flex-col items-center gap-1 text-primary">
            <HomeIcon className="w-7 h-7" />
            <span className="text-[10px] font-bold">Trang chủ</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-accent transition-colors group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-soft-red -mt-10 border-[6px] border-[#FDFBF7] group-hover:scale-110 transition-transform">
              <Scan className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold mt-1">Quét QR</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-secondary transition-colors">
            <Gift className="w-7 h-7" />
            <span className="text-[10px] font-bold">Bộ sưu tập</span>
          </button>
        </div>
      </div>
    </main>
  );
}

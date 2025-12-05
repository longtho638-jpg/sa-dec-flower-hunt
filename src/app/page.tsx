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
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 pb-28 relative overflow-x-hidden font-sans">
      {/* Hero Section */}
      <div className="pt-12 px-6 mb-8 text-center relative">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10"
        >
          <h1 className="font-serif text-4xl font-bold text-tet-red leading-tight mb-2 drop-shadow-sm">
            Truy Tìm <br />
            Kho Báu Hoa <br />
            Sa Đéc 2026
          </h1>
          <p className="text-gray-600 text-sm">Khám phá • Sưu tầm • Nhận quà</p>
        </motion.div>

        {/* Floating Flower Animation */}
        <div className="absolute top-0 right-4 w-20 h-20 animate-bounce-slow opacity-80 pointer-events-none">
          <span className="text-6xl">🌸</span>
        </div>
        <div className="absolute top-10 left-4 w-16 h-16 animate-bounce-slow delay-700 opacity-60 pointer-events-none">
          <span className="text-5xl">🌼</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-8 sticky top-4 z-20">
        <div className="relative glass-morphism rounded-full shadow-lg flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Tìm loài hoa yêu thích..."
            className="bg-transparent border-none outline-none text-gray-700 w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Flower Discovery Grid */}
      <div className="px-4">
        <h2 className="font-serif text-xl font-bold text-gray-800 mb-4 px-2">Khám Phá</h2>
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
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group bg-white"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flower.imageUrl}
                  alt={flower.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Heart Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tet-red/80 transition-colors z-10">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-3 w-full">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1">{flower.name}</h3>
                  <p className="text-white/70 text-[10px] line-clamp-1">{flower.personality}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="glass-morphism rounded-2xl shadow-2xl flex justify-around items-center py-4 px-2">
          <button className="flex flex-col items-center gap-1 text-tet-red">
            <HomeIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">Trang chủ</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-tet-red transition-colors">
            <div className="w-12 h-12 bg-tet-red rounded-full flex items-center justify-center text-white shadow-lg -mt-8 border-4 border-white">
              <Scan className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium">Quét QR</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-tet-red transition-colors">
            <Gift className="w-6 h-6" />
            <span className="text-[10px] font-medium">Bộ sưu tập</span>
          </button>
        </div>
      </div>
    </main>
  );
}

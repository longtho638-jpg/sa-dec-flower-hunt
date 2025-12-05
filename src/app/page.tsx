"use client";

import Link from "next/link";
import { flowers } from "@/lib/dummyData";
import { motion } from "framer-motion";
import { Scan, Sparkles, MapPin, ArrowRight } from "lucide-react";

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
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-24 relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-tet-red/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tet-yellow/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-tet-green/10 rounded-full blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <p className="text-tet-yellow font-medium text-sm tracking-wider uppercase mb-1">Sa Dec 2025</p>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Flower Hunt
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
            <Sparkles className="w-5 h-5 text-tet-yellow" />
          </div>
        </motion.div>

        {/* Hero Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full aspect-[16/9] rounded-2xl bg-gradient-to-br from-tet-red to-red-900 relative overflow-hidden shadow-2xl mb-10 group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded-md bg-tet-yellow text-black text-xs font-bold">EVENT</span>
              <span className="text-white/80 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> Sa Dec Flower Village</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              Collect Stamps,<br />
              <span className="text-tet-yellow">Redeem Gifts 🎁</span>
            </h2>
            <p className="text-white/70 text-sm line-clamp-2">
              Explore the village, scan QR codes on flower pots, and unlock exclusive rewards!
            </p>
          </div>
        </motion.div>

        {/* Section Title */}
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-bold text-white">Popular Flowers</h3>
          <span className="text-xs text-white/40">10 varieties</span>
        </div>

        {/* Flower Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4"
        >
          {flowers.map((flower) => (
            <Link href={`/flower/${flower.id}`} key={flower.id}>
              <motion.div
                variants={item}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flower.imageUrl}
                    alt={flower.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <h4 className="text-white font-bold text-sm mb-0.5 truncate">{flower.name}</h4>
                    <p className="text-white/60 text-[10px] truncate">{flower.personality}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-transform">
          <Scan className="w-5 h-5" />
          <span>Scan QR</span>
        </button>
      </motion.div>
    </main>
  );
}

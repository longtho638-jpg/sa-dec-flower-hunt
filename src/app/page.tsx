"use client";

import Link from "next/link";
import { flowers } from "@/lib/dummyData";

export default function Home() {
  return (
    <main className="min-h-screen bg-tet-yellow/10 pb-20">
      {/* Hero Section */}
      <div className="bg-tet-red text-white p-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Sa Dec Flower Hunt 🌸</h1>
          <p className="text-white/90 text-lg">
            Scan QR codes, collect stamps, and discover the stories of our flowers!
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 bg-tet-yellow/20 rounded-full blur-xl" />
      </div>

      {/* How to Play */}
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-tet-green/20">
          <h2 className="text-tet-green font-bold text-xl mb-4">How to Play 🧧</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Find flower pots with QR codes.</li>
            <li>Scan to reveal the flower's story.</li>
            <li>Collect stamps to redeem gifts!</li>
          </ol>
        </div>
      </div>

      {/* Featured Flowers (For testing/demo) */}
      <div className="px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Flowers</h2>
        <div className="grid grid-cols-1 gap-4">
          {flowers.map((flower) => (
            <Link
              href={`/flower/${flower.id}`}
              key={flower.id}
              className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex">
                <div className="w-1/3 relative h-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flower.imageUrl}
                    alt={flower.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-center">
                  <h3 className="font-bold text-lg text-tet-red">{flower.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{flower.personality}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-10 mb-4">
        © 2025 Sa Dec Flower Festival
      </div>
    </main>
  );
}

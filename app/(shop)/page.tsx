"use client";

import { FLOWERS } from "@/data/flowers";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="p-8 pb-28">
      <h1 className="text-2xl font-bold mb-4">Test Phase 1: + Navbar</h1>
      <p className="mb-4">Adding back Navbar only</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {FLOWERS.map((flower) => (
          <div key={flower.id} className="border p-4 rounded">
            <h3 className="font-bold">{flower.name}</h3>
            <p className="text-sm text-gray-600">{flower.vibe}</p>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}

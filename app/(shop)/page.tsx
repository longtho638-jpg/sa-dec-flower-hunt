"use client";

import { FLOWERS } from "@/data/flowers";
import Navbar from "@/components/Navbar";
import QRHuntProgress from "@/components/QRHuntProgress";

export default function HomePage() {
  return (
    <div className="p-8 pb-28">
      <h1 className="text-2xl font-bold mb-4">Test Phase 2: + QRHuntProgress</h1>
      <p className="mb-4">Testing if QRHuntProgress prefetch triggers crash</p>

      <div className="mb-8">
        <QRHuntProgress />
      </div>

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

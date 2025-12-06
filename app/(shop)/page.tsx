"use client";

import { FLOWERS } from "@/data/flowers";
import Navbar from "@/components/Navbar";
import QRHuntProgress from "@/components/QRHuntProgress";
import dynamic from "next/dynamic";

const SmartCart = dynamic(() => import("@/components/SmartCart").then(mod => mod.SmartCart), { ssr: false });
const FortuneFlower = dynamic(() => import("@/components/FortuneFlower").then(mod => mod.FortuneFlower), { ssr: false });

export default function HomePage() {
  return (
    <div className="p-8 pb-28">
      <h1 className="text-2xl font-bold mb-4">Test Phase 4B: FortuneFlower ONLY</h1>
      <p className="mb-4 text-red-600 font-bold">🎯 THE CULPRIT - Should crash here</p>

      <div className="mb-4">
        <FortuneFlower />
      </div>

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

      <SmartCart />
      <Navbar />
    </div>
  );
}

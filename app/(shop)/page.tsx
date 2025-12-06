"use client";

import { FLOWERS } from "@/data/flowers";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bare Minimum Test</h1>
      <p>If this crashes, the bug is NOT in components.</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {FLOWERS.map((flower) => (
          <div key={flower.id} className="border p-4 rounded">
            <h3 className="font-bold">{flower.name}</h3>
            <p className="text-sm text-gray-600">{flower.vibe}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

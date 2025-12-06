"use client";

import { FL OWERS } from "@/data/flowers";

export default function HomePage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Flower List (No Components)</h1>
            <div className="grid grid-cols-2 gap-4">
                {FLOWERS.map((flower) => (
                    <div key={flower.id} className="border p-4 rounded">
                        <h3 className="font-bold">{flower.name}</h3>
                        <p className="text-sm text-gray-600">{flower.vibe}</p>
                        <p className="text-red-600 font-bold">{flower.basePrice}đ</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

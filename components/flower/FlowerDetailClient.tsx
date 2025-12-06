"use client";

// import { useParams } from "next/navigation";
import { FLOWERS } from "@/data/flowers";
import { motion } from "framer-motion";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { TraceabilityTimeline } from "@/components/TraceabilityTimeline";
import { FreshnessIndex } from "@/components/FreshnessIndex";
import { GardenProfile } from "@/components/GardenProfile";
import { DrFlowerChat } from "@/components/DrFlowerChat";
import { ARView } from "@/components/ARView";
import { FlowerHero } from "@/components/flower/FlowerHero";
import { FlowerHeader } from "@/components/flower/FlowerHeader";
import { FlowerDetails } from "@/components/flower/FlowerDetails";
import { TrustBadges } from "@/components/flower/TrustBadges";
import { FlowerActions } from "@/components/flower/FlowerActions";

export default function FlowerDetailClient({ id }: { id: number }) {
    // const params = useParams(); // Removed
    const flowerId = id;
    const [showAR, setShowAR] = useState(false);

    const flower = FLOWERS.find((f) => f.id === flowerId);

    if (!flower) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <p className="text-stone-500">Không tìm thấy hoa</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            <FlowerHero
                image={flower.image}
                name={flower.name}
                id={flower.id}
                onOpenAR={() => setShowAR(true)}
            />

            {/* Product Schema (GEO) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": flower.name,
                        "image": flower.image,
                        "description": flower.salesPitch,
                        "brand": {
                            "@type": "Brand",
                            "name": "Sa Đéc Flower Hunt"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://sadec-flower-hunt.vercel.app/flower/${flower.id}`,
                            "priceCurrency": "VND",
                            "price": flower.basePrice,
                            "availability": "https://schema.org/InStock",
                            "itemCondition": "https://schema.org/NewCondition"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "reviewCount": "125"
                        }
                    })
                }}
            />

            {/* Content Container */}
            <div className="max-w-md mx-auto -mt-6 relative z-10 px-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-3xl shadow-xl p-6 border border-stone-100"
                >
                    <FlowerHeader
                        name={flower.name}
                        basePrice={flower.basePrice}
                        vibe={flower.vibe}
                    />

                    <TrustBadges />

                    <Separator className="my-6" />

                    <FlowerDetails
                        origin={flower.origin}
                        salesPitch={flower.salesPitch}
                    />

                    {/* AgriTech: Freshness & Traceability */}
                    <div className="space-y-6 mb-8">
                        <FreshnessIndex />
                        <GardenProfile />
                        <div className="bg-stone-50 rounded-2xl p-4">
                            <TraceabilityTimeline />
                        </div>
                    </div>

                    <FlowerActions
                        flowerId={flower.id}
                        flowerName={flower.name}
                        flowerImage={flower.image}
                        basePrice={flower.basePrice}
                        sizesAvailable={flower.sizesAvailable}
                    />
                </motion.div>

                {/* Lead Form */}
                <div className="mt-6 mb-8">
                    <LeadCaptureForm flowerId={flower.id} flowerName={flower.name} />
                </div>
            </div>

            {/* AI Advisor */}
            <DrFlowerChat flowerName={flower.name} />

            {/* AR View */}
            <ARView
                isOpen={showAR}
                onClose={() => setShowAR(false)}
                flowerImage={flower.image}
                flowerName={flower.name}
            />
        </div>
    );
}

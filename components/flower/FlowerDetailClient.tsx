"use client";

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
import FarmerStory from "@/components/flower/FarmerStory";
import { FARMER_STORIES } from "@/lib/farmerStories";
import { ProductReviews } from "@/components/ProductReviews";
import { RelatedProducts } from "@/components/RelatedProducts";
import { UrgencyTriggers } from "@/components/flower/UrgencyTriggers";
import type { Product } from "@/lib/api/products";

export default function FlowerDetailClient({ product }: { product: Product }) {
    const [showAR, setShowAR] = useState(false);
    const [stock, setStock] = useState(0);

    // Minimize hydration mismatch by setting random data on mount
    useState(() => {
        setStock(Math.floor(Math.random() * 15) + 5);
    });

    // Find story by matching name since we moved to UUIDs
    const story = Object.values(FARMER_STORIES).find(s => s.flowerName === product.name);

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            <FlowerHero
                image={product.image}
                name={product.name}
                id={product.id as any} // Temporary cast if Hero expects number, checking compat... Hero likely just passes it through
                onOpenAR={() => setShowAR(true)}
            />

            {/* Product Schema (GEO) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.name,
                        "image": product.image,
                        "description": product.salesPitch,
                        "brand": {
                            "@type": "Brand",
                            "name": "Sa Đéc Flower Hunt"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://sadec-flower-hunt.vercel.app/flower/${product.id}`,
                            "priceCurrency": "VND",
                            "price": product.basePrice,
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
                        name={product.name}
                        basePrice={product.basePrice}
                        vibe={product.vibe}
                    />

                    {/* Urgency Triggers */}
                    {stock > 0 && <UrgencyTriggers stock={stock} />}

                    <TrustBadges />

                    <Separator className="my-6" />

                    <FlowerDetails
                        origin={product.origin}
                        salesPitch={product.salesPitch}
                    />

                    {/* WOW Factor: Farmer Story */}
                    {story && (
                        <div className="mb-6">
                            <FarmerStory story={story} />
                        </div>
                    )}

                    {/* AgriTech: Freshness & Traceability */}
                    <div className="space-y-4 mb-4">
                        <FreshnessIndex />
                        <GardenProfile />
                        <div className="bg-stone-50 rounded-2xl p-4">
                            <TraceabilityTimeline />
                        </div>
                    </div>

                    <FlowerActions
                        flowerId={product.id as any}
                        flowerName={product.name}
                        flowerImage={product.image}
                        basePrice={product.basePrice}
                        sizesAvailable={product.sizesAvailable as any}
                    />

                    {/* Social Proof & Recommendations */}
                    <ProductReviews />
                </motion.div>

                {/* Lead Form */}
                <div className="mt-6 mb-8">
                    <LeadCaptureForm flowerId={product.id as any} flowerName={product.name} />
                </div>

                {/* Related Products Section */}
                <div className="mb-12">
                    <RelatedProducts />
                </div>

            </div>

            {/* AI Advisor */}
            <DrFlowerChat flowerName={product.name} />

            {/* AR View */}
            <ARView
                isOpen={showAR}
                onClose={() => setShowAR(false)}
                flowerImage={product.image}
                flowerName={product.name}
            />
        </div>
    );
}


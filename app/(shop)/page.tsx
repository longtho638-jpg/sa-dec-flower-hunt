"use client";

import Link from "next/link";
import { FLOWERS, formatPrice } from "@/data/flowers";
import Navbar from "@/components/Navbar";
import WishlistButton from "@/components/WishlistButton";
import QRHuntProgress from "@/components/QRHuntProgress";
import { motion } from "framer-motion";
import { Sparkles, Scan, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { VoiceSearch } from "@/components/VoiceSearch";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FAQSection } from "@/components/FAQSection";
import Image from "next/image";
import { SmartCart } from "@/components/SmartCart";
import { FortuneFlower } from "@/components/FortuneFlower";
import { useCartStore } from "@/lib/cartStore";
import { toast } from "sonner";

export default function Home() {
  const { t } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent, flower: any) => {
    e.preventDefault(); // Prevent navigation link
    addItem({
      id: flower.id,
      name: flower.name,
      price: flower.basePrice,
      image: flower.image
    });
    toast.success(`Đã thêm ${flower.name} vào giỏ!`);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-28 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="text-xl font-bold text-stone-900 flex items-center gap-2 tracking-tight">
              <span className="text-2xl">🌸</span>
              {t("app.title")}
            </h1>
            <p className="text-stone-500 text-xs font-medium">
              {t("app.subtitle")}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <LanguageToggle />
            <FortuneFlower />
            <Link href="/scan">
              <Button size="icon" variant="ghost" className="rounded-full bg-stone-100 text-stone-600 hover:bg-green-100 hover:text-green-600">
                <Scan className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pt-6">
        {/* QR Hunt Progress */}
        <div className="mb-8">
          <QRHuntProgress />
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              placeholder={t("search.placeholder")}
              className="pl-10 pr-12 h-12 rounded-full bg-white border-stone-200 shadow-sm focus:ring-red-500 focus:border-red-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <VoiceSearch onSearch={(query) => console.log("Searching for:", query)} />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            {t("home.hot")}
          </h2>
          <span className="text-stone-500 text-sm font-medium bg-stone-100 px-2 py-1 rounded-full">
            {FLOWERS.length} loài
          </span>
        </div>

        {/* Grid Feed */}
        <div className="grid grid-cols-2 gap-4">
          {FLOWERS.map((flower, index) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/flower/${flower.id}`} className="block group h-full">
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white rounded-2xl relative">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <Image
                      src={flower.image}
                      alt={flower.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm">
                        <WishlistButton
                          flowerId={flower.id}
                          flowerName={flower.name}
                        />
                      </div>
                    </div>
                    {flower.inStock === false && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
                        <Badge variant="destructive" className="font-bold">{t("flower.out_of_stock")}</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-3 flex-1 flex flex-col justify-between">
                    <div className="mb-2">
                      <h3 className="font-bold text-stone-900 line-clamp-1 mb-1 text-[15px] group-hover:text-red-600 transition-colors">
                        {flower.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-1 font-medium">
                        {flower.vibe}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                        <p className="font-bold text-red-600 text-sm">
                        {formatPrice(flower.basePrice)}
                        </p>
                        {flower.inStock !== false && (
                            <Button 
                                size="icon" 
                                className="h-8 w-8 rounded-full bg-stone-900 hover:bg-red-600 transition-colors shadow-md"
                                onClick={(e) => handleAddToCart(e, flower)}
                            >
                                <ShoppingCart className="w-4 h-4 text-white" />
                            </Button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section (AEO) */}
        <div className="mt-12">
          <FAQSection />
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center pb-8">
          <Button
            size="lg"
            className="w-full rounded-full bg-stone-900 text-white hover:bg-stone-800 h-14 text-lg font-bold shadow-xl transition-transform active:scale-95"
          >
            {t("home.scan_cta")}
          </Button>
          <p className="text-stone-400 text-sm mt-4 font-medium">
            {t("home.scan_desc")}
          </p>
        </div>
      </div>

      {/* Floating Smart Cart */}
      <SmartCart />

      {/* Navbar */}
      <Navbar />
    </div>
  );
}
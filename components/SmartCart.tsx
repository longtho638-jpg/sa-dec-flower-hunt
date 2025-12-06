"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MoneyModal } from "./MoneyModal";
import Image from "next/image";

export function SmartCart() {
  const { items, removeItem, updateQuantity, getTotal, itemCount } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsClient(true);
  }, []);

  const total = getTotal();
  const count = itemCount();

  if (!isClient) return null;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
          >
            <ShoppingCart className="w-6 h-6" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md flex flex-col bg-stone-50">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-2xl">
              <ShoppingCart className="w-6 h-6" /> Giỏ Hàng
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                <p>Giỏ hàng đang trống</p>
                <Button variant="link" onClick={() => setIsOpen(false)}>
                  Tiếp tục xem hoa
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 bg-white p-3 rounded-xl shadow-sm border border-stone-100"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                        <p className="text-sm font-medium text-red-600">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-stone-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-red-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-green-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <SheetFooter className="border-t border-stone-200 pt-4 mt-auto">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                  </span>
                </div>
                <Button
                  onClick={() => setShowMoneyModal(true)}
                  className="w-full bg-stone-900 text-white hover:bg-stone-800 h-12 text-lg font-bold shadow-lg"
                >
                  Liên Hệ Đặt Hàng <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-center text-stone-500">
                  *Phí vận chuyển sẽ được tính khi xác nhận đơn hàng.
                </p>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <MoneyModal
        isOpen={showMoneyModal}
        onClose={() => setShowMoneyModal(false)}
        onSuccess={() => setIsOpen(false)}
      />
    </>
  );
}
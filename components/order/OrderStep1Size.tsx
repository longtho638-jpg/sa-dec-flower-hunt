"use client";

import { SizeKey, formatPrice } from "@/data/flowers";
import SizePicker from "../SizePicker";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface OrderStep1SizeProps {
    selectedSize: SizeKey;
    availableSizes: SizeKey[];
    basePrice: number;
    quantity: number;
    totalPrice: number;
    onSizeChange: (size: SizeKey) => void;
    onQuantityChange: (quantity: number) => void;
    onNext: () => void;
}

export function OrderStep1Size({
    selectedSize,
    availableSizes,
    basePrice,
    quantity,
    totalPrice,
    onSizeChange,
    onQuantityChange,
    onNext
}: OrderStep1SizeProps) {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <h3 className="font-bold text-stone-800 mb-4">Chọn Kích Thước</h3>

            <SizePicker
                selectedSize={selectedSize}
                availableSizes={availableSizes}
                basePrice={basePrice}
                onSelect={onSizeChange}
            />

            {/* Quantity */}
            <div className="mt-6">
                <h3 className="font-bold text-stone-800 mb-3">Số Lượng</h3>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                    <button
                        onClick={() => onQuantityChange(quantity + 1)}
                        className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Total */}
            <div className="mt-6 p-4 bg-red-50 rounded-2xl flex justify-between items-center">
                <span className="text-stone-600">Tổng tiền:</span>
                <span className="text-2xl font-bold text-red-600">{formatPrice(totalPrice)}</span>
            </div>

            <button
                onClick={onNext}
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
                Tiếp Tục →
            </button>
        </motion.div>
    );
}

"use client";

import { useState } from "react";
import { SizeKey, calculatePrice } from "@/data/flowers";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";
import { OrderStep1Size } from "./order/OrderStep1Size";
import { OrderStep2Details } from "./order/OrderStep2Details";
import { OrderStep3Confirm } from "./order/OrderStep3Confirm";
import { OrderSuccess } from "./order/OrderSuccess";

interface OrderFormProps {
    flowerId: number;
    flowerName: string;
    flowerImage: string;
    basePrice: number;
    availableSizes: SizeKey[];
}

export default function OrderForm({ flowerId, flowerName, flowerImage, basePrice, availableSizes }: OrderFormProps) {
    const [step, setStep] = useState(1); // 1: size, 2: details, 3: confirm
    const [selectedSize, setSelectedSize] = useState<SizeKey>(availableSizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const totalPrice = calculatePrice(basePrice, selectedSize) * quantity;

    const handleSubmit = async () => {
        if (!name || !phone || !address) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    flowerId,
                    flowerName,
                    size: selectedSize,
                    quantity,
                    price: totalPrice,
                    customerName: name,
                    customerPhone: phone,
                    address,
                    notes
                })
            });

            const data = await response.json();

            if (data.success) {
                // Celebration!
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#D0312D', '#EAB308', '#22C55E', '#EC4899']
                });

                setOrderId(data.orderId || "ORD-" + Date.now());
                setIsSuccess(true);
            }
        } catch (error) {
            console.error("Order error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <OrderSuccess
                orderId={orderId}
                flowerName={flowerName}
                flowerImage={flowerImage}
                selectedSize={selectedSize}
                quantity={quantity}
                totalPrice={totalPrice}
            />
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-white" />
                    <div>
                        <h2 className="text-lg font-bold text-white">Đặt Hàng Ngay</h2>
                        <p className="text-red-100 text-sm">Giao tận nhà trong 24h</p>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="flex px-6 pt-4 gap-2">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`flex-1 h-1 rounded-full ${s <= step ? "bg-red-500" : "bg-stone-200"}`}
                    />
                ))}
            </div>

            <div className="p-6">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <OrderStep1Size
                            selectedSize={selectedSize}
                            availableSizes={availableSizes}
                            basePrice={basePrice}
                            quantity={quantity}
                            totalPrice={totalPrice}
                            onSizeChange={setSelectedSize}
                            onQuantityChange={setQuantity}
                            onNext={() => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <OrderStep2Details
                            name={name}
                            phone={phone}
                            address={address}
                            notes={notes}
                            onNameChange={setName}
                            onPhoneChange={setPhone}
                            onAddressChange={setAddress}
                            onNotesChange={setNotes}
                            onBack={() => setStep(1)}
                            onNext={() => setStep(3)}
                        />
                    )}

                    {step === 3 && (
                        <OrderStep3Confirm
                            flowerName={flowerName}
                            flowerImage={flowerImage}
                            selectedSize={selectedSize}
                            quantity={quantity}
                            totalPrice={totalPrice}
                            name={name}
                            phone={phone}
                            address={address}
                            isLoading={isLoading}
                            onBack={() => setStep(2)}
                            onSubmit={handleSubmit}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

"use client";

import { SmartVision } from "@/components/SmartVision";
import { QRScanner } from "@/components/QRScanner";
import { ChevronLeft, QrCode, Scan } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScanPage() {
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 pb-20">
            <div className="max-w-md mx-auto">
                <div className="flex items-center mb-6">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="-ml-2">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-bold ml-2">Trung Tâm Quét</h1>
                </div>

                <Tabs defaultValue="qr" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="qr" className="flex gap-2">
                            <QrCode className="w-4 h-4" /> Săn Hoa (QR)
                        </TabsTrigger>
                        <TabsTrigger value="ai" className="flex gap-2">
                            <Scan className="w-4 h-4" /> Nhận Diện (AI)
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="qr" className="mt-0">
                        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-800 text-center">
                            <h2 className="text-xl font-bold mb-2 text-stone-800 dark:text-white">Quét Mã QR Tại Vườn</h2>
                            <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                                Tìm các bảng mã QR ẩn trong vườn hoa để tích điểm và nhận voucher giảm giá!
                            </p>
                            <QRScanner />
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="ai" className="mt-0">
                        <SmartVision />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

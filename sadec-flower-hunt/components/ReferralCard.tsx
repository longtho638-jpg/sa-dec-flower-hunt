"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Gift, Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import confetti from "canvas-confetti"

export function ReferralCard() {
    const [copied, setCopied] = useState(false)
    const referralCode = "TET2026-" + Math.floor(Math.random() * 10000)

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://sadec-flower-hunt.vercel.app?ref=${referralCode}`)
        setCopied(true)

        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#EC4899', '#EAB308']
        })

        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Tặng bạn 50k mua hoa Tết! 🌸',
                    text: 'Nhận ngay voucher 50k khi đặt hoa Sa Đéc tại đây:',
                    url: `https://sadec-flower-hunt.vercel.app?ref=${referralCode}`,
                })
            } catch (error) {
                console.log('Error sharing', error)
            }
        } else {
            handleCopy()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-md mt-6"
        >
            <div className="relative">
                {/* Gift Card Visual */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl transform rotate-1 opacity-20 blur-lg"></div>

                <Card className="relative border-0 overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-stone-900 dark:to-stone-900 border-pink-100 dark:border-pink-900/30 shadow-xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-200 to-transparent rounded-bl-full opacity-50"></div>

                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center shrink-0">
                                <Gift className="w-6 h-6 text-pink-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-stone-900 dark:text-white">Tặng bạn bè 50K 🎁</h3>
                                <p className="text-sm text-stone-500 dark:text-stone-400">Bạn cũng sẽ nhận được 30K!</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-stone-800 rounded-xl p-3 border border-pink-100 dark:border-stone-700 flex items-center justify-between gap-2 mb-4">
                            <code className="font-mono font-bold text-pink-600 text-lg tracking-wider">
                                {referralCode}
                            </code>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCopy}
                                className="hover:bg-pink-50 hover:text-pink-600"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>

                        <Button
                            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold h-12 shadow-lg shadow-pink-200 dark:shadow-none"
                            onClick={handleShare}
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Chia Sẻ Ngay
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}

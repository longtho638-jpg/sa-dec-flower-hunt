"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, Sprout, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function PartnerOnboardingPage() {
    const [pots, setPots] = useState([500])
    const commissionRate = 0.85 // Partner keeps 85%
    const avgPrice = 150000 // Average price per pot

    const potentialRevenue = pots[0] * avgPrice * commissionRate
    const formattedRevenue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(potentialRevenue)

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-stone-900 py-24 sm:py-32">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=3432&auto=format&fit=crop"
                        alt="Flower garden background"
                        className="h-full w-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="secondary" className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                                Dành cho Nhà Vườn Sa Đéc
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Biến Vườn Hoa Thành <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                                    Cỗ Máy In Tiền
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-stone-300">
                                Tham gia mạng lưới Dropshipping đầu tiên tại Sa Đéc. Chúng tôi lo bán hàng & vận chuyển, bạn chỉ cần chăm sóc hoa.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link href="/partner/register/form">
                                    <Button size="lg" className="bg-green-600 hover:bg-green-500 text-white font-bold text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] transition-all">
                                        Đăng Ký Ngay <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Earnings Calculator Section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-green-600">Thu Nhập Dự Kiến</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
                            Bạn có bao nhiêu chậu hoa?
                        </p>
                        <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-400">
                            Kéo thanh trượt để xem doanh thu tiềm năng mỗi vụ Tết.
                        </p>
                    </div>

                    <div className="mx-auto max-w-3xl">
                        <Card className="border-2 border-green-100 dark:border-green-900 shadow-2xl bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm">
                            <CardContent className="p-10">
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-medium text-stone-600 dark:text-stone-300 flex items-center">
                                                <Sprout className="mr-2 h-5 w-5 text-green-500" />
                                                Số lượng chậu
                                            </span>
                                            <span className="text-3xl font-bold text-stone-900 dark:text-white">
                                                {pots[0].toLocaleString()} chậu
                                            </span>
                                        </div>
                                        <Slider
                                            value={pots}
                                            onValueChange={setPots}
                                            max={5000}
                                            step={50}
                                            className="py-4"
                                        />
                                        <div className="flex justify-between text-xs text-stone-400">
                                            <span>50 chậu</span>
                                            <span>5,000 chậu</span>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 p-8 text-center border border-green-100 dark:border-green-900">
                                        <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">
                                            Doanh thu dự kiến (Sau chiết khấu)
                                        </p>
                                        <motion.div
                                            key={potentialRevenue}
                                            initial={{ scale: 0.9, opacity: 0.5 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-5xl sm:text-6xl font-black text-green-600 dark:text-green-400 tracking-tight"
                                        >
                                            {formattedRevenue}
                                        </motion.div>
                                        <p className="mt-4 text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center">
                                            <TrendingUp className="mr-1 h-4 w-4" />
                                            Dựa trên giá trung bình 150k/chậu & hoa hồng 15%
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-stone-100 dark:bg-stone-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-green-600">Tại sao chọn chúng tôi?</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
                            Hệ sinh thái Nông nghiệp Số 1 Sa Đéc
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {[
                                {
                                    name: 'Farm OS',
                                    description: 'Hệ thống quản lý vườn chuyên nghiệp trên điện thoại. Theo dõi đơn hàng, doanh thu mọi lúc mọi nơi.',
                                    icon: Calculator,
                                },
                                {
                                    name: 'Đầu ra ổn định',
                                    description: 'Tiếp cận hàng nghìn khách hàng từ TP.HCM và các tỉnh lân cận mà không cần chạy quảng cáo.',
                                    icon: TrendingUp,
                                },
                                {
                                    name: 'Vận chuyển trọn gói',
                                    description: 'Đội ngũ shipper chuyên nghiệp sẽ đến tận vườn lấy hoa. Bạn chỉ cần đóng gói.',
                                    icon: Sprout,
                                },
                                {
                                    name: 'Thanh toán nhanh',
                                    description: 'Nhận tiền ngay khi đơn hàng hoàn thành. Đối soát minh bạch, rõ ràng.',
                                    icon: Calculator,
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-stone-900 dark:text-white">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-stone-600 dark:text-stone-400">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Loader2, Sprout, Store, User } from "lucide-react"
import confetti from "canvas-confetti"

export default function PartnerRegisterForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const handleNext = () => {
        setStep(step + 1)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsLoading(false)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })

        // Redirect to Partner Dashboard
        setTimeout(() => {
            router.push("/partner")
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Đăng Ký Đối Tác</h1>
                    <p className="text-stone-500 dark:text-stone-400">Gia nhập mạng lưới Sa Đéc Flower Hunt</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8 px-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= i
                                    ? "bg-green-600 border-green-600 text-white"
                                    : "bg-transparent border-stone-300 text-stone-300"
                                }`}>
                                {step > i ? <Check className="w-6 h-6" /> : i}
                            </div>
                            <span className="text-xs mt-2 text-stone-500">
                                {i === 1 ? "Thông tin" : i === 2 ? "Vườn hoa" : "Xác nhận"}
                            </span>
                        </div>
                    ))}
                </div>

                <Card className="border-stone-200 dark:border-stone-800 shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>
                                {step === 1 && "Thông tin cá nhân"}
                                {step === 2 && "Thông tin vườn"}
                                {step === 3 && "Hoàn tất đăng ký"}
                            </CardTitle>
                            <CardDescription>
                                {step === 1 && "Cho chúng tôi biết bạn là ai."}
                                {step === 2 && "Vườn của bạn ở đâu và trồng hoa gì?"}
                                {step === 3 && "Kiểm tra lại thông tin và xác nhận."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Họ và tên</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                                            <Input id="name" placeholder="Nguyễn Văn A" className="pl-9" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Số điện thoại</Label>
                                        <Input id="phone" placeholder="0909..." type="tel" required />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="gardenName">Tên vườn</Label>
                                        <div className="relative">
                                            <Store className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                                            <Input id="gardenName" placeholder="Vườn hoa Út Cưng" className="pl-9" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Địa chỉ vườn</Label>
                                        <Input id="address" placeholder="Tân Quy Đông, Sa Đéc..." required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="flowers">Các loại hoa chủ lực</Label>
                                        <div className="relative">
                                            <Sprout className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                                            <Input id="flowers" placeholder="Cúc mâm xôi, Hồng lửa..." className="pl-9" required />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-4 text-center py-4"
                                >
                                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                        <Check className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-medium">Sẵn sàng gia nhập!</h3>
                                    <p className="text-stone-500 text-sm">
                                        Bằng việc nhấn "Đăng ký", bạn đồng ý với các điều khoản hợp tác của Sàn Dropshipping Sa Đéc.
                                    </p>
                                </motion.div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {step > 1 ? (
                                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                                    Quay lại
                                </Button>
                            ) : (
                                <div />
                            )}

                            {step < 3 ? (
                                <Button type="button" onClick={handleNext} className="bg-stone-900 text-white hover:bg-stone-800">
                                    Tiếp tục
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-green-600 hover:bg-green-500 text-white w-full ml-4" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Đăng ký & Vào Farm OS
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

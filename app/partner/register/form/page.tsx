"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import confetti from "canvas-confetti"

import { StepIndicator } from "@/components/partner/register/StepIndicator"
import { StepOne } from "@/components/partner/register/StepOne"
import { StepTwo } from "@/components/partner/register/StepTwo"
import { StepThree } from "@/components/partner/register/StepThree"

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

        try {
            // Insert into Supabase partner_leads
            const formData = new FormData(e.target as HTMLFormElement);

            if (!supabase) {
                console.error("Supabase not configured");
                return;
            }

            const { error } = await supabase.from('partner_leads').insert({
                full_name: formData.get('full_name'),
                phone: formData.get('phone'),
                garden_name: formData.get('garden_name'),
                address: formData.get('address'),
                flower_types: formData.get('flower_types'),
                status: 'new'
            });

            if (error) throw error;

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
        } catch (error) {
            console.error("Partner reg error", error);
            setIsLoading(false) // Fix infinite loading on error
        }
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Đăng Ký Đối Tác</h1>
                    <p className="text-stone-500 dark:text-stone-400">Gia nhập mạng lưới Sa Đéc Flower Hunt</p>
                </div>

                <StepIndicator step={step} />

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
                            {step === 1 && <StepOne />}
                            {step === 2 && <StepTwo />}
                            {step === 3 && <StepThree />}
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


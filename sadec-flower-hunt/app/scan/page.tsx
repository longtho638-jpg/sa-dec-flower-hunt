import { SmartVision } from "@/components/SmartVision";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                    <h1 className="text-lg font-bold ml-2">Nhận Diện Hoa AI</h1>
                </div>

                <SmartVision />
            </div>
        </div>
    );
}

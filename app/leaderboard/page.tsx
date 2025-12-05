import { Leaderboard } from "@/components/Leaderboard";
import { ChevronLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 pb-20">
            <div className="max-w-md mx-auto">
                <div className="flex items-center mb-6">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="-ml-2">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-bold ml-2 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Bảng Xếp Hạng
                    </h1>
                </div>

                <Leaderboard />
            </div>
        </div>
    );
}

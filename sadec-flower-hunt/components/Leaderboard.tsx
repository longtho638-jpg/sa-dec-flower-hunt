"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Crown, User, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const LEADERBOARD_DATA = [
    { id: 1, name: "Nguyễn Văn A", points: 2500, flowers: 12, rank: 1, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Trần Thị B", points: 2350, flowers: 10, rank: 2, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Lê Hoàng C", points: 2100, flowers: 9, rank: 3, avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Phạm Minh D", points: 1800, flowers: 8, rank: 4, avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Hoàng Yến E", points: 1500, flowers: 6, rank: 5, avatar: "https://i.pravatar.cc/150?u=5" },
]

export function Leaderboard() {
    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            {/* Top 3 Podium */}
            <div className="flex justify-center items-end gap-4 mb-8 pt-4">
                {/* 2nd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative">
                        <Avatar className="w-16 h-16 border-4 border-stone-200">
                            <AvatarImage src={LEADERBOARD_DATA[1].avatar} />
                            <AvatarFallback>2</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-stone-200 text-stone-600 text-xs font-bold px-2 py-0.5 rounded-full border border-white">
                            #2
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="font-bold text-sm line-clamp-1 w-20">{LEADERBOARD_DATA[1].name}</p>
                        <p className="text-xs text-stone-500">{LEADERBOARD_DATA[1].points} pts</p>
                    </div>
                    <div className="w-20 h-24 bg-gradient-to-t from-stone-200 to-stone-100 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                        <Medal className="w-8 h-8 text-stone-400" />
                    </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center z-10"
                >
                    <div className="relative">
                        <Crown className="w-8 h-8 text-yellow-500 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" />
                        <Avatar className="w-20 h-20 border-4 border-yellow-400 shadow-xl shadow-yellow-200">
                            <AvatarImage src={LEADERBOARD_DATA[0].avatar} />
                            <AvatarFallback>1</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full border border-white">
                            #1
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="font-bold text-sm line-clamp-1 w-24">{LEADERBOARD_DATA[0].name}</p>
                        <p className="text-xs text-yellow-600 font-bold">{LEADERBOARD_DATA[0].points} pts</p>
                    </div>
                    <div className="w-24 h-32 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg mt-2 flex items-end justify-center pb-4 shadow-lg">
                        <Trophy className="w-10 h-10 text-yellow-700" />
                    </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative">
                        <Avatar className="w-16 h-16 border-4 border-orange-200">
                            <AvatarImage src={LEADERBOARD_DATA[2].avatar} />
                            <AvatarFallback>3</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-200 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full border border-white">
                            #3
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="font-bold text-sm line-clamp-1 w-20">{LEADERBOARD_DATA[2].name}</p>
                        <p className="text-xs text-stone-500">{LEADERBOARD_DATA[2].points} pts</p>
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                        <Medal className="w-8 h-8 text-orange-400" />
                    </div>
                </motion.div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
                {LEADERBOARD_DATA.slice(3).map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 border-b border-stone-100 dark:border-stone-800 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                        <div className="w-8 text-center font-bold text-stone-400">#{user.rank}</div>
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h4 className="font-bold text-stone-900 dark:text-white">{user.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-stone-500">
                                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {user.flowers} hoa</span>
                            </div>
                        </div>
                        <div className="font-bold text-stone-900 dark:text-white">{user.points} pts</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

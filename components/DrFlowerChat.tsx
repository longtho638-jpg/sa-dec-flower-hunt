"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, X, Sparkles, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
    id: string
    role: "user" | "bot"
    content: string
}

export function DrFlowerChat({ flowerName }: { flowerName: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: `Xin chào! Tôi là Dr. Flower 👨‍⚕️🌸. Bạn cần tư vấn gì về cách chăm sóc hoa ${flowerName} không?`
        }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isTyping])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input
        }

        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Simulate AI thinking
        setTimeout(() => {
            const botResponse = generateResponse(input, flowerName)
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: botResponse
            }
            setMessages(prev => [...prev, botMsg])
            setIsTyping(false)
        }, 1500)
    }

    const generateResponse = (query: string, flower: string): string => {
        const q = query.toLowerCase()
        if (q.includes("nước") || q.includes("tưới")) {
            return `Với ${flower}, bạn nên tưới nước 2 lần/ngày vào sáng sớm và chiều mát. Tránh tưới lên hoa để giữ độ bền nhé! 💧`
        }
        if (q.includes("nắng") || q.includes("sáng")) {
            return `${flower} là loài ưa nắng. Hãy đặt cây ở nơi có ánh sáng mặt trời trực tiếp ít nhất 6 tiếng/ngày để hoa nở rực rỡ nhất. ☀️`
        }
        if (q.includes("phân") || q.includes("bón")) {
            return `Bạn có thể bón phân NPK định kỳ 2 tuần/lần. Nhớ pha loãng và tưới vào gốc, tránh làm cháy lá nhé. 🌱`
        }
        if (q.includes("bền") || q.includes("lâu")) {
            return `Để ${flower} tươi lâu, hãy cắt tỉa lá héo thường xuyên và tránh đặt nơi có gió lùa mạnh. Chúc bạn có một chậu hoa thật đẹp! ✨`
        }
        return `Câu hỏi hay quá! Về vấn đề này, Dr. Flower khuyên bạn nên quan sát lá cây thường xuyên. Nếu thấy lá vàng hoặc rủ xuống, hãy kiểm tra lại độ ẩm đất nhé. Bạn cần hỏi thêm gì không? 🤔`
    }

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors ${isOpen ? "bg-stone-200 text-stone-500" : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-8 h-8" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-40 right-4 z-40 w-[90vw] max-w-[350px] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Dr. Flower AI</h3>
                                <p className="text-green-100 text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                    Online • Sẵn sàng tư vấn
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4 bg-stone-50 dark:bg-stone-950/50">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                    >
                                        <Avatar className="w-8 h-8 border border-stone-200">
                                            {msg.role === "bot" ? (
                                                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                                                    <Bot className="w-5 h-5 text-green-600" />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-stone-600" />
                                                </div>
                                            )}
                                        </Avatar>
                                        <div
                                            className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === "user"
                                                    ? "bg-green-600 text-white rounded-tr-none"
                                                    : "bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 rounded-tl-none shadow-sm"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex gap-2">
                                        <Avatar className="w-8 h-8 border border-stone-200">
                                            <div className="w-full h-full bg-green-100 flex items-center justify-center">
                                                <Bot className="w-5 h-5 text-green-600" />
                                            </div>
                                        </Avatar>
                                        <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-75"></span>
                                            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-150"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>

                        {/* Input */}
                        <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSend()
                                }}
                                className="flex gap-2"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Hỏi về cách tưới, bón phân..."
                                    className="rounded-xl border-stone-200 focus-visible:ring-green-500"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="bg-green-600 hover:bg-green-700 rounded-xl shrink-0"
                                    disabled={!input.trim() || isTyping}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

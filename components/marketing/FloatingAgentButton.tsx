"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import Link from "next/link";

export function FloatingAgentButton() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <Link href="/agents">
                <button className="group flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all">
                    <Bot className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">
                        Agent CLI
                    </span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </button>
            </Link>
        </motion.div>
    );
}

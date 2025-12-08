"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, DollarSign, Clock, CheckCircle } from "lucide-react";

interface Counter {
    id: string;
    icon: React.ElementType;
    value: number;
    suffix: string;
    prefix?: string;
    label: string;
    trend: string;
    trendUp: boolean;
}

const COUNTERS: Counter[] = [
    { id: "farmers", icon: Users, value: 47, suffix: "+", label: "Nhà Vườn", trend: "↑3 tuần này", trendUp: true },
    { id: "gmv", icon: DollarSign, value: 2.4, suffix: "B", prefix: "₫", label: "GMV", trend: "↑₫400M", trendUp: true },
    { id: "orders", icon: CheckCircle, value: 1402, suffix: "", label: "Đơn Hàng", trend: "↑89 tuần", trendUp: true },
    { id: "growth", icon: TrendingUp, value: 312, suffix: "%", label: "YoY Growth", trend: "Q4/2024", trendUp: true },
    { id: "uptime", icon: Clock, value: 98.5, suffix: "%", label: "Uptime SLA", trend: "30 ngày", trendUp: true },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix: string }) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current++;
            const progress = current / steps;
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplayValue(value * eased);

            if (current >= steps) {
                clearInterval(timer);
                setDisplayValue(value);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isInView, value]);

    const formatValue = (val: number) => {
        if (val >= 1000) return Math.floor(val).toLocaleString();
        if (val % 1 !== 0) return val.toFixed(1);
        return Math.floor(val).toString();
    };

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{formatValue(displayValue)}{suffix}
        </span>
    );
}

export function LiveCounters() {
    return (
        <section className="py-10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-emerald-950/50 via-stone-950 to-emerald-950/50 border border-emerald-500/20 rounded-lg py-6"
                >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6">
                        {COUNTERS.map((counter, i) => (
                            <motion.div
                                key={counter.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <counter.icon className="w-4 h-4 text-emerald-500/50" />
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-white font-mono">
                                    <AnimatedNumber
                                        value={counter.value}
                                        prefix={counter.prefix}
                                        suffix={counter.suffix}
                                    />
                                </div>
                                <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1">
                                    {counter.label}
                                </div>
                                <div className={`text-[9px] font-mono ${counter.trendUp ? "text-emerald-400" : "text-red-400"}`}>
                                    {counter.trend}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

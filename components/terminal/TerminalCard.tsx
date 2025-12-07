"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Components, Animations } from "@/lib/design-system";

interface TerminalCardProps {
    children: ReactNode;
    className?: string;
    glowOnHover?: boolean;
}

export const TerminalCard = ({ children, className = "", glowOnHover = false }: TerminalCardProps) => {
    return (
        <motion.div
            className={`bg-slate-950/40 border border-emerald-500/20 rounded-sm p-4 ${glowOnHover ? 'hover:border-emerald-500/50 transition-colors' : ''} ${className}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={Animations.fadeIn}
        >
            {children}
        </motion.div>
    );
};

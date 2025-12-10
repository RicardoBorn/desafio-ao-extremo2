"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { trackBettingClick } from "@/lib/analytics";

export function StickyBettingButton() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    delay: 1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <Link
                    href="/ufextremo"
                    className="block"
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                    onClick={() => trackBettingClick("Sticky Button", "Floating Button")}
                >
                    <motion.div
                        className="relative bg-brand-yellow text-black shadow-2xl cursor-pointer overflow-hidden"
                        animate={{
                            width: isExpanded ? "auto" : "64px",
                            borderRadius: isExpanded ? "16px" : "50%"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Pulsing glow effect */}
                        <div className="absolute inset-0 bg-brand-yellow animate-pulse opacity-50 blur-xl" />

                        <div className="relative flex items-center gap-3 p-4">
                            <span className="text-2xl">🎯</span>
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{
                                    opacity: isExpanded ? 1 : 0,
                                    width: isExpanded ? "auto" : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                <span className="font-black text-lg uppercase">
                                    Apostar Agora
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    );
}

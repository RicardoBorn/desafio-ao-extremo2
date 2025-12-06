"use client";
// Sticky Betting Button Component - Vercel Deploy Trigger v2

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export function StickyBettingButton() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999]">
            <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
            >
                <Link
                    href="#ranking"
                    className="block"
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <motion.div
                        className="relative bg-[#FFC107] text-black shadow-[0_0_30px_rgba(255,193,7,0.7)] border-l-4 border-[#e6ac00] cursor-pointer overflow-hidden"
                        animate={{
                            width: isExpanded ? "280px" : "60px",
                            borderRadius: isExpanded ? "12px 0 0 12px" : "12px 0 0 12px",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Pulsing effect when collapsed */}
                        {!isExpanded && (
                            <motion.div
                                className="absolute inset-0 bg-[#FFD54F]"
                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}

                        <div className="relative flex items-center h-16 px-4">
                            {/* Icon (always visible) */}
                            <motion.div
                                className="flex-shrink-0 text-2xl"
                                animate={{ rotate: isExpanded ? 0 : [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                🎯
                            </motion.div>

                            {/* Text (shows when expanded) */}
                            <motion.div
                                className="ml-3 overflow-hidden whitespace-nowrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isExpanded ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="font-black text-sm uppercase tracking-wide">
                                    Quem Vai Vencer?
                                </div>
                                <div className="text-xs text-zinc-800 font-bold">
                                    Dê seu palpite!
                                </div>
                            </motion.div>
                        </div>

                        {/* Shine effect on hover */}
                        {isExpanded && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                            />
                        )}
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    );
}

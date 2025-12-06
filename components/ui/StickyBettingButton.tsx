"use client";
// Sticky Betting Button Component - DEBUG VERSION v3
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export function StickyBettingButton() {
    const [isExpanded, setIsExpanded] = useState(true); // Default open for debug

    useEffect(() => {
        console.log("StickyBettingButton MOUNTED - Debug v3");
    }, []);

    return (
        // DEBUG STYLES: Top-Left, Red, Extreme Z-Index
        <div className="fixed left-4 top-24 z-[100000]">
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    href="#ranking"
                    className="block"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="relative bg-red-600 text-white shadow-2xl border-4 border-white cursor-pointer overflow-hidden p-4 rounded-xl flex items-center gap-2">
                        <span className="text-3xl">🐞</span>
                        <div className="flex flex-col">
                            <span className="font-black text-lg uppercase">DEBUG MODE</span>
                            <span className="text-xs font-bold">Verificando Deploy...</span>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}

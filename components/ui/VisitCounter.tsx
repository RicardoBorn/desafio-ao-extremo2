"use client";

import { useEffect, useState } from "react";

interface VisitCounterProps {
    pageKey: string;
    variant?: "default" | "terminal";
}

export function VisitCounter({ pageKey, variant = "default" }: VisitCounterProps) {
    const [count, setCount] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Get current count from localStorage
        const currentCount = parseInt(localStorage.getItem(pageKey) || "0", 10);
        const newCount = currentCount + 1;

        // Update localStorage
        localStorage.setItem(pageKey, newCount.toString());

        // Update state
        setCount(newCount);
        setIsLoaded(true);
    }, [pageKey]);

    if (!isLoaded) return null;

    if (variant === "terminal") {
        return (
            <div className="fixed top-4 left-4 z-50 bg-black/80 border-2 border-[#00ff00] p-3 font-mono text-[#00ff00] backdrop-blur-sm">
                <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="opacity-60">&gt;</span>
                        <span className="font-bold">ACESSOS:</span>
                    </div>
                    <div className="text-2xl font-bold tabular-nums tracking-wider">
                        {count.toString().padStart(6, "0")}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-4 left-4 z-50 bg-black/60 backdrop-blur-sm border border-brand-yellow/30 px-4 py-2 rounded-sm">
            <div className="flex items-center gap-2 text-sm">
                <span className="text-brand-yellow/60 font-bold uppercase tracking-wider text-xs">
                    Visitas
                </span>
                <span className="text-brand-yellow font-bold text-lg tabular-nums">
                    {count.toLocaleString()}
                </span>
            </div>
        </div>
    );
}

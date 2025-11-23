"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
    pageId: string;
    variant?: "tactical" | "terminal";
}

export function ViewCounter({ pageId, variant = "tactical" }: ViewCounterProps) {
    const [views, setViews] = useState<number>(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Get current count from localStorage
        const storageKey = `views_${pageId}`;
        const currentViews = parseInt(localStorage.getItem(storageKey) || "0", 10);

        // Increment and save
        const newViews = currentViews + 1;
        localStorage.setItem(storageKey, newViews.toString());
        setViews(newViews);
    }, [pageId]);

    if (!isClient) {
        return null; // Avoid hydration mismatch
    }

    if (variant === "terminal") {
        // MS-DOS style for secret page
        return (
            <div className="fixed top-4 left-4 z-50 border-2 border-[#00ff00] bg-black/90 backdrop-blur-sm p-3 font-mono text-[#00ff00]">
                <div className="text-xs opacity-60 mb-1">ACESSOS</div>
                <div className="text-2xl font-bold tabular-nums">
                    {views.toString().padStart(6, "0")}
                </div>
                <div className="text-[10px] opacity-40 mt-1">
                    &gt; system.log
                </div>
            </div>
        );
    }

    // Tactical style for main page - Horizontal Extreme Design
    return (
        <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm border-2 border-brand-yellow p-0 font-sans overflow-hidden">
            {/* Angular cut corner effect */}
            <div
                className="absolute top-0 right-0 w-4 h-4 bg-brand-dark border-l-2 border-b-2 border-brand-yellow"
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
            />

            <div className="flex items-center gap-0">
                {/* Left section - Label */}
                <div className="bg-brand-yellow px-4 py-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rotate-45" />
                    <span className="text-black font-black text-xs uppercase tracking-[0.2em]">
                        Acessos
                    </span>
                </div>

                {/* Right section - Number */}
                <div className="px-6 py-2 bg-black/90 border-l-2 border-brand-yellow/30">
                    <div className="text-3xl font-black text-brand-yellow tabular-nums tracking-tight font-display">
                        {views.toLocaleString("pt-BR")}
                    </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-brand-yellow via-brand-yellow/50 to-transparent" />
        </div>
    );
}

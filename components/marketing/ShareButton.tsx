"use client";

import React from "react";

export function ShareButton() {
    const handleShare = async () => {
        const shareData = {
            title: "Desafio ao Extremo",
            text: "A maior competição de arremesso de facas do YouTube Brasil!",
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copiado para a área de transferência!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-brand-yellow px-10 py-5 text-xl font-bold text-black transition-all hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,193,7,0.6)] clip-path-slant"
            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)" }}
        >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />

            <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-black fill-none relative z-10"
            >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span className="relative z-10 font-display tracking-wider">COMPARTILHAR</span>
        </button>
    );
}

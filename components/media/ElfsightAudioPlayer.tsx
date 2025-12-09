"use client"

import { useEffect } from "react"

export function ElfsightAudioPlayer() {
    useEffect(() => {
        // Inject Elfsight script directly into head
        const script = document.createElement('script')
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.async = true
        script.setAttribute('data-use-service-core', '')
        document.head.appendChild(script)

        return () => {
            // Cleanup on unmount
            if (document.head.contains(script)) {
                document.head.removeChild(script)
            }
        }
    }, [])

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-12 bg-brand-yellow" />
                    <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                            🎵 MÚSICAS OFICIAIS
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base">
                            Ouça as trilhas sonoras oficiais do Desafio ao Extremo
                        </p>
                    </div>
                </div>
            </div>

            {/* Player + Visualizer Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Elfsight Player */}
                <div className="bg-zinc-900/30 border-2 border-brand-yellow/20 p-4 md:p-6 rounded-lg">
                    <div className="elfsight-app-f599f813-9d82-44e3-8a56-426c9eca070e" data-elfsight-app-lazy></div>
                </div>

                {/* Right: Audio Visualizer */}
                <div className="bg-zinc-900/30 border-2 border-brand-yellow/20 p-4 md:p-6 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Animated Audio Bars */}
                    <div className="flex items-end justify-center gap-2 h-64 w-full opacity-60">
                        {[...Array(32)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-brand-yellow rounded-t-lg transition-all duration-300 ease-in-out"
                                style={{
                                    width: '8px',
                                    height: '20%',
                                    animation: `audioWave ${0.8 + (i * 0.05)}s ease-in-out infinite alternate`,
                                    animationDelay: `${i * 0.05}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🎧</div>
                            <p className="text-brand-yellow text-xl font-bold">SOUND WAVES</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes audioWave {
                    0% {
                        height: 20%;
                    }
                    100% {
                        height: 80%;
                    }
                }
            `}</style>
        </div>
    )
}

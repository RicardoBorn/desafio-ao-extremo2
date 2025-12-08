"use client"

import { useEffect } from "react"

export function ElfsightAudioPlayer() {
    useEffect(() => {
        // Load Elfsight script
        const script = document.createElement('script')
        script.src = 'https://elfsightcdn.com/platform.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            // Cleanup script on unmount
            if (document.body.contains(script)) {
                document.body.removeChild(script)
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

            {/* Elfsight Player Container */}
            <div className="bg-zinc-900/30 border-2 border-brand-yellow/20 p-4 md:p-6 rounded-lg">
                <div
                    className="elfsight-app-f599f813-9d82-44e3-8a56-426c9eca070e"
                    data-elfsight-app-lazy
                />
            </div>

            {/* Custom Styles to match site theme */}
            <style jsx global>{`
                /* Override Elfsight player colors to match site theme */
                .elfsight-app-f599f813-9d82-44e3-8a56-426c9eca070e {
                    width: 100% !important;
                }
                
                /* Try to match the yellow/black theme */
                .elfsight-app-f599f813-9d82-44e3-8a56-426c9eca070e * {
                    font-family: inherit !important;
                }
            `}</style>
        </div>
    )
}

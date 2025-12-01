"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { AudioPlayer, Track } from "./AudioPlayer"

interface ExpandableAudioPlayerProps {
    tracks: Track[]
}

export function ExpandableAudioPlayer({ tracks }: ExpandableAudioPlayerProps) {
    const [isExpanded, setIsExpanded] = useState(true) // Expandido por padrão

    return (
        <div className="w-full">
            {/* Header - Always Visible */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full bg-zinc-900/50 border-2 border-brand-yellow/30 hover:border-brand-yellow transition-all duration-300 p-6 flex items-center justify-between group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-2 h-12 bg-brand-yellow" />
                    <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                            🎵 MÚSICAS OFICIAIS
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base">
                            {isExpanded ? "Clique para recolher" : "Clique para expandir e ouvir as trilhas sonoras"}
                        </p>
                    </div>
                </div>
                <div className="text-brand-yellow transform transition-transform duration-300 group-hover:scale-110">
                    {isExpanded ? (
                        <ChevronUp className="w-8 h-8" />
                    ) : (
                        <ChevronDown className="w-8 h-8 animate-bounce" />
                    )}
                </div>
            </button>

            {/* Expandable Content */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-zinc-900/30 border-2 border-brand-yellow/20 p-4 md:p-6">
                    <AudioPlayer tracks={tracks} />
                </div>
            </div>
        </div>
    )
}

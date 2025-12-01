"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Download, SkipBack, SkipForward } from "lucide-react"

export interface Track {
    id: string
    title: string
    duration: string
    url: string // URL for the audio file
}

interface AudioPlayerProps {
    tracks: Track[]
}

import Image from "next/image"

export function AudioPlayer({ tracks }: AudioPlayerProps) {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    const currentTrack = tracks[currentTrackIndex]

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play()
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying, currentTrackIndex])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime
            const duration = audioRef.current.duration || 1
            setProgress((current / duration) * 100)
        }
    }

    const handleTrackChange = (index: number) => {
        setCurrentTrackIndex(index)
        setIsPlaying(true)
        setProgress(0)
    }

    const handleDownload = (track: Track) => {
        // Create a temporary link to trigger download
        const link = document.createElement('a')
        link.href = track.url
        link.download = `${track.title}.mp3`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
            <style jsx global>{`
                @keyframes soundwave {
                    0% { height: 20%; }
                    50% { height: 100%; }
                    100% { height: 20%; }
                }
                .visualizer-bar {
                    animation: soundwave 1s ease-in-out infinite;
                }
            `}</style>

            {/* Main Player Area */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-zinc-800 to-zinc-900">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Cover Art */}
                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-zinc-800 flex items-center justify-center shadow-lg border border-white/5 relative overflow-hidden group shrink-0">
                        <Image
                            src="/audio/album.png"
                            alt="Album Cover"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors" />
                    </div>

                    {/* Track Info & Controls */}
                    <div className="flex-1 w-full text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-white mb-1">{currentTrack.title}</h3>
                        <p className="text-zinc-400 mb-6">Desafio ao Extremo - Áudio Oficial</p>

                        {/* Visualizer */}
                        <div className="h-12 flex items-end justify-center sm:justify-start gap-[2px] mb-2 w-full overflow-hidden">
                            {[...Array(40)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 bg-brand-yellow/80 ${isPlaying ? 'visualizer-bar' : ''}`}
                                    style={{
                                        height: isPlaying ? '20%' : `${20 + (Math.sin(i) * 10)}%`, // Static wave when paused
                                        animationDuration: `${0.6 + (i % 5) * 0.1}s`,
                                        animationDelay: `-${(i % 10) * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-700/50 h-1.5 mb-6 overflow-hidden">
                            <div
                                className="bg-yellow-500 h-full transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center sm:justify-start gap-6">
                            <button
                                onClick={() => handleTrackChange((currentTrackIndex - 1 + tracks.length) % tracks.length)}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <SkipBack className="w-6 h-6" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-14 h-14 bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center text-black transition-transform transform hover:scale-105 shadow-lg shadow-yellow-500/20"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6 fill-current" />
                                ) : (
                                    <Play className="w-6 h-6 fill-current ml-1" />
                                )}
                            </button>

                            <button
                                onClick={() => handleTrackChange((currentTrackIndex + 1) % tracks.length)}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <SkipForward className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Playlist */}
            <div className="bg-black/20 p-4 max-h-60 overflow-y-auto">
                {tracks.map((track, index) => (
                    <div
                        key={track.id}
                        className={`flex items-center justify-between p-3 transition-colors ${index === currentTrackIndex
                            ? "bg-white/5 border border-yellow-500/30"
                            : "hover:bg-white/5 border border-transparent"
                            }`}
                    >
                        <button
                            onClick={() => handleTrackChange(index)}
                            className="flex items-center gap-4 flex-1 text-left"
                        >
                            <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${index === currentTrackIndex ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
                                }`}>
                                {isPlaying && index === currentTrackIndex ? (
                                    <div className="flex gap-0.5 h-3 items-end">
                                        <div className="w-0.5 bg-black animate-[bounce_1s_infinite]" />
                                        <div className="w-0.5 bg-black animate-[bounce_1.2s_infinite]" />
                                        <div className="w-0.5 bg-black animate-[bounce_0.8s_infinite]" />
                                    </div>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div>
                                <p className={`font-medium ${index === currentTrackIndex ? "text-yellow-500" : "text-white"}`}>
                                    {track.title}
                                </p>
                                <p className="text-xs text-zinc-500">{track.duration}</p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleDownload(track)}
                            className="p-2 text-zinc-500 hover:text-yellow-500 transition-colors"
                            title="Baixar áudio"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            <audio
                ref={audioRef}
                src={currentTrack.url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    )
}

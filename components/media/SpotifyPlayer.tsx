"use client"

interface SpotifyPlayerProps {
    showId: string;
    title?: string;
}

export function SpotifyPlayer({ showId, title = "Músicas Oficiais" }: SpotifyPlayerProps) {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-12 bg-brand-yellow" />
                    <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                            🎵 {title}
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base">
                            Ouça as trilhas sonoras oficiais do Desafio ao Extremo
                        </p>
                    </div>
                </div>
            </div>

            {/* Spotify Embed */}
            <div className="bg-zinc-900/30 border-2 border-brand-yellow/20 p-4 md:p-6">
                <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/show/${showId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="450"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                />
            </div>
        </div>
    )
}

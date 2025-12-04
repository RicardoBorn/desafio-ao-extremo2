"use client";

import { useState, useEffect } from "react";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { Bell, Users, Play } from "lucide-react";
import Image from "next/image";
import { getVideoSettings, extractVideoId, DEFAULT_VIDEOS, type VideoSettings } from "@/lib/videoSettings";

export default function AberturaPage() {
    const [videos, setVideos] = useState<VideoSettings>(DEFAULT_VIDEOS);

    useEffect(() => {
        const loadVideos = async () => {
            const data = await getVideoSettings();
            setVideos(data);
        };
        loadVideos();
    }, []);

    const videoId = extractVideoId(videos.desafio_main.url);
    const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&loop=1&playlist=${videoId}`
        : '';

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center py-20 px-4">

            {/* Background Effects */}
            <TacticalMapBackground />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">

                {/* Badge ESTREIA MUNDIAL */}
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-yellow/50 rounded-full bg-brand-yellow/10 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse" />
                    <span className="text-brand-yellow font-bold text-sm uppercase tracking-widest">
                        Estreia Mundial
                    </span>
                </div>

                {/* Título Principal */}
                <div className="text-center space-y-2">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
                        <span className="text-white">A ESPERA</span>
                        <br />
                        <span className="text-brand-yellow">ACABOU</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Prepare-se para o maior evento de sobrevivência do ano. O cronômetro já foi disparado.
                    </p>
                </div>

                {/* Logo do Desafio ao Extremo */}
                <div className="relative w-full max-w-2xl">
                    <div className="flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Desafio ao Extremo"
                            width={400}
                            height={150}
                            priority
                            className="object-contain drop-shadow-[0_0_25px_rgba(255,193,7,0.5)]"
                        />
                    </div>
                </div>

                {/* Video Teaser Section */}
                <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl group mt-8">
                    {/* Video Background (Muted/Loop) */}
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                        {embedUrl && (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full object-cover pointer-events-none scale-125"
                                allow="autoplay; encrypted-media"
                                title={videos.desafio_main.title}
                            />
                        )}
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                        <div className="w-20 h-20 rounded-full bg-brand-yellow/20 border-2 border-brand-yellow flex items-center justify-center mb-6 animate-pulse">
                            <Play className="w-8 h-8 text-brand-yellow fill-current ml-1" />
                        </div>
                        <h3 className="text-3xl font-bold text-white uppercase tracking-widest mb-2">
                            {videos.desafio_main.title}
                        </h3>
                        <p className="text-zinc-300 font-mono text-sm">
                            EM BREVE
                        </p>
                    </div>

                    {/* Locked Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 pointer-events-none" />
                </div>

                {/* CTAs */}
                <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mx-auto mt-8">
                    <button className="flex-1 group relative overflow-hidden bg-[#FF0000] hover:bg-[#cc0000] text-white p-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-red-900/50 flex items-center justify-center gap-3">
                        <Bell className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform" />
                        DEFINIR LEMBRETE
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <button className="flex-1 group relative overflow-hidden bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-900/50 flex items-center justify-center gap-3">
                        <Users className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                        ENTRAR NO GRUPO VIP
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </div>

                {/* Footer / Social Proof */}
                <div className="text-zinc-500 text-sm font-mono mt-4">
                    <span className="text-brand-yellow font-bold">1.248</span> GUERREIROS JÁ ESTÃO ESPERANDO
                </div>

            </div>


        </main>
    );
}

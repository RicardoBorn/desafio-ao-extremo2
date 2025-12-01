"use client";

import { useState, useRef, useEffect } from "react";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { Header } from "@/components/ui/Header";
import { Play, Pause, Volume2, VolumeX, Download } from "lucide-react";
import Image from "next/image";

export default function ApoioPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showStartButton, setShowStartButton] = useState(true);
    const [isVideoFinished, setIsVideoFinished] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Função para entrar em tela cheia e iniciar vídeo
    const startVideo = async () => {
        try {
            const video = videoRef.current;
            const container = containerRef.current;

            if (!video || !container) return;

            // Tenta entrar em fullscreen
            if (container.requestFullscreen) {
                await container.requestFullscreen();
            } else if ((container as any).webkitRequestFullscreen) {
                await (container as any).webkitRequestFullscreen();
            } else if ((container as any).msRequestFullscreen) {
                await (container as any).msRequestFullscreen();
            }

            // Inicia o vídeo
            video.muted = false; // Ativa o som quando usuário interage
            setIsMuted(false);
            await video.play();
            setIsPlaying(true);
            setShowStartButton(false);

        } catch (error) {
            console.log("Fullscreen bloqueado, iniciando vídeo normalmente:", error);
            // Se fullscreen falhar, apenas inicia o vídeo
            const video = videoRef.current;
            if (video) {
                video.muted = false;
                setIsMuted(false);
                await video.play();
                setIsPlaying(true);
                setShowStartButton(false);
            }
        }
    };

    // Monitora o fim do vídeo
    const handleVideoEnd = () => {
        console.log("Vídeo finalizado");

        // Sai do fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log(err));
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }

        setIsVideoFinished(true);
        setIsPlaying(false);
        setShowStartButton(false);
    };

    // Toggle Play/Pause
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Download Video
    const downloadVideo = () => {
        const link = document.createElement('a');
        link.href = "/videos/aceitar o desafio.mp4";
        link.download = "aceitar-o-desafio.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Toggle mute
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    // Tenta autoplay quando a página carrega (pode ser bloqueado)
    useEffect(() => {
        const tryAutoplay = async () => {
            try {
                const video = videoRef.current;
                if (video) {
                    // Tenta play COM SOM (pode ser bloqueado pelo navegador)
                    // Se bloquear, cairá no catch e mostrará o botão de início
                    video.muted = false;
                    setIsMuted(false);
                    await video.play();
                    setIsPlaying(true);

                    // Se conseguiu, tenta fullscreen
                    if (containerRef.current && containerRef.current.requestFullscreen) {
                        await containerRef.current.requestFullscreen();
                        setShowStartButton(false);
                    }
                }
            } catch (error) {
                console.log("Autoplay bloqueado, mostrando botão de início:", error);
                setShowStartButton(true);
            }
        };

        // Pequeno delay para garantir que o componente está montado
        const timer = setTimeout(tryAutoplay, 500);
        return () => clearTimeout(timer);
    }, []);

    // Renderização quando o vídeo termina (Player menor com Header)
    if (isVideoFinished) {
        return (
            <div className="min-h-screen bg-black text-white relative flex flex-col">
                <TacticalMapBackground />
                <Header />

                <main className="flex-1 flex flex-col items-center justify-center p-4 z-10 mt-20">
                    <div className="w-full max-w-4xl bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden p-6 backdrop-blur-sm shadow-2xl">
                        {/* Player Menor */}
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6 shadow-lg border border-zinc-800">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-contain"
                                src="/videos/aceitar o desafio.mp4"
                                controls={false}
                                onClick={togglePlay}
                            />
                            {/* Overlay Play Button se pausado */}
                            {!isPlaying && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                                    onClick={togglePlay}
                                >
                                    <div className="w-20 h-20 rounded-full bg-brand-yellow/90 flex items-center justify-center shadow-[0_0_30px_rgba(255,193,7,0.4)] hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-black fill-current ml-1" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Controles Abaixo do Vídeo */}
                        <div className="flex items-center justify-center gap-6">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="p-4 rounded-full bg-zinc-800 group-hover:bg-brand-yellow transition-colors">
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6 text-white group-hover:text-black fill-current" />
                                    ) : (
                                        <Play className="w-6 h-6 text-white group-hover:text-black fill-current" />
                                    )}
                                </div>
                                <span className="text-xs text-zinc-500 group-hover:text-brand-yellow font-mono uppercase">
                                    {isPlaying ? "Pausar" : "Reproduzir"}
                                </span>
                            </button>

                            {/* Download */}
                            <button
                                onClick={downloadVideo}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="p-4 rounded-full bg-zinc-800 group-hover:bg-brand-yellow transition-colors">
                                    <Download className="w-6 h-6 text-white group-hover:text-black" />
                                </div>
                                <span className="text-xs text-zinc-500 group-hover:text-brand-yellow font-mono uppercase">
                                    Baixar
                                </span>
                            </button>

                            {/* Volume */}
                            <button
                                onClick={toggleMute}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="p-4 rounded-full bg-zinc-800 group-hover:bg-brand-yellow transition-colors">
                                    {isMuted ? (
                                        <VolumeX className="w-6 h-6 text-white group-hover:text-black" />
                                    ) : (
                                        <Volume2 className="w-6 h-6 text-white group-hover:text-black" />
                                    )}
                                </div>
                                <span className="text-xs text-zinc-500 group-hover:text-brand-yellow font-mono uppercase">
                                    {isMuted ? "Mutado" : "Som"}
                                </span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Renderização Fullscreen (Inicial)
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <TacticalMapBackground />

            {/* Container do Vídeo */}
            <div
                ref={containerRef}
                className="relative w-full h-screen flex items-center justify-center bg-black"
            >
                {/* Vídeo */}
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    onEnded={handleVideoEnd}
                    playsInline
                    preload="auto"
                >
                    {/* SUBSTITUA O SRC PELO SEU VÍDEO */}
                    <source src="/videos/aceitar o desafio.mp4" type="video/mp4" />
                    <source src="/videos/apoio-video.webm" type="video/webm" />
                    Seu navegador não suporta vídeo HTML5.
                </video>

                {/* Overlay com Botão de Início */}
                {showStartButton && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                        {/* Botão de Início */}
                        <button
                            onClick={startVideo}
                            className="group relative transition-all hover:scale-105 animate-float"
                        >
                            <div className="relative w-[300px] h-[100px]">
                                <Image
                                    src="/botao-aceitar-desafio.png"
                                    alt="Aceitar Desafio"
                                    fill
                                    className="object-contain drop-shadow-[0_0_30px_rgba(255,193,7,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(255,193,7,0.6)] transition-all"
                                />
                            </div>
                        </button>
                    </div>
                )}

                {/* Controles (aparecem durante o vídeo) */}
                {(!showStartButton) && (
                    <div className="absolute bottom-8 right-8 z-30 flex gap-4">
                        {/* Play/Pause */}
                        <button
                            onClick={togglePlay}
                            className="bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all backdrop-blur-sm"
                            title={isPlaying ? "Pausar" : "Reproduzir"}
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 fill-current" />
                            ) : (
                                <Play className="w-6 h-6 fill-current" />
                            )}
                        </button>

                        {/* Download */}
                        <button
                            onClick={downloadVideo}
                            className="bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all backdrop-blur-sm"
                            title="Baixar Vídeo"
                        >
                            <Download className="w-6 h-6" />
                        </button>

                        {/* Volume */}
                        <button
                            onClick={toggleMute}
                            className="bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all backdrop-blur-sm"
                            title={isMuted ? "Ativar som" : "Desativar som"}
                        >
                            {isMuted ? (
                                <VolumeX className="w-6 h-6" />
                            ) : (
                                <Volume2 className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                )}

                {/* Indicador de Progresso Opcional */}
                {isPlaying && !showStartButton && (
                    <div className="absolute bottom-0 left-0 right-0 z-20">
                        <div className="h-1 bg-zinc-800">
                            <div className="h-full bg-brand-yellow transition-all duration-300" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

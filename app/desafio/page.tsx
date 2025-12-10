"use client";

import { useRef, useState } from "react";

const VIDEO_URL = "/Desafio ao extremo QRcode.mp4";

export default function DesafioPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showButton, setShowButton] = useState(true);
    const [videoStarted, setVideoStarted] = useState(false);

    const handleAcceptChallenge = async () => {
        const video = videoRef.current;
        if (!video) return;

        // Remove o botão
        setShowButton(false);
        setVideoStarted(true);

        // Aguarda um frame para garantir que o vídeo está pronto
        await new Promise(resolve => requestAnimationFrame(resolve));

        try {
            // Garante que o áudio está ativado
            video.muted = false;
            video.volume = 1.0;

            // Inicia o vídeo
            await video.play();

            // Tenta fullscreen
            try {
                if (video.requestFullscreen) {
                    await video.requestFullscreen();
                } else if ('webkitRequestFullscreen' in video) {
                    await (video as HTMLVideoElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
                }
            } catch (error) {
                console.log("Fullscreen não disponível:", error);
            }
        } catch (error) {
            console.log("Erro ao iniciar vídeo:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative">
            <video
                ref={videoRef}
                className="w-full h-screen object-contain"
                src={VIDEO_URL}
                playsInline
                preload="auto"
                controls={videoStarted}
                style={{ opacity: videoStarted ? 1 : 0 }}
            />

            {showButton && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
                    <button
                        onClick={handleAcceptChallenge}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold 
                                 px-12 py-6 text-2xl shadow-2xl 
                                 transform hover:scale-105 transition-all duration-300
                                 animate-pulse"
                    >
                        ACEITAR DESAFIO
                    </button>
                </div>
            )}
        </div>
    );
}


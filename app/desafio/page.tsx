"use client";

import { useRef, useEffect } from "react";

const VIDEO_URL = "/Desafio ao extremo QRcode.mp4";

export default function DesafioPage() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Define volume em 100%
        video.volume = 1.0;

        const playVideo = async () => {
            try {
                // Garante que o som está ativado e volume em 100%
                video.muted = false;
                video.volume = 1.0;
                await video.play();

                // Tenta fullscreen
                if (video.requestFullscreen) {
                    await video.requestFullscreen();
                } else if ((video as any).webkitRequestFullscreen) {
                    await (video as any).webkitRequestFullscreen();
                }
            } catch (error) {
                console.log("Autoplay bloqueado:", error);
                // Se falhar, tenta mutado
                try {
                    video.muted = true;
                    await video.play();
                } catch (e) {
                    console.log("Precisa de interação do usuário");
                }
            }
        };

        playVideo();
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <video
                ref={videoRef}
                className="w-full h-screen object-contain"
                src={VIDEO_URL}
                playsInline
                preload="auto"
                controls
            />
        </div>
    );
}

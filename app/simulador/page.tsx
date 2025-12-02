"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/ui/Header";

type GameState = "INTRO" | "VIDEO" | "GAME" | "RESULT";

interface Throw {
    x: number;
    y: number;
    score: number;
    rotation: number;
}

export default function SimulatorPage() {
    const [gameState, setGameState] = useState<GameState>("INTRO");
    const [userName, setUserName] = useState("");
    const [throws, setThrows] = useState<Throw[]>([]);
    const [currentThrow, setCurrentThrow] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isThrowing, setIsThrowing] = useState(false);
    const [showHitScore, setShowHitScore] = useState<number | null>(null);

    // Game Constants
    const MAX_THROWS = 9;
    const THROWS_TO_COUNT = 6;

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const requestRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);

    // Unstable Cursor Logic
    useEffect(() => {
        if (gameState !== "GAME") return;

        const updateCursor = () => {
            timeRef.current += 0.05;

            // Base position (mouse)
            const targetX = mouseRef.current.x;
            const targetY = mouseRef.current.y;

            // Add instability (Perlin-like noise using sin/cos)
            const noiseX = Math.sin(timeRef.current) * 2 + Math.cos(timeRef.current * 2.5) * 1.5;
            const noiseY = Math.cos(timeRef.current * 1.2) * 2 + Math.sin(timeRef.current * 3) * 1.5;

            setCursorPos({
                x: targetX + noiseX,
                y: targetY + noiseY
            });

            requestRef.current = requestAnimationFrame(updateCursor);
        };

        requestRef.current = requestAnimationFrame(updateCursor);

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseRef.current = {
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100
                };
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [gameState]);

    const handleStartGame = () => {
        if (!userName.trim()) return;
        setGameState("VIDEO");
    };

    const handleVideoEnd = () => {
        setGameState("GAME");
    };

    const calculateScore = (x: number, y: number) => {
        // Calculate distance from center (50, 50)
        // Adjust for aspect ratio if needed, but assuming square target area helps
        const dx = x - 50;
        const dy = y - 50;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Scoring zones (shrunk -5px)
        if (distance < 9) return 7; // Blue Center
        if (distance < 20) return 5; // Yellow Ring
        if (distance < 32) return 3; // Red Ring
        return 0; // Miss
        return 0;
    };

    const handleThrow = () => {
        if (isThrowing || currentThrow >= MAX_THROWS) return;

        setIsThrowing(true);
        const score = calculateScore(cursorPos.x, cursorPos.y);
        const rotation = Math.random() * 30 - 15; // Random rotation for realism

        // Animate throw
        setTimeout(() => {
            setThrows(prev => [...prev, { x: cursorPos.x, y: cursorPos.y, score, rotation }]);
            setShowHitScore(score);

            setTimeout(() => {
                setShowHitScore(null);
                setIsThrowing(false);

                if (currentThrow + 1 >= MAX_THROWS) {
                    setTimeout(() => setGameState("RESULT"), 1000);
                } else {
                    setCurrentThrow(prev => prev + 1);
                }
            }, 1000);
        }, 200); // Throw duration
    };

    const getFinalScore = () => {
        const sortedScores = [...throws].map(t => t.score).sort((a, b) => b - a);
        return sortedScores.slice(0, THROWS_TO_COUNT).reduce((a, b) => a + b, 0);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden cursor-none">
            <Header />

            {/* INTRO STATE */}
            {gameState === "INTRO" && (
                <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-900 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black">
                    <div className="bg-black/80 p-8 border-2 border-brand-yellow max-w-md w-full text-center backdrop-blur-sm">
                        <h1 className="text-4xl font-black text-brand-yellow mb-8 uppercase font-display">
                            Simulador de Arremesso
                        </h1>

                        <div className="mb-8">
                            <label className="block text-left text-sm font-bold mb-2 text-zinc-400">
                                IDENTIFICAÇÃO DO OPERADOR
                            </label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="DIGITE SEU NOME"
                                className="w-full bg-black border-2 border-white/30 p-4 text-xl font-bold text-white focus:border-brand-yellow outline-none uppercase"
                            />
                        </div>

                        <button
                            onClick={handleStartGame}
                            disabled={!userName.trim()}
                            className="w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Image
                                src="/simulator/accept-mission.png"
                                alt="ACEITAR MISSÃO"
                                width={400}
                                height={100}
                                className="w-full h-auto hover:scale-105 transition-transform"
                            />
                        </button>
                    </div>
                </div>
            )}

            {/* VIDEO STATE */}
            {gameState === "VIDEO" && (
                <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                    <video
                        ref={videoRef}
                        src="/videos/000 simulação desafio.mp4"
                        autoPlay
                        onEnded={handleVideoEnd}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={handleVideoEnd}
                        className="absolute bottom-8 right-8 text-white/50 hover:text-white text-sm border border-white/30 px-4 py-2"
                    >
                        [PULAR INTRO]
                    </button>
                </div>
            )}

            {/* GAME STATE */}
            {gameState === "GAME" && (
                <div
                    ref={containerRef}
                    onClick={handleThrow}
                    className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-zinc-900 cursor-none"
                >
                    {/* HUD */}
                    <div className="absolute top-24 left-0 right-0 z-20 flex justify-between px-8 pointer-events-none">
                        <div className="bg-black/80 border border-brand-yellow/30 p-4">
                            <p className="text-sm text-zinc-400">OPERADOR</p>
                            <p className="text-xl font-bold text-brand-yellow">{userName}</p>
                        </div>
                        <div className="bg-black/80 border border-brand-yellow/30 p-4">
                            <p className="text-sm text-zinc-400">ARREMESSOS</p>
                            <p className="text-xl font-bold text-white">{currentThrow + 1} / {MAX_THROWS}</p>
                        </div>
                    </div>

                    {/* Target */}
                    <div className="relative w-[600px] h-[600px] select-none pointer-events-none">
                        <Image
                            src="/simulator/target.png"
                            alt="Alvo"
                            fill
                            className="object-contain"
                            priority
                        />

                        {/* Stuck Knives */}
                        {throws.map((t, i) => (
                            <div
                                key={i}
                                className="absolute w-16 h-48 origin-bottom"
                                style={{
                                    left: `${t.x}%`,
                                    top: `${t.y}%`,
                                    transform: `translate(-50%, -100%) rotate(${t.rotation}deg) scale(0.8)`,
                                }}
                            >
                                <Image
                                    src="/simulator/knife.png"
                                    alt="Faca"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Hit Score Popup */}
                    {showHitScore !== null && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                            <div className="text-8xl font-black text-brand-yellow animate-ping">
                                {showHitScore}
                            </div>
                        </div>
                    )}

                    {/* Custom Cursor (Crosshair) */}
                    <div
                        className="fixed w-12 h-12 border-2 border-brand-yellow rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
                        style={{
                            left: `${cursorPos.x}%`,
                            top: `${cursorPos.y}%`
                        }}
                    >
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                        <div className="absolute w-full h-[1px] bg-brand-yellow/50" />
                        <div className="absolute h-full w-[1px] bg-brand-yellow/50" />
                    </div>

                    {/* Knife following cursor (Visual only) */}
                    {!isThrowing && (
                        <div
                            className="fixed w-32 h-96 pointer-events-none z-40 origin-bottom opacity-80"
                            style={{
                                left: `${cursorPos.x}%`,
                                top: `${cursorPos.y}%`,
                                transform: `translate(-50%, 20%) rotate(5deg)`,
                            }}
                        >
                            <Image
                                src="/simulator/knife.png"
                                alt="Faca"
                                fill
                                className="object-contain"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* RESULT STATE */}
            {gameState === "RESULT" && (
                <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-center cursor-default">
                    <div className="max-w-2xl w-full animate-in fade-in zoom-in duration-500">
                        <Image
                            src="/simulator/mission-complete.png"
                            alt="MISSÃO CUMPRIDA"
                            width={600}
                            height={150}
                            className="w-full h-auto mb-8"
                        />

                        <h2 className="text-3xl font-bold text-white mb-4">
                            PARABÉNS, {userName}!
                        </h2>

                        <div className="bg-white/10 border-2 border-brand-yellow p-8 mb-8">
                            <p className="text-sm text-zinc-400 mb-2">SUA PONTUAÇÃO FINAL</p>
                            <p className="text-8xl font-black text-brand-yellow">
                                {getFinalScore()}
                            </p>
                            <p className="text-xs text-zinc-500 mt-2">(SOMA DOS {THROWS_TO_COUNT} MELHORES ARREMESSOS)</p>
                        </div>

                        <p className="text-xl text-zinc-300 mb-8 max-w-lg mx-auto">
                            Essa foi sua pontuação! Confira o ranking oficial e veja em que posição você ficou.
                        </p>

                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/evento"
                                className="px-8 py-4 bg-brand-yellow text-black font-black text-xl hover:scale-105 transition-transform"
                            >
                                VOLTAR AO EVENTO
                            </Link>
                            <button
                                onClick={async () => {
                                    try {
                                        const score = getFinalScore();

                                        // Create canvas
                                        const canvas = document.createElement('canvas');
                                        const ctx = canvas.getContext('2d');
                                        if (!ctx) {
                                            alert('Erro ao criar canvas.');
                                            return;
                                        }

                                        // Load template image
                                        const templateImg = new window.Image();
                                        templateImg.crossOrigin = 'anonymous';

                                        templateImg.onload = () => {
                                            // Set canvas size to match template
                                            canvas.width = templateImg.width;
                                            canvas.height = templateImg.height;

                                            // Draw template
                                            ctx.drawImage(templateImg, 0, 0);

                                            // Configure text style
                                            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'; // Preto 90%
                                            ctx.textAlign = 'center';

                                            // Draw NAME in larger white rectangle
                                            // Position: centered, lowered a bit more
                                            ctx.font = 'bold italic 60px "Bebas Neue", Arial, sans-serif';
                                            ctx.fillText(userName.toUpperCase(), canvas.width / 2, 520);

                                            // Draw SCORE in smaller white rectangle
                                            // Position: centered, lowered a bit more
                                            ctx.font = 'bold italic 160px "Bebas Neue", Arial, sans-serif';
                                            ctx.fillText(score.toString(), canvas.width / 2, 720);

                                            // Convert to blob and share/download
                                            canvas.toBlob(async (blob) => {
                                                if (!blob) {
                                                    alert('Erro ao gerar imagem.');
                                                    return;
                                                }

                                                const fileName = `desafio_${userName}_${score}pts.png`;

                                                // Try native share API (mobile)
                                                if (typeof navigator !== 'undefined' && navigator.share) {
                                                    try {
                                                        const file = new File([blob], fileName, { type: 'image/png' });
                                                        await navigator.share({
                                                            files: [file],
                                                            title: 'Desafio ao Extremo',
                                                            text: `${userName} fez ${score} pontos no Desafio ao Extremo!`
                                                        });
                                                        return;
                                                    } catch {
                                                        console.log('Share cancelled or not supported');
                                                    }
                                                }

                                                // Fallback: Download image
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = fileName;
                                                document.body.appendChild(a);
                                                a.click();
                                                document.body.removeChild(a);
                                                URL.revokeObjectURL(url);

                                                alert('✅ Imagem salva! Compartilhe no WhatsApp ou redes sociais.');
                                            }, 'image/png');
                                        };

                                        templateImg.onerror = () => {
                                            alert('Erro ao carregar template. Tente novamente.');
                                        };

                                        templateImg.src = '/simulator/share-template.png';
                                    } catch (error) {
                                        console.error('Error sharing:', error);
                                        alert('Erro ao compartilhar. Tente novamente.');
                                    }
                                }}
                                className="px-8 py-4 border-2 border-brand-yellow text-brand-yellow font-bold text-xl hover:bg-brand-yellow hover:text-black transition-colors"
                            >
                                COMPARTILHAR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { Footer } from "@/components/ui/Footer";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { WelcomeCover } from "@/components/marketing/WelcomeCover";
import { Header } from "@/components/ui/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EventoPage() {
    const router = useRouter();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Data de desbloqueio: 25 de janeiro de 2026 às 19:30 (horário de Brasília)
        const unlockDate = new Date('2026-01-25T19:30:00-03:00');
        const now = new Date();

        if (now >= unlockDate) {
            setIsUnlocked(true);
        } else {
            setIsUnlocked(false);
        }

        setIsLoading(false);
    }, []);

    // Tela de carregamento
    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="text-brand-yellow text-2xl font-bold">Carregando...</div>
            </div>
        );
    }

    // Tela de bloqueio se ainda não chegou a data
    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">
                <TacticalMapBackground />
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
                    <div className="max-w-2xl space-y-8">
                        {/* Ícone de cadeado */}
                        <div className="flex justify-center">
                            <svg className="w-24 h-24 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-brand-yellow uppercase font-display">
                            CONTEÚDO BLOQUEADO
                        </h1>

                        <div className="space-y-4 text-lg md:text-xl text-zinc-300">
                            <p className="font-bold text-white">
                                Esta página estará disponível em:
                            </p>
                            <p className="text-3xl md:text-4xl font-black text-brand-yellow">
                                25 DE JANEIRO DE 2026
                            </p>
                            <p className="text-2xl md:text-3xl font-bold text-white">
                                ÀS 19:30
                            </p>
                        </div>

                        <div className="pt-8">
                            <button
                                onClick={() => router.push('/')}
                                className="bg-brand-yellow text-black font-bold px-8 py-4 text-lg hover:bg-yellow-500 transition-colors"
                            >
                                VOLTAR PARA HOME
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Conteúdo normal da página (desbloqueado)
    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">
            <Header />
            <TacticalMapBackground />

            {/* Welcome Cover */}
            <WelcomeCover />

            {/* Hero Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-24">
                {/* Angled Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-yellow/5 to-transparent -skew-y-2 transform origin-top-left" />

                <div className="relative z-10 flex max-w-7xl flex-col items-center gap-12 w-full">

                    {/* Título Principal */}
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-brand-yellow" />
                            <h1 className="text-4xl md:text-6xl font-black tracking-wider text-brand-yellow uppercase font-display">
                                O EVENTO
                            </h1>
                            <div className="h-[2px] w-12 bg-brand-yellow" />
                        </div>
                        <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl">
                            Prepare-se para a experiência mais extrema da sua vida
                        </p>
                    </div>

                    {/* Grid de Funcionalidades */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {/* Card 1: Votação */}
                        <div className="group relative bg-zinc-900/50 border-2 border-brand-yellow/30 p-8 hover:border-brand-yellow transition-all duration-300 hover:scale-105">
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            <div className="flex flex-col items-center gap-4 text-center">
                                <svg className="w-16 h-16 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                <h3 className="text-2xl font-bold text-white">VOTAÇÃO</h3>
                                <p className="text-zinc-400">Vote nos seus participantes favoritos</p>
                            </div>
                        </div>

                        {/* Card 2: Ranking */}
                        <div className="group relative bg-zinc-900/50 border-2 border-brand-yellow/30 p-8 hover:border-brand-yellow transition-all duration-300 hover:scale-105">
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            <div className="flex flex-col items-center gap-4 text-center">
                                <svg className="w-16 h-16 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <h3 className="text-2xl font-bold text-white">RANKING</h3>
                                <p className="text-zinc-400">Acompanhe a classificação em tempo real</p>
                            </div>
                        </div>

                        {/* Card 3: Galeria */}
                        <div className="group relative bg-zinc-900/50 border-2 border-brand-yellow/30 p-8 hover:border-brand-yellow transition-all duration-300 hover:scale-105">
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            <div className="flex flex-col items-center gap-4 text-center">
                                <svg className="w-16 h-16 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-2xl font-bold text-white">GALERIA</h3>
                                <p className="text-zinc-400">Fotos e vídeos dos desafios</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}

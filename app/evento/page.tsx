"use client";

import { Footer } from "@/components/ui/Footer";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { WelcomeCover } from "@/components/marketing/WelcomeCover";
import { Header } from "@/components/ui/Header";
import { Sponsors } from "@/components/marketing/Sponsors";
import { VideoSchedule } from "@/components/marketing/VideoSchedule";
import { RankingCard } from "@/components/marketing/RankingCard";

export default function EventoPage() {
    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">
            <Header />
            <TacticalMapBackground />

            {/* Welcome Cover */}
            <WelcomeCover />

            {/* Patrocinadores */}
            <Sponsors />

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
                        {/* Card 1: Grade de Vídeos */}
                        <VideoSchedule />

                        {/* Card 2: Ranking */}
                        <RankingCard />

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

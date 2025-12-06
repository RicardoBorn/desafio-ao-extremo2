"use client";

import Link from "next/link";
import { Footer } from "@/components/ui/Footer";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { WelcomeCover } from "@/components/marketing/WelcomeCover";
import { Header } from "@/components/ui/Header";
import { Sponsors } from "@/components/marketing/Sponsors";
import { VideoSchedule } from "@/components/marketing/VideoSchedule";
import { RankingCard } from "@/components/marketing/RankingCard";
import { ProductsSection } from "@/components/marketing/ProductsSection";
import { ExpandableAudioPlayer } from "@/components/media/ExpandableAudioPlayer";
import { Track } from "@/components/media/AudioPlayer";
import { VideoWeeklyCover } from "@/components/marketing/VideoWeeklyCover";
import { StickyBettingButton } from "@/components/ui/StickyBettingButton";


const tracks: Track[] = [
    {
        id: "1",
        title: "Coming Up - Desafio ao Extremo",
        duration: "02:30",
        url: "/audio/Coming Up-Desafio ao Extremo.mp3"
    },
    {
        id: "2",
        title: "Faca no Ar",
        duration: "03:05",
        url: "/audio/Faca no Ar.mp3"
    },
    {
        id: "3",
        title: "Não Dá Pra Desistir",
        duration: "01:52",
        url: "/audio/Não dá pra desistir 2.mp3"
    },
    {
        id: "4",
        title: "Power On",
        duration: "02:50",
        url: "/audio/power on.mp3"
    }
];

export default function EventoPage() {
    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">
            <StickyBettingButton />
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

                    {/* Simulador & Apostar Buttons */}
                    <div className="flex flex-col items-center gap-6 w-full max-w-3xl">

                        {/* Simulador Button */}
                        <Link
                            href="/simulador"
                            className="w-full group relative inline-flex items-center justify-center px-8 py-6 bg-brand-yellow overflow-hidden transition-transform hover:scale-105 border-2 border-brand-yellow"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative font-black text-xl md:text-3xl text-black uppercase tracking-widest text-center">
                                SIMULADOR DO DESAFIO
                            </span>
                        </Link>

                        <p className="text-xl md:text-2xl text-zinc-300 text-center">
                            Teste suas habilidades agora mesmo
                        </p>

                        {/* Apostar Button */}
                        <Link
                            href="#ranking"
                            className="w-full group relative inline-flex items-center justify-center px-8 py-6 bg-brand-yellow overflow-hidden transition-transform hover:scale-105 animate-pulse hover:animate-none border-2 border-brand-yellow shadow-[0_0_30px_rgba(255,193,7,0.5)]"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative font-black text-xl md:text-3xl text-black uppercase tracking-widest text-center flex flex-col items-center leading-none">
                                <span>QUEM VAI VENCER?</span>
                                <span className="text-sm md:text-base font-bold text-zinc-800 mt-1 normal-case tracking-normal">Dê seu palpite agora!</span>
                            </span>
                        </Link>

                        <p className="text-xl md:text-2xl text-zinc-300 text-center">
                            Dê seu palpite no favorito
                        </p>
                    </div>

                    {/* Vídeos da Semana */}
                    <div className="w-full">
                        <VideoWeeklyCover />
                    </div>

                    {/* Grid de Funcionalidades */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {/* Card 1: Grade de Vídeos */}
                        <VideoSchedule />

                        {/* Card 2: Ranking */}
                        <div className="lg:col-span-2">
                            <RankingCard />
                        </div>
                    </div>

                    {/* Visitor Statistics - REMOVED */}

                </div>
            </section>


            {/* Materiais Exclusivos Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-start px-4 py-12 md:py-24">
                {/* Angled Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-yellow/5 to-transparent -skew-y-2 transform origin-top-left" />


                <div className="relative z-10 flex max-w-7xl flex-col items-center gap-12 w-full">

                    {/* Título Principal */}
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-brand-yellow" />
                            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-brand-yellow uppercase font-display">
                                MATERIAIS EXCLUSIVOS
                            </h2>
                            <div className="h-[2px] w-12 bg-brand-yellow" />
                        </div>
                        <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl">
                            Músicas oficiais do Desafio ao Extremo
                        </p>
                    </div>

                    {/* Player de Áudio Expansível */}
                    <div className="w-full">
                        <ExpandableAudioPlayer tracks={tracks} />
                    </div>

                </div>
            </section >

            {/* Produtos Oficiais */}
            < ProductsSection />

            <Footer />

        </div >
    );
}

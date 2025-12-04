"use client";


import { Footer } from "@/components/ui/Footer";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { RankingAdmin } from "@/components/admin/RankingAdmin";
import { VisitorStatsAdmin } from "@/components/admin/VisitorStatsAdmin";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">

            <TacticalMapBackground />

            {/* Hero Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-24">
                <div className="relative z-10 flex max-w-7xl flex-col items-center gap-8 w-full">

                    {/* Título */}
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-blue-500" />
                        <h1 className="text-5xl md:text-7xl font-black tracking-wider text-blue-500 uppercase font-display">
                            PAINEL ADMIN
                        </h1>
                        <div className="h-[2px] w-12 bg-blue-500" />
                    </div>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl text-center">
                        Gerenciamento do Ranking - Desafio ao Extremo
                    </p>

                    {/* Visitor Statistics */}
                    <VisitorStatsAdmin />

                    {/* Ranking Admin Component */}
                    <RankingAdmin />

                </div>
            </section>

            <Footer />
        </div>
    );
}

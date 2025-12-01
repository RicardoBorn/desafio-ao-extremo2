"use client";


import { Footer } from "@/components/ui/Footer";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">

            <TacticalMapBackground />

            {/* Hero Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-24 text-center">
                <div className="relative z-10 flex max-w-6xl flex-col items-center gap-8 w-full">

                    {/* Título */}
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-blue-500" />
                        <h1 className="text-5xl md:text-7xl font-black tracking-wider text-blue-500 uppercase font-display">
                            PAINEL ADMIN
                        </h1>
                        <div className="h-[2px] w-12 bg-blue-500" />
                    </div>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl">
                        Área administrativa para gerenciar o evento (em desenvolvimento)
                    </p>

                    {/* Placeholder para funcionalidades admin */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-12">
                        <div className="border-2 border-blue-500/30 p-8 bg-black/40">
                            <h3 className="text-2xl font-bold text-blue-500 mb-4">👥 Gerenciar Participantes</h3>
                            <p className="text-zinc-400">Adicionar, editar ou remover participantes</p>
                        </div>

                        <div className="border-2 border-blue-500/30 p-8 bg-black/40">
                            <h3 className="text-2xl font-bold text-blue-500 mb-4">📊 Atualizar Ranking</h3>
                            <p className="text-zinc-400">Modificar pontuações e posições</p>
                        </div>

                        <div className="border-2 border-blue-500/30 p-8 bg-black/40">
                            <h3 className="text-2xl font-bold text-blue-500 mb-4">🎥 Gerenciar Vídeos</h3>
                            <p className="text-zinc-400">Adicionar vídeos à galeria</p>
                        </div>

                        <div className="border-2 border-blue-500/30 p-8 bg-black/40">
                            <h3 className="text-2xl font-bold text-blue-500 mb-4">⚙️ Configurações</h3>
                            <p className="text-zinc-400">Ajustes gerais do evento</p>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}

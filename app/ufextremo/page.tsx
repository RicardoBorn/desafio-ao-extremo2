"use client";

import { useState, useEffect } from "react";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { BettingCard } from "@/components/betting/BettingCard";
import { getParticipants, type Participant } from "@/lib/rankingStorage";
import { Trophy, Flame } from "lucide-react";

export default function UFExtremoPage() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await getParticipants();
            // Filter only active participants if needed, for now show all
            setParticipants(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            <TacticalMapBackground />

            <div className="relative z-10 container mx-auto px-4 py-24">

                {/* Header da Arena */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/50 rounded-full bg-red-500/10 backdrop-blur-sm mb-4">
                        <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                        <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
                            Arena de Apostas
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                        <span className="text-white">UF</span>
                        <span className="text-brand-yellow">EXTREMO</span>
                    </h1>

                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Quem será o grande campeão? Dê o seu palpite, aposte na pontuação e veja quem a torcida está apoiando.
                    </p>
                </div>

                {/* Grid de Apostas */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-96 bg-zinc-900/50 border border-zinc-800 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {participants.map((participant) => (
                            <BettingCard key={participant.id} participant={participant} />
                        ))}
                    </div>
                )}

                {/* Footer Info */}
                <div className="mt-20 text-center border-t border-zinc-800 pt-8">
                    <p className="text-zinc-500 text-sm font-mono">
                        * As apostas são simbólicas e servem para medir a popularidade dos participantes.
                    </p>
                </div>
            </div>
        </main>
    );
}

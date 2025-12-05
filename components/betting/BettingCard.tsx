"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Participant } from "@/lib/rankingStorage";
import { getParticipantStats, placeBet, type ParticipantStats } from "@/lib/betting";
import { TrendingUp, Users } from "lucide-react";

interface BettingCardProps {
    participant: Participant;
}

export function BettingCard({ participant }: BettingCardProps) {
    const [stats, setStats] = useState<ParticipantStats>({ totalBets: 0, averageScore: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [score, setScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasBet, setHasBet] = useState(false);

    const validScores = [0, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 40, 42];

    const loadStats = async () => {
        const data = await getParticipantStats(participant.id);
        setStats(data);
    };

    useEffect(() => {
        loadStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participant.id]);

    const handleBet = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName.trim()) return;

        setIsSubmitting(true);
        try {
            await placeBet({
                participantId: participant.id,
                participantName: participant.name,
                userName: userName,
                predictedScore: score
            });
            setHasBet(true);
            setIsModalOpen(false);
            loadStats(); // Refresh stats
        } catch (error) {
            console.error("Error placing bet:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="relative group bg-zinc-900/80 border-2 border-zinc-800 hover:border-brand-yellow/50 transition-all duration-300 overflow-hidden">
                {/* Header com Foto - Mais alto e cantos retos */}
                <div className="relative h-64 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                    <Image
                        src={participant.imageUrl || "/placeholder-user.jpg"}
                        alt={participant.name}
                        fill
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-wider truncate">
                            {participant.name}
                        </h3>
                        <p className="text-brand-yellow text-xs font-bold uppercase">
                            DESAFIADO
                        </p>
                    </div>
                </div>

                {/* Stats da Torcida */}
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-black/40 p-2 border border-zinc-800">
                            <div className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1">
                                <Users className="w-3 h-3" />
                                <span>APOSTAS</span>
                            </div>
                            <span className="text-xl font-black text-white">{stats.totalBets}</span>
                        </div>
                        <div className="bg-black/40 p-2 border border-zinc-800">
                            <div className="flex items-center justify-center gap-1 text-zinc-400 text-xs mb-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>MÉDIA</span>
                            </div>
                            <span className="text-xl font-black text-brand-yellow">{stats.averageScore}</span>
                        </div>
                    </div>

                    {/* Botão de Ação */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={hasBet}
                        className={`w-full py-3 font-black uppercase tracking-wider transition-all clip-path-polygon ${hasBet
                            ? "bg-green-600 text-white cursor-default"
                            : "bg-brand-yellow text-black hover:bg-white hover:text-black"
                            }`}
                        style={{ clipPath: "polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)" }}
                    >
                        {hasBet ? "PALPITE ENVIADO!" : "APOSTAR AGORA"}
                    </button>
                </div>
            </div>

            {/* Modal de Aposta */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 border-2 border-brand-yellow w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-zinc-500 hover:text-white"
                        >
                            ✕
                        </button>

                        <h3 className="text-2xl font-black text-white uppercase mb-1">
                            SEU PALPITE
                        </h3>
                        <p className="text-zinc-400 text-sm mb-6">
                            Quanto você acha que <span className="text-brand-yellow font-bold">{participant.name}</span> vai tirar?
                        </p>

                        <form onSubmit={handleBet} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Seu Nome</label>
                                <input
                                    type="text"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-brand-yellow outline-none font-bold uppercase"
                                    placeholder="DIGITE SEU NOME"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Nota Prevista</label>
                                <select
                                    value={score}
                                    onChange={(e) => setScore(Number(e.target.value))}
                                    className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-brand-yellow outline-none font-bold uppercase appearance-none"
                                >
                                    {validScores.map((s) => (
                                        <option key={s} value={s}>{s} PONTOS</option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-brand-yellow/10 border border-brand-yellow/20 p-3 text-xs text-brand-yellow/80 font-mono">
                                ⚠️ Atenção: Esta é uma aposta recreativa e simbólica. Não envolve dinheiro real e serve apenas como incentivo e torcida para os desafiados.
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-yellow text-black font-black py-4 uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                {isSubmitting ? "ENVIANDO..." : "CONFIRMAR APOSTA"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

"use client";

import Image from "next/image";

// Manual Data for 20 participants - Edit here
const rankingData = [
    { rank: 1, name: "Cabo Gonçalves", channel: "Natureza Selvagem Bushcraft", score: 42, image: "/participant-1.png" },
    { rank: 2, name: "Henrique Fonseca", channel: "Henrique Sobrevivências", score: 40, image: "/participant-2.png" },
    { rank: 3, name: "Michel Mendonça", channel: "Veterinário Mateiro", score: 37, image: "/participant-3.png" },
    { rank: 4, name: "Participante 4", channel: "Canal 4", score: 35, image: "/participant-4.png" },
    { rank: 5, name: "Participante 5", channel: "Canal 5", score: 34, image: "/participant-5.png" },
    { rank: 6, name: "Participante 6", channel: "Canal 6", score: 33, image: "/participant-6.png" },
    { rank: 7, name: "Participante 7", channel: "Canal 7", score: 30, image: "/participant-7.png" },
    { rank: 8, name: "Participante 8", channel: "Canal 8", score: 29, image: "/participant-8.png" },
    { rank: 9, name: "Participante 9", channel: "Canal 9", score: 27, image: "/participant-9.png" },
    { rank: 10, name: "Participante 10", channel: "Canal 10", score: 25, image: "/participant-1.png" },
    { rank: 11, name: "Participante 11", channel: "Canal 11", score: 24, image: "/participant-2.png" },
    { rank: 12, name: "Participante 12", channel: "Canal 12", score: 22, image: "/participant-3.png" },
    { rank: 13, name: "Participante 13", channel: "Canal 13", score: 20, image: "/participant-4.png" },
    { rank: 14, name: "Participante 14", channel: "Canal 14", score: 19, image: "/participant-5.png" },
    { rank: 15, name: "Participante 15", channel: "Canal 15", score: 18, image: "/participant-6.png" },
    { rank: 16, name: "Participante 16", channel: "Canal 16", score: 16, image: "/participant-7.png" },
    { rank: 17, name: "Participante 17", channel: "Canal 17", score: 15, image: "/participant-8.png" },
    { rank: 18, name: "Participante 18", channel: "Canal 18", score: 14, image: "/participant-9.png" },
    { rank: 19, name: "Participante 19", channel: "Canal 19", score: 12, image: "/participant-1.png" },
    { rank: 20, name: "Participante 20", channel: "Canal 20", score: 10, image: "/participant-2.png" },
];

export function RankingCard() {
    const top3 = rankingData.slice(0, 3);
    const rest = rankingData.slice(3);

    return (
        <div className="w-full bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 md:p-8">
            <div className="flex flex-col gap-8">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <h3 className="text-3xl font-black text-brand-yellow uppercase italic tracking-wider">
                        RANKING GERAL
                    </h3>
                    <div className="text-zinc-400 text-sm font-mono">
                        ATUALIZADO: 26/11/2025
                    </div>
                </div>

                {/* Top 3 Section */}
                <div className="flex flex-col gap-4">
                    {top3.map((participant) => (
                        <div
                            key={participant.rank}
                            className="relative flex items-center bg-zinc-800/50 h-32 md:h-40 overflow-hidden group"
                            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)" }} // Slight angle on right
                        >
                            {/* Rank Badge */}
                            <div className="absolute top-0 left-0 bg-brand-yellow text-black font-black text-2xl md:text-4xl p-2 md:p-4 w-16 md:w-20 text-center z-20" style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}>
                                {participant.rank}º
                            </div>

                            {/* Image Container with Angled Mask */}
                            <div className="relative h-full w-32 md:w-48 shrink-0 ml-8 md:ml-12 z-10 overflow-hidden" style={{ clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0% 100%)" }}>
                                <Image
                                    src={participant.image}
                                    alt={participant.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 pl-4 md:pl-8 flex flex-col justify-center z-10">
                                <h4 className="text-xl md:text-3xl font-black text-white uppercase italic leading-none mb-1">
                                    {participant.name}
                                </h4>
                                <p className="text-brand-yellow font-bold text-sm md:text-lg italic">
                                    {participant.channel}
                                </p>
                            </div>

                            {/* Score */}
                            <div className="pr-8 md:pr-16 flex items-center justify-center">
                                <div className="bg-brand-yellow text-black font-black text-4xl md:text-6xl px-4 py-2 transform -skew-x-12">
                                    {participant.score}
                                </div>
                            </div>

                            {/* Background Decoration */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-yellow/5 z-0" />
                        </div>
                    ))}
                </div>

                {/* List 4-20 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mt-4">
                    {rest.map((participant) => (
                        <div key={participant.rank} className="flex items-center justify-between py-2 border-b border-zinc-800 hover:bg-white/5 transition-colors px-2">
                            <div className="flex items-center gap-4">
                                <div className="bg-brand-yellow text-black font-bold w-8 h-8 flex items-center justify-center text-sm transform -skew-x-12">
                                    {participant.rank}º
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white text-sm uppercase">{participant.name}</span>
                                    <span className="text-zinc-500 text-xs">{participant.channel}</span>
                                </div>
                            </div>
                            <div className="bg-brand-yellow/20 text-brand-yellow font-black px-3 py-1 text-lg transform -skew-x-12 min-w-[3rem] text-center">
                                {participant.score}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

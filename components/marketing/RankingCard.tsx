'use client';

export function RankingCard() {
    return (
        <div className="group relative bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 md:p-8 hover:border-brand-yellow transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <div className="flex flex-col gap-6">
                {/* Título */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <svg className="w-8 h-8 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <h3 className="text-2xl md:text-3xl font-black text-brand-yellow uppercase">
                            RANKING
                        </h3>
                        <svg className="w-8 h-8 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                    </div>
                    <p className="text-zinc-400 text-sm">Acompanhe os desafiados</p>
                </div>

                {/* Pódio Visual */}
                <div className="flex items-end justify-center gap-2 h-32">
                    {/* 2º Lugar */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center text-white font-black text-lg">
                            2
                        </div>
                        <div className="w-full bg-gradient-to-t from-zinc-600 to-zinc-700 rounded-t-lg flex items-center justify-center h-20 border-2 border-zinc-500">
                            <span className="text-2xl font-black text-zinc-300">🥈</span>
                        </div>
                    </div>

                    {/* 1º Lugar */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center text-black font-black text-xl animate-pulse">
                            1
                        </div>
                        <div className="w-full bg-gradient-to-t from-brand-yellow to-yellow-500 rounded-t-lg flex items-center justify-center h-28 border-2 border-brand-yellow shadow-lg shadow-brand-yellow/50">
                            <span className="text-3xl font-black">🏆</span>
                        </div>
                    </div>

                    {/* 3º Lugar */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-black text-lg">
                            3
                        </div>
                        <div className="w-full bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg flex items-center justify-center h-16 border-2 border-amber-600">
                            <span className="text-2xl font-black text-amber-200">🥉</span>
                        </div>
                    </div>
                </div>

                {/* Informações */}
                <div className="space-y-2 text-center text-sm text-zinc-400">
                    <p>🔥 Baseado em visualizações e engajamento</p>
                    <p className="text-brand-yellow font-bold">Atualizado semanalmente</p>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-white group-hover:text-brand-yellow transition-colors">
                        <span className="font-bold text-sm uppercase tracking-wider">Acompanhe os vídeos</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

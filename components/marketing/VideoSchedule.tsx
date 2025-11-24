'use client';

export function VideoSchedule() {
    return (
        <div className="group relative bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 md:p-8 hover:border-brand-yellow transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <div className="flex flex-col gap-6">
                {/* Título */}
                <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-black uppercase">
                        <span className="text-white">GRADE DE </span>
                        <span className="text-brand-yellow">VÍDEOS</span>
                    </h3>
                </div>

                {/* Grade de Programação */}
                <div className="space-y-4 text-sm md:text-base">
                    {/* Abertura do Projeto */}
                    <div className="border-l-4 border-brand-yellow pl-4">
                        <h4 className="font-black text-brand-yellow uppercase mb-2">Abertura Projeto</h4>
                        <ul className="space-y-1 text-zinc-300">
                            <li>• Pré-Campanha</li>
                            <li className="text-brand-yellow font-bold">• Domingo 19h30 - Abertura</li>
                            <li>• Segunda 17h00 - 1º YouTuber</li>
                            <li>• Quarta 17h00 - 2º YouTuber</li>
                            <li>• Sexta 17h00 - 3º YouTuber</li>
                            <li className="text-brand-yellow font-bold">• Domingo 19h30 - REAÇÃO</li>
                        </ul>
                    </div>

                    {/* Segunda Semana */}
                    <div className="border-l-4 border-zinc-600 pl-4">
                        <h4 className="font-black text-white uppercase mb-2">Segunda Semana</h4>
                        <ul className="space-y-1 text-zinc-300">
                            <li>• Segunda 17h00 - 1º YouTuber</li>
                            <li>• Quarta 17h00 - 2º YouTuber</li>
                            <li>• Sexta 17h00 - 3º YouTuber</li>
                            <li className="text-brand-yellow font-bold">• Domingo 19h30 - REAÇÃO</li>
                        </ul>
                    </div>

                    {/* Terceira Semana */}
                    <div className="border-l-4 border-zinc-600 pl-4">
                        <h4 className="font-black text-white uppercase mb-2">Terceira Semana</h4>
                        <ul className="space-y-1 text-zinc-300">
                            <li>• Segunda 17h00 - 1º YouTuber</li>
                            <li>• Quarta 17h00 - 2º YouTuber</li>
                            <li>• Sexta 17h00 - 3º YouTuber</li>
                            <li className="text-brand-yellow font-bold">• Domingo 19h30 - REAÇÃO</li>
                        </ul>
                    </div>

                    {/* Quarta Semana */}
                    <div className="border-l-4 border-zinc-600 pl-4">
                        <h4 className="font-black text-white uppercase mb-2">Quarta Semana</h4>
                        <ul className="space-y-1 text-zinc-300">
                            <li>• Segunda 17h00 - 1º YouTuber</li>
                            <li>• Quarta 17h00 - 2º YouTuber</li>
                            <li>• Sexta 17h00 - 3º YouTuber</li>
                            <li className="text-brand-yellow font-bold">• Sábado 20h00 - LIVE</li>
                            <li className="text-brand-yellow font-bold">• Domingo 19h30 - REAÇÃO</li>
                        </ul>
                    </div>
                </div>

                {/* Total de Vídeos */}
                <div className="text-center pt-4 border-t-2 border-brand-yellow/30">
                    <p className="text-2xl md:text-3xl font-black">
                        <span className="text-white">18 VÍDEOS </span>
                        <span className="text-brand-yellow">POR MÊS</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

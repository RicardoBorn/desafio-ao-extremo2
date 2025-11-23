import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black/90 border-t border-brand-yellow/30 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                    {/* Coluna 1 - Sobre */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:pr-8">
                        <h3 className="text-brand-yellow font-display text-xl font-bold tracking-wider mb-4 uppercase">
                            Sobre o Desafio
                        </h3>
                        <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
                            <p>
                                Os maiores guerreiros do universo outdoor aceitaram o chamado.
                                Eles vão enfrentar um teste brutal de foco, coragem e habilidade — o <strong className="text-brand-yellow">Desafio ao Extremo!</strong>
                            </p>
                            <p>
                                Mais de <strong className="text-white">35 youtubers</strong> de todo o Brasil, cada um com sua história, seu estilo e sua lâmina…
                                E um convidado lendário direto de Largados e Pelados, o imbatível <strong className="text-white">EJ Snider!</strong>
                            </p>
                            <p>
                                O que vem aí é imprevisível, intenso e completamente <strong className="text-brand-yellow">EXTREMO</strong>.
                            </p>
                            <p className="text-xs text-zinc-500 italic pt-2">
                                💥 Torça pelo seu criador favorito<br />
                                💥 Acompanhe rankings e lives oficiais<br />
                                💥 Concorra a uma lâmina personalizada exclusiva!
                            </p>
                        </div>
                    </div>

                    {/* Divisor vertical - apenas em telas médias+ */}
                    <div className="hidden md:block w-[1px] bg-brand-yellow/30 mx-8" />

                    {/* Coluna 2 - Links Rápidos */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-8">
                        <h3 className="text-brand-yellow font-display text-xl font-bold tracking-wider mb-4 uppercase">
                            Links Rápidos
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm"
                            >
                                Página Inicial
                            </Link>
                            <Link
                                href="#participantes"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm"
                            >
                                Guerreiros
                            </Link>
                            <a
                                href="https://www.youtube.com/@bornaoextremo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm"
                            >
                                Canal no YouTube
                            </a>
                        </nav>
                    </div>

                    {/* Divisor vertical - apenas em telas médias+ */}
                    <div className="hidden md:block w-[1px] bg-brand-yellow/30 mx-8" />

                    {/* Coluna 3 - Redes Sociais */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:pl-8">
                        <h3 className="text-brand-yellow font-display text-xl font-bold tracking-wider mb-4 uppercase">
                            Redes Sociais
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://www.youtube.com/@bornaoextremo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2"
                            >
                                <span>📺</span> YouTube
                            </a>
                            <a
                                href="https://www.instagram.com/bornaoextremo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2"
                            >
                                <span>📷</span> Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/BornaoExtremo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2"
                            >
                                <span>👥</span> Facebook
                            </a>
                            <a
                                href="https://www.tiktok.com/@born_ao_extremo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2"
                            >
                                <span>🎵</span> TikTok
                            </a>
                            <a
                                href="https://www.threads.com/@bornaoextremo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2"
                            >
                                <span>🧵</span> Threads
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-brand-yellow/20 text-center">
                    <p className="text-zinc-500 text-sm">
                        © 2025 Desafio ao Extremo. Todos os direitos reservados.
                    </p>
                    <p className="text-zinc-600 text-xs mt-2">
                        Desenvolvido com 🔥 para os verdadeiros guerreiros
                    </p>
                </div>
            </div>
        </footer>
    );
}

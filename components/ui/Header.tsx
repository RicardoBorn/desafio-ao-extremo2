"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Calendar } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-brand-yellow/20">
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                {/* Logo Esquerda - Desafio ao Extremo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo-evento-hd.png"
                        alt="Desafio ao Extremo"
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                        quality={100}
                        priority
                    />
                </Link>

                {/* Navegação Central - Ícones com Tooltips */}
                <nav className="hidden md:flex items-center gap-6">
                    {/* Início */}
                    <Link
                        href="/"
                        className="group relative flex items-center justify-center w-10 h-10 text-zinc-400 hover:text-brand-yellow transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        <span className="absolute top-full mt-2 px-3 py-1 bg-black/90 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-brand-yellow/20">
                            INÍCIO
                        </span>
                    </Link>



                    {/* Evento */}
                    <Link
                        href="/evento"
                        className="group relative flex items-center justify-center w-10 h-10 text-zinc-400 hover:text-brand-yellow transition-colors"
                    >
                        <Calendar className="w-5 h-5" />
                        <span className="absolute top-full mt-2 px-3 py-1 bg-black/90 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-brand-yellow/20">
                            EVENTO
                        </span>
                    </Link>


                </nav>

                {/* Logos Direita - Bandeira Brasil */}
                <div className="flex items-center">
                    <Image
                        src="/bandeira-brasil-hd.png"
                        alt="Brasil"
                        width={60}
                        height={40}
                        className="h-9 w-auto"
                        quality={100}
                        priority
                    />
                </div>
            </div>
        </header>
    );
}

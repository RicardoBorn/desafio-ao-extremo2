"use client"

import Link from "next/link"
import { Home, FileText, Calendar, Archive } from "lucide-react"

export function DevNavigation() {
    return (
        <div className="fixed top-4 right-4 z-50 bg-red-600/90 backdrop-blur-sm border-2 border-red-400 rounded-lg p-3 shadow-2xl">
            <div className="text-xs font-bold text-white mb-2 text-center uppercase tracking-wider">
                🚧 Dev Navigation
            </div>
            <div className="flex flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-medium transition-all hover:scale-105"
                >
                    <Home className="w-4 h-4" />
                    Home
                </Link>
                <Link
                    href="/evento"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-medium transition-all hover:scale-105"
                >
                    <Calendar className="w-4 h-4" />
                    Evento
                </Link>
                <Link
                    href="/videos"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-medium transition-all hover:scale-105"
                >
                    <Calendar className="w-4 h-4" />
                    Vídeos
                </Link>
                <Link
                    href="/apoio"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-medium transition-all hover:scale-105"
                >
                    <FileText className="w-4 h-4" />
                    Apoio
                </Link>
                <Link
                    href="/desafio"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-medium transition-all hover:scale-105"
                >
                    <FileText className="w-4 h-4" />
                    Desafio
                </Link>
                <Link
                    href="/arquivos"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-medium transition-all hover:scale-105"
                >
                    <Archive className="w-4 h-4" />
                    Arquivos
                </Link>
            </div>
        </div>
    )
}

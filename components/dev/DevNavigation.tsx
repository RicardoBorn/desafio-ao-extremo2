'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DevNavigation() {
    const pathname = usePathname();

    const pages = [
        { href: "/", label: "HOME", color: "bg-brand-yellow text-black hover:bg-yellow-500" },
        { href: "/videos", label: "VÍDEOS", color: "bg-zinc-700 text-white hover:bg-zinc-600" },
        { href: "/evento", label: "EVENTO", color: "bg-zinc-700 text-white hover:bg-zinc-600" },
        { href: "/apoio", label: "APOIO", color: "bg-zinc-700 text-white hover:bg-zinc-600" },
        { href: "/desafio", label: "DESAFIO", color: "bg-zinc-700 text-white hover:bg-zinc-600" },
        { href: "/arquivos", label: "ARQUIVOS", color: "bg-zinc-700 text-white hover:bg-zinc-600" },
        { href: "/admin", label: "ADMIN", color: "bg-zinc-700 text-white hover:bg-zinc-600" },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
            {/* Label de Dev Mode */}
            <div className="text-xs text-zinc-400 text-right font-bold tracking-wider">
                DEV MODE
            </div>

            {/* Botões de Navegação */}
            <div className="flex flex-col gap-2">
                {pages.map((page) => {
                    const isActive = pathname === page.href;
                    return (
                        <Link
                            key={page.href}
                            href={page.href}
                            className={`
                                px-6 py-3 text-sm font-black rounded-lg shadow-lg 
                                transition-all duration-300 transform
                                ${page.color}
                                ${isActive
                                    ? 'scale-110 ring-2 ring-brand-yellow ring-offset-2 ring-offset-brand-dark'
                                    : 'hover:scale-105'
                                }
                            `}
                        >
                            {page.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function ArquivosPage() {
    const [currentPath, setCurrentPath] = useState("C:\\DESAFIO_EXTREMO");

    const files = [
        { name: "PARTICIPANTES", type: "DIR", size: "", date: "2025-11-22" },
        { name: "BASTIDORES", type: "DIR", size: "", date: "2025-11-20" },
        { name: "TRILHA_SONORA", type: "DIR", size: "", date: "2025-11-18" },
        { name: "BRIEFING.TXT", type: "FILE", size: "4,521", date: "2025-11-15" },
        { name: "REGRAS.PDF", type: "FILE", size: "128,340", date: "2025-11-10" },
        { name: "CRONOGRAMA.XLS", type: "FILE", size: "45,120", date: "2025-11-08" },
    ];

    return (
        <div className="min-h-screen bg-black text-[#00ff00] font-mono p-4 md:p-8 selection:bg-[#00ff00] selection:text-black">

            {/* Glitch Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-10 mix-blend-overlay">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#00ff00_2px,#00ff00_4px)] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Terminal Header */}
                <div className="border-2 border-[#00ff00] p-4 mb-6">
                    <pre className="text-sm">
                        {`╔═══════════════════════════════════════════════════════════════╗
║  DESAFIO AO EXTREMO - SISTEMA DE ARQUIVOS v1.0              ║
║  Acesso: RESTRITO | Status: MONITORADO | Data: 22/11/2025   ║
╚═══════════════════════════════════════════════════════════════╝`}
                    </pre>
                </div>

                {/* Current Path */}
                <div className="mb-4">
                    <p className="text-sm opacity-60">Diretório Atual:</p>
                    <p className="text-xl font-bold">{currentPath}&gt;_</p>
                </div>

                {/* File Browser */}
                <div className="border-2 border-[#00ff00] p-6">
                    <div className="mb-4 pb-2 border-b border-[#00ff00]/30">
                        <div className="grid grid-cols-4 gap-4 text-sm font-bold">
                            <span>NOME</span>
                            <span>TIPO</span>
                            <span>TAMANHO</span>
                            <span>DATA</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-4 text-sm hover:bg-[#00ff00] hover:text-black px-2 py-1 transition-colors cursor-pointer group"
                            >
                                <span className="flex items-center gap-2">
                                    {file.type === "DIR" ? "📁" : "📄"}
                                    <span className="group-hover:font-bold">{file.name}</span>
                                </span>
                                <span className="opacity-60 group-hover:opacity-100">
                                    {file.type === "DIR" ? "<DIR>" : "FILE"}
                                </span>
                                <span className="opacity-60 group-hover:opacity-100">
                                    {file.size || "---"}
                                </span>
                                <span className="opacity-60 group-hover:opacity-100">{file.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Command Prompt */}
                <div className="mt-6 border-2 border-[#00ff00] p-4">
                    <p className="text-sm mb-2 opacity-60">Prompt de Comando:</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[#00ff00]">{currentPath}&gt;</span>
                        <span className="animate-pulse">_</span>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="mt-8 text-center space-y-2">
                    <p className="text-sm opacity-40 animate-pulse">
                        &gt;&gt; Rastreamento de IP em andamento...
                    </p>
                    <p className="text-xs opacity-60">
                        Psiu... você encontrou o easter egg! 😉
                    </p>
                    <p className="text-xs opacity-40">
                        Compartilhe com os amigos e veja quem mais consegue encontrar!
                    </p>

                    <Link
                        href="/"
                        className="inline-block mt-4 px-6 py-2 border-2 border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-colors"
                    >
                        [VOLTAR PARA PÁGINA PRINCIPAL]
                    </Link>
                </div>

                {/* Fake System Messages */}
                <div className="mt-8 text-xs opacity-20 space-y-1">
                    <p>&gt; system.log: Acesso detectado de IP 192.168.1.xxx</p>
                    <p>&gt; firewall.exe: Tentativa de bloqueio... FALHOU</p>
                    <p>&gt; security.dll: Alerta enviado para administrador</p>
                    <p>&gt; tracker.sys: Localização... SÃO PAULO, BR</p>
                </div>
            </div>
        </div>
    );
}

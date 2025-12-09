"use client";

import { useState } from "react";
import { Heart, Zap, Target, TrendingUp } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function DonationSection() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [showQRCode, setShowQRCode] = useState(false);

    const pixKey = "bornextremo@gmail.com";
    const amounts = [
        { value: 5, icon: Heart, label: "Guerreiro" },
        { value: 10, icon: Zap, label: "Desafiante" },
        { value: 25, icon: TrendingUp, label: "Lendário" },
        { value: 50, icon: Target, label: "Extremo" }
    ];

    const handleAmountClick = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount("");
        setShowQRCode(true);
    };

    const handleCustomAmount = () => {
        const value = parseFloat(customAmount);
        if (value >= 1) {
            setSelectedAmount(value);
            setShowQRCode(true);
        }
    };

    return (
        <section className="relative w-full px-4 py-16 md:py-20">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-yellow/5 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <div className="flex items-center gap-3 px-6 py-2 bg-brand-yellow/10 border border-brand-yellow/30 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse" />
                            <span className="text-brand-yellow font-bold text-sm uppercase tracking-wider">
                                Apoie o Projeto
                            </span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 font-display">
                        Dinheiro é um dos
                        <span className="block text-brand-yellow">Elogios Mais Sinceros</span>
                    </h2>

                    <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                        Sua contribuição financia <span className="text-brand-yellow font-semibold">futuros projetos épicos</span> e a preparação do <span className="text-white font-bold">Desafio ao Extremo 2</span>
                    </p>
                </div>

                {/* Donation Card */}
                <div className="bg-zinc-900/50 backdrop-blur-md border-2 border-zinc-800 p-8 md:p-10 relative overflow-hidden group hover:border-brand-yellow/50 transition-all duration-500">
                    {/* Animated Corner Accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-yellow/30 group-hover:border-brand-yellow transition-colors duration-500" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-brand-yellow/30 group-hover:border-brand-yellow transition-colors duration-500" />

                    {/* Amount Selection */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">
                            Escolha seu nível de apoio
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {amounts.map(({ value, icon: Icon, label }) => (
                                <button
                                    key={value}
                                    onClick={() => handleAmountClick(value)}
                                    className={`relative group/btn flex flex-col items-center justify-center p-6 border-2 transition-all duration-300 hover:scale-105 ${selectedAmount === value
                                        ? "bg-brand-yellow border-brand-yellow shadow-[0_0_30px_rgba(255,193,7,0.4)]"
                                        : "bg-zinc-800/50 border-zinc-700 hover:border-brand-yellow/50"
                                        }`}
                                >
                                    <Icon className={`w-8 h-8 mb-2 transition-colors ${selectedAmount === value ? "text-black" : "text-brand-yellow"
                                        }`} />
                                    <span className={`text-2xl font-black mb-1 ${selectedAmount === value ? "text-black" : "text-white"
                                        }`}>
                                        R$ {value}
                                    </span>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${selectedAmount === value ? "text-black/70" : "text-zinc-400"
                                        }`}>
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Custom Amount */}
                        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <span className="text-zinc-400 text-sm font-medium whitespace-nowrap">
                                    Ou valor do coração:
                                </span>
                                <div className="relative flex-1 md:flex-initial">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-bold">
                                        R$
                                    </span>
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        placeholder="1,00"
                                        className="w-full md:w-32 bg-zinc-800 border-2 border-zinc-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-brand-yellow transition-colors"
                                        min="1"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleCustomAmount}
                                disabled={!customAmount || parseFloat(customAmount) < 1}
                                className="w-full md:w-auto px-6 py-3 bg-brand-yellow text-black font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-yellow"
                            >
                                Gerar PIX
                            </button>
                        </div>
                    </div>

                    {/* QR Code Display */}
                    {showQRCode && selectedAmount && (
                        <div className="border-t-2 border-zinc-800 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <div className="inline-block p-6 bg-white mb-4">
                                    <QRCodeSVG
                                        value={`00020126580014br.gov.bcb.pix0136${pixKey}52040000530398654${String(selectedAmount.toFixed(2)).padStart(13, '0')}5802BR5925Desafio ao Extremo6009SAO PAULO62070503***6304`}
                                        size={192}
                                        level="M"
                                        includeMargin={false}
                                    />
                                </div>

                                <p className="text-zinc-300 mb-2">
                                    Escaneie o QR Code ou copie a chave PIX:
                                </p>

                                <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
                                    <code className="flex-1 bg-zinc-800 border border-zinc-700 px-4 py-3 text-brand-yellow text-sm font-mono break-all">
                                        {pixKey}
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(pixKey);
                                        }}
                                        className="px-4 py-3 bg-brand-yellow text-black font-bold hover:bg-white transition-colors whitespace-nowrap"
                                    >
                                        Copiar
                                    </button>
                                </div>

                                <p className="text-zinc-500 text-sm mt-4 italic">
                                    Obrigado por acreditar no projeto! 🔥
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Message */}
                <div className="text-center mt-8">
                    <p className="text-zinc-400 text-sm">
                        Cada real conta. Cada apoio importa. <span className="text-brand-yellow font-semibold">Vamos juntos!</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

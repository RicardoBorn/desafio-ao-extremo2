'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function SubscribePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Verificar se o popup já foi fechado anteriormente
        const popupClosed = localStorage.getItem('subscribePopupClosed');

        if (!popupClosed) {
            // Mostrar popup após 5 segundos
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem('subscribePopupClosed', 'true');
        }, 300);
    };

    const handleSubscribe = () => {
        // Abrir canal do YouTube em nova aba
        window.open('https://www.youtube.com/@BornaoExtremo', '_blank');
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay escuro */}
            <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
                    }`}
                onClick={handleClose}
            />

            {/* Popup */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <div
                    className={`relative max-w-md w-full transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                        }`}
                >
                    {/* Imagem de fundo inclinada */}
                    <div className="relative">
                        <Image
                            src="/popup-bg.png"
                            alt="Background"
                            width={600}
                            height={800}
                            className="w-full h-auto"
                        />

                        {/* Conteúdo sobreposto */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12">
                            {/* Botão Fechar */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-brand-yellow transition-colors z-10"
                                aria-label="Fechar"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Logo do Canal (círculo amarelo) */}
                            <div className="mb-6">
                                <Image
                                    src="/popup-logo.png"
                                    alt="Born ao Extremo"
                                    width={120}
                                    height={120}
                                    className="drop-shadow-[0_0_20px_rgba(255,193,7,0.4)]"
                                />
                            </div>

                            {/* Título */}
                            <h3 className="text-2xl md:text-3xl font-black text-brand-yellow uppercase font-display tracking-wider mb-2">
                                INSCREVA-SE!
                            </h3>
                            <div className="h-[2px] w-24 bg-brand-yellow/50 mb-6" />

                            {/* Descrição */}
                            <p className="text-white text-base md:text-lg leading-relaxed text-center mb-6 px-4">
                                Não perca nenhum momento do <span className="text-brand-yellow font-bold">Desafio ao Extremo</span>!
                                <br />
                                Se inscreva no canal e ative o sininho 🔔
                            </p>

                            {/* Botão de Inscrição (imagem customizada) */}
                            <button
                                onClick={handleSubscribe}
                                className="relative group transition-transform duration-300 hover:scale-105 mb-4"
                            >
                                <Image
                                    src="/popup-button.png"
                                    alt="Inscrever-se Agora"
                                    width={360}
                                    height={72}
                                    className="w-full max-w-[20rem] h-auto drop-shadow-lg"
                                />
                            </button>

                            {/* Link "Depois" */}
                            <button
                                onClick={handleClose}
                                className="text-zinc-400 hover:text-white text-sm transition-colors underline"
                            >
                                Talvez depois
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

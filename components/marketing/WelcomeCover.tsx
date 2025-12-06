"use client";
// Force deploy update

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function WelcomeCover() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden">

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 text-brand-yellow/20 text-9xl font-display">「</div>
            <div className="absolute bottom-20 right-10 text-brand-yellow/20 text-9xl font-display">」</div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Texto Esquerda */}
                <div className="space-y-8">
                    {/* Logo do Evento */}
                    <div className="-mt-12">
                        <Image
                            src="/logo-extremo-v2.png"
                            alt="Desafio ao Extremo"
                            width={484}
                            height={182}
                            className="w-full max-w-xl h-auto"
                            priority
                            sizes="(max-width: 768px) 100vw, 576px"
                        />
                    </div>

                    {/* Texto Descritivo - Centralizado com linhas */}
                    <div className="space-y-6">
                        {/* Linha superior */}
                        <div className="h-[2px] w-40 bg-brand-yellow mx-auto" />

                        {/* Texto centralizado */}
                        <div className="text-center space-y-4 text-white">
                            <p className="text-xl md:text-2xl font-bold italic">
                                Bem vindo ao <span className="text-brand-yellow">DESAFIO AO EXTREMO</span>.
                            </p>
                            <p className="text-lg md:text-xl italic leading-relaxed">
                                Iniciamos uma jornada de <span className="font-bold">3 a 4 meses</span> com<br />
                                muitas novidades e muita superação.
                            </p>
                        </div>

                        {/* Linha inferior */}
                        <div className="h-[2px] w-40 bg-brand-yellow mx-auto" />
                    </div>

                    {/* Botão Born ao Extremo */}
                    <motion.div
                        className="flex justify-center pt-6 cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            className="relative"
                            whileTap={{
                                filter: [
                                    "brightness(1) drop-shadow(0 0 0px rgba(255, 193, 7, 0))",
                                    "brightness(1.3) drop-shadow(0 0 20px rgba(255, 193, 7, 0.8))",
                                    "brightness(1) drop-shadow(0 0 0px rgba(255, 193, 7, 0))"
                                ]
                            }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src="/btn-born.png"
                                alt="Born ao Extremo"
                                width={600}
                                height={60}
                                className="h-14 w-auto"
                            />
                        </motion.div>
                    </motion.div>


                </div>

                {/* Imagem Direita com Parallax */}
                <motion.div
                    className="relative"
                    style={{ y }}
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Collage do apresentador */}
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                        <Image
                            src="/apresentador-final.png"
                            alt="Apresentador Ricardo Born"
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Decorative knife */}
                    <div className="absolute -top-12 -left-12 opacity-20 rotate-45">
                        <svg className="w-32 h-32 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 2L2 22l2 2 20-20-2-2z" />
                        </svg>
                    </div>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-brand-yellow text-xs font-bold tracking-wider">ROLE PARA BAIXO</span>
                <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}

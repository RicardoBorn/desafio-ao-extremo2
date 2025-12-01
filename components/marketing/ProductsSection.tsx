"use client";

import { ExternalLink, Lock, Gift, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    images: string[]; // Array de imagens ao invés de imageUrl único
    productUrl: string;
    badge?: string;
    isLocked?: boolean;
}

const products: Product[] = [
    {
        id: "1",
        title: "Kit Completo - Desafio ao Extremo",
        description: "O arsenal definitivo. Inclui Faca Bushcraft, Faca Tática, Fire Steel e Kit Paracord. Este item é exclusivo e não pode ser comprado, apenas conquistado.",
        price: "R$ 0,00",
        images: [
            "/products/paracord-kit.png",
            "/products/paracord-kit.png",
            "/products/paracord-kit.png",
            "/products/paracord-kit.png",
            "/products/paracord-kit.png"
        ],
        productUrl: "#",
        badge: "ITEM EXCLUSIVO - NÃO ESTÁ À VENDA",
        isLocked: true
    },
    {
        id: "2",
        title: "Faca EBENEZER P2 - Tática",
        description: "Faca tática de combate com lâmina revestida em preto, cabo com ranhuras para melhor aderência e bainha de nylon. Perfeita para situações extremas e missões táticas.",
        price: "R$ 349,90",
        images: [
            "/products/faca-tatica.png",
            "/products/faca-tatica.png",
            "/products/faca-tatica.png",
            "/products/faca-tatica.png",
            "/products/faca-tatica.png"
        ],
        productUrl: "#",
        badge: "MAIS VENDIDO"
    },
    {
        id: "3",
        title: "EBENEZER Fire Steel",
        description: "Acendedor de fogo profissional com haste de ferrocério. Gera faíscas de até 3000°C, funciona em qualquer clima. Essencial para sobrevivência em ambientes extremos.",
        price: "R$ 89,90",
        images: [
            "/products/fire-steel.png",
            "/products/fire-steel.png",
            "/products/fire-steel.png",
            "/products/fire-steel.png",
            "/products/fire-steel.png"
        ],
        productUrl: "#",
        badge: "ESSENCIAL"
    },
    {
        id: "4",
        title: "Faca EBENEZER P2 - Bushcraft",
        description: "A lâmina definitiva para quem busca sobrevivência e precisão. Forjada em aço carbono de alta resistência, cabo ergonômico e bainha tática inclusa.",
        price: "R$ 299,90",
        images: [
            "/products/faca-bushcraft.png",
            "/products/faca-bushcraft.png",
            "/products/faca-bushcraft.png",
            "/products/faca-bushcraft.png",
            "/products/faca-bushcraft.png"
        ],
        productUrl: "#",
        badge: "RECOMENDADO"
    }
];

function ProductCard({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const isLocked = product.isLocked;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div
            className={`relative group overflow-hidden bg-zinc-900/50 border transition-all duration-500 ${isLocked
                ? "border-brand-yellow/50 hover:border-brand-yellow shadow-[0_0_30px_rgba(255,193,7,0.1)]"
                : "border-zinc-800 hover:border-brand-yellow/50"
                }`}
        >
            <div className="grid md:grid-cols-[300px_1fr] gap-0 h-full">
                {/* Imagem do Produto com Carrossel */}
                <div className="relative h-64 md:h-auto overflow-hidden bg-zinc-800/50">
                    {/* Imagem Atual */}
                    <div className="relative w-full h-full">
                        <Image
                            src={product.images[currentImageIndex]}
                            alt={`${product.title} - Imagem ${currentImageIndex + 1}`}
                            fill
                            className={`object-cover transition-opacity duration-300 ${isLocked ? "grayscale-0" : ""}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                        {/* Overlay de Bloqueio para item exclusivo */}
                        {isLocked && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 backdrop-blur-[2px]">
                                <Lock className="w-12 h-12 text-brand-yellow animate-pulse" />
                            </div>
                        )}
                    </div>

                    {/* Controles do Carrossel */}
                    {product.images.length > 1 && (
                        <>
                            {/* Botões de Navegação */}
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Imagem anterior"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Próxima imagem"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Indicadores de Pontos */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                            ? "bg-brand-yellow w-6"
                                            : "bg-white/50 hover:bg-white/80"
                                            }`}
                                        aria-label={`Ir para imagem ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Contador de Imagens */}
                            <div className="absolute top-3 right-3 z-30 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                {currentImageIndex + 1}/{product.images.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Conteúdo do Produto */}
                <div className="p-6 md:p-8 flex flex-col justify-center relative">
                    {/* Badge */}
                    {product.badge && (
                        <div className={`inline-block self-start px-3 py-1 text-xs font-bold border mb-3 ${isLocked
                            ? "bg-brand-yellow text-black border-brand-yellow animate-pulse"
                            : "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30"
                            }`}>
                            {product.badge}
                        </div>
                    )}

                    <h3 className={`text-xl md:text-2xl font-bold mb-3 ${isLocked ? "text-brand-yellow" : "text-white"}`}>
                        {product.title}
                    </h3>

                    <p className="text-zinc-400 mb-4 leading-relaxed text-sm">
                        {product.description}
                    </p>

                    {/* Preço */}
                    <div className="mb-4">
                        <p className="text-xs text-zinc-500 mb-1">
                            {isLocked ? "Valor inestimável" : "Valor exclusivo"}
                        </p>
                        <p className="text-2xl font-bold text-white">
                            {isLocked ? "SORTEIO NA LIVE" : product.price}
                        </p>
                    </div>

                    {/* Botão de Ação */}
                    {isLocked ? (
                        <button
                            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-brand-yellow text-black font-black hover:bg-brand-yellow/90 transition-all group/btn shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] hover:scale-105 animate-float"
                        >
                            QUERO GANHAR
                            <Gift className="ml-2 w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                        </button>
                    ) : (
                        <a
                            href={product.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-white text-black font-bold hover:bg-zinc-200 transition-colors group/btn animate-float"
                        >
                            Comprar Agora
                            <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    )}

                    <p className="mt-3 text-xs text-center sm:text-left font-medium animate-pulse-text">
                        {isLocked ? "Exclusivo para participantes" : "Compra segura via Mercado Livre"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function ProductsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative px-4 py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
                {/* Título da Seção */}
                <div className="flex flex-col items-center gap-6 text-center mb-12">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-brand-yellow" />
                        <h2 className="text-3xl md:text-5xl font-black tracking-wider text-brand-yellow uppercase font-display">
                            PRODUTOS OFICIAIS
                        </h2>
                        <div className="h-[2px] w-12 bg-brand-yellow" />
                    </div>
                    <p className="text-lg md:text-xl text-zinc-300 max-w-2xl">
                        Equipamentos oficiais do evento online Desafio ao Extremo.
                    </p>
                </div>

                {/* Grid de Produtos - 2x2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Modal de Conversão Viral */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-zinc-900 border-2 border-brand-yellow p-8 rounded-2xl shadow-[0_0_50px_rgba(255,193,7,0.2)]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-yellow/10 border-2 border-brand-yellow mb-2">
                                    <Gift className="w-10 h-10 text-brand-yellow animate-bounce" />
                                </div>

                                <div>
                                    <h3 className="text-3xl font-black text-white uppercase mb-2">
                                        VOCÊ QUER ESSE KIT?
                                    </h3>
                                    <p className="text-zinc-400">
                                        Este arsenal é <span className="text-brand-yellow font-bold">EXCLUSIVO</span> e será sorteado apenas para quem estiver ao vivo conosco.
                                    </p>
                                </div>

                                <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
                                    <p className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                                        PARA PARTICIPAR DO SORTEIO:
                                    </p>
                                    <ol className="text-left text-zinc-300 space-y-3 text-sm mb-6">
                                        <li className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-yellow text-black font-bold flex items-center justify-center text-xs">1</span>
                                            Entre no Grupo VIP do WhatsApp para receber o link da Live.
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-yellow text-black font-bold flex items-center justify-center text-xs">2</span>
                                            Esteja presente na Live do Desafio.
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-yellow text-black font-bold flex items-center justify-center text-xs">3</span>
                                            Comente a hashtag secreta que será revelada.
                                        </li>
                                    </ol>

                                    <button className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                        ENTRAR NO GRUPO VIP
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-zinc-500 text-sm mb-4">
                                        Não quer contar com a sorte?
                                    </p>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-white hover:text-brand-yellow underline text-sm transition-colors"
                                    >
                                        Ver facas disponíveis para compra imediata
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

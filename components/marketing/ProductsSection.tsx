"use client";

import { ExternalLink, Lock, Gift, X, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    images: string[];
    productUrl: string;
    badge?: string;
    isLocked?: boolean;
    sizes?: string[]; // Tamanhos disponíveis para camisetas
}

const products: Product[] = [
    {
        id: "1",
        title: "Kit Completo - Desafio ao Extremo",
        description: "O arsenal definitivo. Inclui Faca Bushcraft, Faca Tática, Fire Steel e Kit Paracord. Este item é exclusivo e não pode ser comprado, apenas conquistado.",
        price: "R$ 0,00",
        images: [
            "/products/paracord-kit.png"
        ],
        productUrl: "#",
        badge: "ITEM EXCLUSIVO - NÃO ESTÁ À VENDA",
        isLocked: true
    },
    {
        id: "2",
        title: "Camiseta Oficial - Masculina",
        description: "Camiseta preta oficial do evento Desafio ao Extremo. 100% algodão, estampa de alta qualidade com logo do evento. Disponível nos tamanhos P, M, G e GG.",
        price: "R$ 78,90",
        images: [
            "/products/camiseta-masculina.png"
        ],
        productUrl: "#",
        badge: "OFICIAL",
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: "3",
        title: "Camiseta Oficial - Feminina",
        description: "Camiseta preta oficial do evento Desafio ao Extremo. Modelagem feminina, 100% algodão, estampa de alta qualidade com logo do evento. Disponível nos tamanhos P, M, G e GG.",
        price: "R$ 78,90",
        images: [
            "/products/camiseta-feminina.png"
        ],
        productUrl: "#",
        badge: "OFICIAL",
        sizes: ["P", "M", "G", "GG"]
    }
];

function ProductCard({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showPixModal, setShowPixModal] = useState(false);
    const [orderData, setOrderData] = useState({ name: "", email: "", size: "", address: "" });
    const [copied, setCopied] = useState(false);
    const isLocked = product.isLocked;
    const hasSizes = product.sizes && product.sizes.length > 0;

    const pixKey = "bornextremo@gmail.com";

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleBuyClick = () => {
        setShowOrderForm(true);
    };

    const handleSubmitOrder = () => {
        if (!orderData.name || !orderData.email || !orderData.address || (hasSizes && !orderData.size)) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        // Gerar mensagem do pedido
        const message = `*PEDIDO - ${product.title}*\n\nNome: ${orderData.name}\nEmail: ${orderData.email}\nTamanho: ${orderData.size}\nEndereço: ${orderData.address}\n\nValor: ${product.price}\n\n_Aguardando pagamento via PIX_`;

        // WhatsApp do usuário
        const whatsappNumber = "5542991513372"; // +55 42 9151-3372
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Fechar formulário e abrir modal PIX
        setShowOrderForm(false);
        setShowPixModal(true);
    };

    const handleCopyPixKey = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div
                className={`relative group overflow-hidden bg-zinc-900/50 border transition-all duration-500 ${isLocked
                    ? "border-brand-yellow/50 hover:border-brand-yellow shadow-[0_0_30px_rgba(255,193,7,0.1)]"
                    : "border-zinc-800 hover:border-brand-yellow/50"
                    }`}
            >
                <div className="grid md:grid-cols-[400px_1fr] gap-0 h-full">
                    {/* Imagem do Produto com Carrossel */}
                    <div className="relative h-80 md:h-auto overflow-hidden bg-zinc-800/50">
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
                            <button
                                onClick={handleBuyClick}
                                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-brand-yellow text-black font-bold hover:bg-brand-yellow/90 transition-all group/btn shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)]"
                            >
                                COMPRAR VIA PIX
                                <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        )}

                        <p className="mt-3 text-xs text-center sm:text-left font-medium text-zinc-500">
                            {isLocked ? "Exclusivo para participantes" : "Pagamento via PIX"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal de Pedido */}
            <AnimatePresence>
                {showOrderForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowOrderForm(false)}
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
                                onClick={() => setShowOrderForm(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-white uppercase mb-2">
                                        FINALIZAR PEDIDO
                                    </h3>
                                    <p className="text-zinc-400 text-sm">
                                        {product.title} - {product.price}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">NOME COMPLETO</label>
                                        <input
                                            type="text"
                                            value={orderData.name}
                                            onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:border-brand-yellow focus:outline-none"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">EMAIL</label>
                                        <input
                                            type="email"
                                            value={orderData.email}
                                            onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:border-brand-yellow focus:outline-none"
                                            placeholder="seu@email.com"
                                        />
                                    </div>

                                    {hasSizes && (
                                        <div>
                                            <label className="block text-sm font-bold text-white mb-2">TAMANHO</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {product.sizes!.map((size) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setOrderData({ ...orderData, size })}
                                                        className={`px-4 py-3 border-2 font-bold transition-all ${orderData.size === size
                                                            ? "border-brand-yellow bg-brand-yellow text-black"
                                                            : "border-zinc-700 text-white hover:border-brand-yellow/50"
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">ENDEREÇO COMPLETO PARA ENTREGA</label>
                                        <textarea
                                            value={orderData.address}
                                            onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded focus:border-brand-yellow focus:outline-none resize-none"
                                            placeholder="Rua, número, complemento, bairro, cidade, estado, CEP"
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmitOrder}
                                    className="w-full py-4 bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    ENVIAR PEDIDO VIA WHATSAPP
                                </button>

                                <p className="text-xs text-zinc-500 text-center">
                                    Você será redirecionado para o WhatsApp para confirmar o pedido e receber os dados do PIX para pagamento
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal PIX */}
            <AnimatePresence>
                {showPixModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPixModal(false)}
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
                                onClick={() => setShowPixModal(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-white uppercase mb-2">
                                        PAGAMENTO VIA PIX
                                    </h3>
                                    <p className="text-zinc-400 text-sm">
                                        {product.title} - {product.price}
                                    </p>
                                </div>

                                {/* QR Code */}
                                <div className="flex justify-center">
                                    <div className="inline-block p-6 bg-white rounded-lg">
                                        <QRCodeSVG
                                            value={`00020126580014br.gov.bcb.pix0136${pixKey}52040000530398654${String(parseFloat(product.price.replace('R$ ', '').replace(',', '.')).toFixed(2)).padStart(13, '0')}5802BR5925Desafio ao Extremo6009SAO PAULO62070503***6304`}
                                            size={200}
                                            level="M"
                                            includeMargin={false}
                                        />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-zinc-300 mb-3 text-sm">
                                        Escaneie o QR Code acima ou copie a chave PIX:
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 bg-zinc-800 border border-zinc-700 px-4 py-3 text-brand-yellow text-sm font-mono break-all rounded">
                                            {pixKey}
                                        </code>
                                        <button
                                            onClick={handleCopyPixKey}
                                            className="px-4 py-3 bg-brand-yellow text-black font-bold hover:bg-white transition-all whitespace-nowrap rounded flex items-center gap-2"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copiado!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copiar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                                    <p className="text-zinc-400 text-xs text-center leading-relaxed">
                                        ✅ Seu pedido foi enviado via WhatsApp<br />
                                        💰 Após o pagamento, envie o comprovante no WhatsApp<br />
                                        📦 Seu produto será enviado em até 5 dias úteis
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowPixModal(false)}
                                    className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-all"
                                >
                                    FECHAR
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
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

                {/* Grid de Produtos - Vertical */}
                <div className="flex flex-col gap-8">
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

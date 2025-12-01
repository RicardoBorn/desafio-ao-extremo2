"use client";

export function VideoWeeklyCover() {
    // Converter link do YouTube para embed
    // https://youtu.be/f76ydcJxBKg?si=IXA4EbYd9c9Zsqp_ -> https://www.youtube.com/embed/f76ydcJxBKg
    const videoId = "f76ydcJxBKg";
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden">

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 text-brand-yellow/20 text-9xl font-display">「</div>
            <div className="absolute bottom-20 right-10 text-brand-yellow/20 text-9xl font-display">」</div>

            {/* Container Geral - Alinhado com o padrão do site */}
            <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12">

                {/* Parte Superior: Texto e Vídeo Grande */}
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-center">

                    {/* Texto Esquerda */}
                    <div className="space-y-8 flex flex-col items-center justify-center">
                        {/* Título "VÍDEOS DA SEMANA" */}
                        <div className="text-center">
                            <h1 className="text-5xl md:text-7xl font-black tracking-wider text-brand-yellow uppercase font-display leading-tight">
                                VÍDEOS DA
                            </h1>
                            <h1 className="text-5xl md:text-7xl font-black tracking-wider text-brand-yellow uppercase font-display leading-tight mt-2">
                                SEMANA
                            </h1>
                        </div>

                        {/* Linhas decorativas */}
                        <div className="space-y-6 w-full max-w-md">
                            <div className="h-[2px] w-40 bg-brand-yellow mx-auto" />

                            <div className="text-center space-y-4 text-white">
                                <p className="text-lg md:text-xl italic leading-relaxed">
                                    Conteúdo exclusivo semanal para os desafiados
                                </p>
                            </div>

                            <div className="h-[2px] w-40 bg-brand-yellow mx-auto" />
                        </div>
                    </div>

                    {/* Vídeo Direita - Grande */}
                    <div className="relative">
                        {/* Container do vídeo com aspect ratio 16:9 */}
                        <div className="relative aspect-video w-full overflow-hidden border-4 border-brand-yellow">
                            <iframe
                                src={embedUrl}
                                title="Vídeo da Semana"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-brand-yellow/20 -z-10" />
                    </div>

                </div>

                {/* Parte Inferior: 4 Vídeos Pequenos - Alinhados com o bloco acima */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Vídeo 1 */}
                    <div className="flex flex-col gap-3">
                        <div className="relative aspect-video w-full overflow-hidden border-2 border-brand-yellow/50 hover:border-brand-yellow transition-colors">
                            <iframe
                                src={embedUrl}
                                title="Destaque 1"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <p className="text-white text-sm text-center font-medium">
                            Desafio da Semana #1 - João Silva
                        </p>
                    </div>

                    {/* Vídeo 2 */}
                    <div className="flex flex-col gap-3">
                        <div className="relative aspect-video w-full overflow-hidden border-2 border-brand-yellow/50 hover:border-brand-yellow transition-colors">
                            <iframe
                                src={embedUrl}
                                title="Destaque 2"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <p className="text-white text-sm text-center font-medium">
                            Superação Extrema - Maria Santos
                        </p>
                    </div>

                    {/* Vídeo 3 */}
                    <div className="flex flex-col gap-3">
                        <div className="relative aspect-video w-full overflow-hidden border-2 border-brand-yellow/50 hover:border-brand-yellow transition-colors">
                            <iframe
                                src={embedUrl}
                                title="Destaque 3"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <p className="text-white text-sm text-center font-medium">
                            Treinamento Tático - Pedro Costa
                        </p>
                    </div>

                    {/* Vídeo 4 */}
                    <div className="flex flex-col gap-3">
                        <div className="relative aspect-video w-full overflow-hidden border-2 border-brand-yellow/50 hover:border-brand-yellow transition-colors">
                            <iframe
                                src={embedUrl}
                                title="Destaque 4"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <p className="text-white text-sm text-center font-medium">
                            Sobrevivência na Selva - Ana Lima
                        </p>
                    </div>
                </div>

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

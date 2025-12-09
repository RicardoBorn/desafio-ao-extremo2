'use client';

import Image from 'next/image';

const sponsors = [
    {
        name: 'Outlanders Adventure',
        logo: '/sponsors/sponsor1.png',
        url: 'https://outlandersadventure.com/',
    },
    {
        name: 'Santiago Brasil',
        logo: '/sponsors/sponsor2.png',
        url: 'https://caminhodesantiagobrasil.com.br/',
    },
    {
        name: 'Cutelaria Betel',
        logo: '/sponsors/sponsor4.png',
        url: 'https://www.instagram.com/cutelaria_betel/',
    },
    {
        name: 'CWB Patch',
        logo: '/sponsors/sponsor3.png',
        url: 'https://wa.me/message/KE4OOOTYAGCIK1',
    },
    {
        name: 'Paracord',
        logo: '/sponsors/sponsor5.png',
        url: 'https://share.google/8FB2RrHErYhaCDpFK',
    },
];

export function Sponsors() {
    return (
        <section className="relative w-full py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Título da Seção */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    <div className="h-[2px] w-8 bg-brand-yellow/50" />
                    <h3 className="text-xl md:text-2xl font-black tracking-[0.3em] text-brand-yellow uppercase font-display">
                        PATROCINADORES
                    </h3>
                    <div className="h-[2px] w-8 bg-brand-yellow/50" />
                </div>

                {/* Grid de Logos */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {sponsors.map((sponsor, index) => {
                        const logoContent = (
                            <div className="relative w-full h-full flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_20px_rgba(255,193,7,0.6)]">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    width={160}
                                    height={160}
                                    className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        );

                        return (
                            <div
                                key={index}
                                className="sponsor-logo group relative w-32 h-32 md:w-40 md:h-40"
                            >
                                {sponsor.url ? (
                                    <a
                                        href={sponsor.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full h-full cursor-pointer"
                                        title={sponsor.name}
                                    >
                                        {logoContent}
                                    </a>
                                ) : (
                                    logoContent
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mensagem de Agradecimento e Incentivo */}
                <div className="mt-12 text-center max-w-3xl mx-auto">
                    <div className="bg-zinc-900/30 backdrop-blur-sm border-2 border-zinc-800 p-8 relative overflow-hidden group hover:border-brand-yellow/30 transition-all duration-500">
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-yellow/20" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-yellow/20" />

                        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-4">
                            <span className="text-brand-yellow font-bold">Esses parceiros acreditaram no projeto</span> e tornaram tudo isso possível.
                        </p>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            Se você curtiu o conteúdo, <span className="text-white font-semibold">retribua visitando e comprando com eles</span>.
                            Cada compra fortalece essa comunidade e garante mais desafios épicos! 🔥
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

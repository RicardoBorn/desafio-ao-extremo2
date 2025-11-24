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
            </div>
        </section>
    );
}

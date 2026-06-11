'use client';

import Script from 'next/script';

interface StructuredDataProps {
    data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
    return (
        <Script
            id={`structured-data-${data['@type']}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// Organization Schema
export function OrganizationSchema() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Desafio ao Extremo',
        alternateName: 'Born ao Extremo',
        url: 'https://desafioaoextremo.com.br',
        logo: 'https://desafioaoextremo.com.br/logo.png',
        description: 'A maior competição de arremesso de facas do YouTube Brasil',
        sameAs: [
            'https://youtube.com/@BornaoExtremo',
            'https://www.instagram.com/bornaoextremo',
            'https://www.facebook.com/bornaoextremo',
        ],
        founder: {
            '@type': 'Person',
            name: 'Ricardo Born',
            url: 'https://youtube.com/@BornaoExtremo',
        },
    };

    return <StructuredData data={data} />;
}

// Event Schema
export function EventSchema() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: 'Desafio ao Extremo - Competição de Arremesso de Facas',
        description: 'A maior competição de arremesso de facas do YouTube Brasil. 9 desafiados competindo pelo título de campeão.',
        startDate: '2026-05-31T19:00:00-03:00',
        endDate: '2026-05-31T23:00:00-03:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
            '@type': 'VirtualLocation',
            url: 'https://desafioaoextremo.com.br/evento',
        },
        image: 'https://desafioaoextremo.com.br/logo.png',
        organizer: {
            '@type': 'Organization',
            name: 'Born ao Extremo',
            url: 'https://youtube.com/@BornaoExtremo',
        },
        performer: {
            '@type': 'Person',
            name: 'Ricardo Born',
        },
        offers: {
            '@type': 'Offer',
            url: 'https://desafioaoextremo.com.br/evento',
            price: '0',
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-05-31T00:00:00-03:00',
        },
    };

    return <StructuredData data={data} />;
}

// VideoObject Schema
export function VideoObjectSchema({
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
}: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
}) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name,
        description,
        thumbnailUrl,
        uploadDate,
        duration: duration || 'PT0M0S',
        contentUrl: 'https://desafioaoextremo.com.br',
        embedUrl: 'https://desafioaoextremo.com.br',
    };

    return <StructuredData data={data} />;
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://desafioaoextremo.com.br${item.url}`,
        })),
    };

    return <StructuredData data={data} />;
}

// WebSite Schema with SearchAction
export function WebSiteSchema() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Desafio ao Extremo',
        url: 'https://desafioaoextremo.com.br',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://desafioaoextremo.com.br/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return <StructuredData data={data} />;
}

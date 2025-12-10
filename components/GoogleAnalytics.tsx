'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { pageview } from '@/lib/analytics';

function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

    useEffect(() => {
        if (!GA_ID) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        pageview(url);
    }, [pathname, searchParams, GA_ID]);

    return null;
}

export function GoogleAnalytics() {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

    if (!GA_ID) {
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
                }}
            />
            <Suspense fallback={null}>
                <AnalyticsTracker />
            </Suspense>
        </>
    );
}

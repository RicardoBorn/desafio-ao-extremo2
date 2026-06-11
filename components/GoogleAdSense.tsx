export function GoogleAdSense() {
    const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-2753309602091343';

    if (!ADSENSE_ID) {
        return null;
    }

    return (
        <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
        />
    );
}

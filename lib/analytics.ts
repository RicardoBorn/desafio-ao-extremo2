// Google Analytics 4 tracking functions

declare global {
    interface Window {
        gtag?: (
            command: string,
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}

// Page view tracking
export const pageview = (url: string) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
            page_path: url,
        });
    }
};

// Event tracking
export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Specific event trackers
export const trackBettingClick = (participant: string, source: string) => {
    event({
        action: 'betting_click',
        category: 'engagement',
        label: `${participant} - ${source}`,
    });
};

export const trackDonationClick = (amount: number) => {
    event({
        action: 'donation_click',
        category: 'conversion',
        label: `R$ ${amount}`,
        value: amount,
    });
};

export const trackVideoPlay = (videoName: string) => {
    event({
        action: 'video_play',
        category: 'engagement',
        label: videoName,
    });
};

export const trackAudioPlay = (trackName: string) => {
    event({
        action: 'audio_play',
        category: 'engagement',
        label: trackName,
    });
};

export const trackSimulatorStart = (playerName: string) => {
    event({
        action: 'simulator_start',
        category: 'engagement',
        label: playerName,
    });
};

export const trackSimulatorComplete = (score: number, playerName: string) => {
    event({
        action: 'simulator_complete',
        category: 'engagement',
        label: playerName,
        value: score,
    });
};

export const trackWhatsAppClick = (source: string) => {
    event({
        action: 'whatsapp_click',
        category: 'engagement',
        label: source,
    });
};

export const trackSocialShare = (platform: string, page: string) => {
    event({
        action: 'social_share',
        category: 'engagement',
        label: `${platform} - ${page}`,
    });
};

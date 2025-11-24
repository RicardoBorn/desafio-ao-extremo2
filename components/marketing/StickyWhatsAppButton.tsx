"use client";

import { WhatsAppButton } from "./WhatsAppButton";

export function StickyWhatsAppButton() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
                <WhatsAppButton />
            </div>
        </div>
    );
}

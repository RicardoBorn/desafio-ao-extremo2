"use client";

import { useEffect } from 'react';
import { trackVisit } from '@/lib/analytics';

export function useVisitorTracking(page: string) {
    useEffect(() => {
        // Track visit on mount
        trackVisit(page);
    }, [page]);
}

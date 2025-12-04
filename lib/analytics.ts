// Analytics Library - Desafio ao Extremo
// Tracks visitor statistics with geolocation

import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
    Timestamp,
    where
} from 'firebase/firestore';
import { db } from './firebase';

export interface VisitorData {
    id?: string;
    timestamp: Date;
    ip?: string;
    city?: string;
    region?: string;
    country?: string;
    countryCode?: string;
    latitude?: number;
    longitude?: number;
    userAgent?: string;
    page?: string;
}

export interface VisitorStats {
    totalVisits: number;
    uniqueVisitors: number;
    topLocations: Array<{
        city: string;
        country: string;
        count: number;
        percentage: number;
    }>;
}

const COLLECTION_NAME = 'visitors';

// Track a visit with geolocation
export async function trackVisit(page: string = '/'): Promise<void> {
    try {
        // Get geolocation data from ipapi.co (free tier: 1000 requests/day)
        const geoResponse = await fetch('https://ipapi.co/json/');
        const geoData = await geoResponse.json();

        const visitorData: Omit<VisitorData, 'id'> = {
            timestamp: new Date(),
            ip: geoData.ip,
            city: geoData.city,
            region: geoData.region,
            country: geoData.country_name,
            countryCode: geoData.country_code,
            latitude: geoData.latitude,
            longitude: geoData.longitude,
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
            page
        };

        const visitorsRef = collection(db, COLLECTION_NAME);
        await addDoc(visitorsRef, {
            ...visitorData,
            timestamp: Timestamp.now()
        });
    } catch (error) {
        console.error('Error tracking visit:', error);
        // Fallback: track without geolocation
        try {
            const visitorsRef = collection(db, COLLECTION_NAME);
            await addDoc(visitorsRef, {
                timestamp: Timestamp.now(),
                page,
                userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : ''
            });
        } catch (fallbackError) {
            console.error('Error tracking visit (fallback):', fallbackError);
        }
    }
}

// Get visitor statistics
export async function getVisitorStats(): Promise<VisitorStats> {
    try {
        const visitorsRef = collection(db, COLLECTION_NAME);
        const querySnapshot = await getDocs(visitorsRef);

        const visits: VisitorData[] = [];
        const uniqueIPs = new Set<string>();
        const locationCounts = new Map<string, { city: string; country: string; count: number }>();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const visit: VisitorData = {
                id: doc.id,
                timestamp: data.timestamp?.toDate() || new Date(),
                ip: data.ip,
                city: data.city,
                region: data.region,
                country: data.country,
                countryCode: data.countryCode,
                latitude: data.latitude,
                longitude: data.longitude,
                userAgent: data.userAgent,
                page: data.page
            };

            visits.push(visit);

            if (visit.ip) {
                uniqueIPs.add(visit.ip);
            }

            if (visit.city && visit.country) {
                const locationKey = `${visit.city}, ${visit.countryCode || visit.country}`;
                const existing = locationCounts.get(locationKey);
                if (existing) {
                    existing.count++;
                } else {
                    locationCounts.set(locationKey, {
                        city: visit.city,
                        country: visit.countryCode || visit.country,
                        count: 1
                    });
                }
            }
        });

        // Sort locations by count and get top 5
        const topLocations = Array.from(locationCounts.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(loc => ({
                city: loc.city,
                country: loc.country,
                count: loc.count,
                percentage: Math.round((loc.count / visits.length) * 100)
            }));

        return {
            totalVisits: visits.length,
            uniqueVisitors: uniqueIPs.size,
            topLocations
        };
    } catch (error) {
        console.error('Error getting visitor stats:', error);
        return {
            totalVisits: 0,
            uniqueVisitors: 0,
            topLocations: []
        };
    }
}

"use client";

import { useState, useEffect } from "react";
import { getVisitorStats, type VisitorStats } from "@/lib/analytics";

export function VisitorStatsAdmin() {
    const [stats, setStats] = useState<VisitorStats>({
        totalVisits: 0,
        uniqueVisitors: 0,
        topLocations: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            const data = await getVisitorStats();
            setStats(data);
            setIsLoading(false);
        };
        loadStats();

        // Refresh every 30 seconds
        const interval = setInterval(loadStats, 30000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-black/40 border-2 border-blue-500/30 p-6 animate-pulse">
                    <div className="h-4 bg-blue-500/20 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-blue-500/20 rounded w-3/4"></div>
                </div>
                <div className="bg-black/40 border-2 border-blue-500/30 p-6 animate-pulse">
                    <div className="h-4 bg-blue-500/20 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-blue-500/20 rounded w-3/4"></div>
                </div>
                <div className="bg-black/40 border-2 border-blue-500/30 p-6 animate-pulse">
                    <div className="h-4 bg-blue-500/20 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-blue-500/20 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Visits */}
            <div className="bg-black/40 border-2 border-blue-500/30 p-6 hover:border-blue-500/50 transition-colors">
                <h3 className="text-sm font-bold text-zinc-400 uppercase mb-2">📊 Total de Visitas</h3>
                <p className="text-4xl font-black text-blue-500">{stats.totalVisits.toLocaleString()}</p>
            </div>

            {/* Unique Visitors */}
            <div className="bg-black/40 border-2 border-blue-500/30 p-6 hover:border-blue-500/50 transition-colors">
                <h3 className="text-sm font-bold text-zinc-400 uppercase mb-2">👥 Visitantes Únicos</h3>
                <p className="text-4xl font-black text-blue-500">{stats.uniqueVisitors.toLocaleString()}</p>
            </div>

            {/* Top Locations */}
            <div className="bg-black/40 border-2 border-blue-500/30 p-6 hover:border-blue-500/50 transition-colors">
                <h3 className="text-sm font-bold text-zinc-400 uppercase mb-2">🌍 Top Localizações</h3>
                <div className="space-y-1">
                    {stats.topLocations.length > 0 ? (
                        stats.topLocations.slice(0, 3).map((loc, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-white font-medium">{loc.city}, {loc.country}</span>
                                <span className="text-blue-500 font-bold">{loc.percentage}%</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-zinc-500 text-sm">Nenhum dado ainda</p>
                    )}
                </div>
            </div>
        </div>
    );
}

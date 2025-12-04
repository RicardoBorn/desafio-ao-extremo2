"use client";

import { useState, useEffect } from "react";
import { getVisitorStats, type VisitorStats } from "@/lib/analytics";

export function VisitorStatsEvento() {
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
            <div className="w-full bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 md:p-8 mt-8">
                <div className="animate-pulse">
                    <div className="h-6 bg-brand-yellow/20 rounded w-1/3 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="h-20 bg-brand-yellow/10 rounded"></div>
                        <div className="h-20 bg-brand-yellow/10 rounded"></div>
                        <div className="h-20 bg-brand-yellow/10 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 md:p-8 mt-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-brand-yellow uppercase italic tracking-wider">
                    📊 ESTATÍSTICAS DO SITE
                </h3>
                <div className="text-zinc-400 text-sm font-mono">
                    ATUALIZADO AGORA
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Visits */}
                <div className="bg-zinc-800/50 p-6 border-l-4 border-brand-yellow">
                    <h4 className="text-sm font-bold text-zinc-400 uppercase mb-2">📈 Total de Visitas</h4>
                    <p className="text-5xl font-black text-brand-yellow">{stats.totalVisits.toLocaleString()}</p>
                </div>

                {/* Unique Visitors */}
                <div className="bg-zinc-800/50 p-6 border-l-4 border-brand-yellow">
                    <h4 className="text-sm font-bold text-zinc-400 uppercase mb-2">👥 Visitantes Únicos</h4>
                    <p className="text-5xl font-black text-brand-yellow">{stats.uniqueVisitors.toLocaleString()}</p>
                </div>

                {/* Top Locations */}
                <div className="bg-zinc-800/50 p-6 border-l-4 border-brand-yellow">
                    <h4 className="text-sm font-bold text-zinc-400 uppercase mb-2">🌍 Top Localizações</h4>
                    <div className="space-y-2">
                        {stats.topLocations.length > 0 ? (
                            stats.topLocations.slice(0, 3).map((loc, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-white font-medium text-sm">{loc.city}, {loc.country}</span>
                                    <span className="text-brand-yellow font-black text-lg">{loc.percentage}%</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-zinc-500 text-sm">Nenhum dado ainda</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

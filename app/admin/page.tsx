"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Footer } from "@/components/ui/Footer";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { RankingAdmin } from "@/components/admin/RankingAdmin";
import { VisitorStatsAdmin } from "@/components/admin/VisitorStatsAdmin";
import { VideoAdmin } from "@/components/admin/VideoAdmin";
import { LogOut } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                router.push("/login");
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-brand-yellow font-bold animate-pulse">Verificando acesso...</div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">

            <TacticalMapBackground />

            {/* Hero Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-24">
                <div className="relative z-10 flex max-w-7xl flex-col items-center gap-8 w-full">

                    {/* Header with Logout */}
                    <div className="w-full flex justify-end mb-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-2 rounded transition-colors font-bold uppercase text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Sair
                        </button>
                    </div>

                    {/* Título */}
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-blue-500" />
                        <h1 className="text-5xl md:text-7xl font-black tracking-wider text-blue-500 uppercase font-display">
                            PAINEL ADMIN
                        </h1>
                        <div className="h-[2px] w-12 bg-blue-500" />
                    </div>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl text-center">
                        Gerenciamento do Ranking - Desafio ao Extremo
                    </p>

                    {/* Visitor Statistics */}
                    <VisitorStatsAdmin />

                    {/* Ranking Admin Component */}
                    <RankingAdmin />

                    {/* Video Management Component */}
                    <VideoAdmin />

                </div>
            </section>

            <Footer />
        </div>
    );
}

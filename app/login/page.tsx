"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err: any) {
            console.error("Login error:", err);
            if (err.code === 'auth/invalid-credential') {
                setError("Email ou senha incorretos.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Muitas tentativas. Tente novamente mais tarde.");
            } else {
                setError("Erro ao fazer login. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
            <TacticalMapBackground />

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="bg-zinc-900/80 border-2 border-zinc-800 p-8 rounded-xl backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-full mb-4 border border-zinc-700">
                            <Lock className="w-8 h-8 text-brand-yellow" />
                        </div>
                        <h1 className="text-2xl font-black uppercase tracking-wider text-white">
                            Acesso Restrito
                        </h1>
                        <p className="text-zinc-500 text-sm mt-2">
                            Área administrativa do Desafio ao Extremo
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-brand-yellow outline-none font-bold"
                                placeholder="admin@exemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Senha</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-brand-yellow outline-none font-bold"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded text-center font-bold">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-yellow text-black font-black py-4 uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Entrando..." : "Acessar Painel"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

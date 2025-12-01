"use client"

import { useState, useEffect } from "react"
import { Lock, Unlock } from "lucide-react"

interface PasswordGateProps {
    children: React.ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    // Simple client-side persistence
    useEffect(() => {
        const auth = localStorage.getItem("desafio-auth")
        if (auth === "true") {
            setIsAuthenticated(true)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Hardcoded password for simplicity as requested
        if (password.toUpperCase() === "DESAFIO") {
            setIsAuthenticated(true)
            localStorage.setItem("desafio-auth", "true")
            setError(false)
        } else {
            setError(true)
        }
    }

    if (isAuthenticated) {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Área Restrita</h2>
                    <p className="text-zinc-400">
                        Digite a senha para acessar os materiais exclusivos do desafio.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="appearance-none relative block w-full px-3 py-3 border border-zinc-700 placeholder-zinc-500 text-white bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm transition-colors"
                            placeholder="Digite a senha de acesso"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError(false)
                            }}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            Senha incorreta. Tente novamente.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all transform hover:scale-[1.02]"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <Unlock className="h-5 w-5 text-yellow-900 group-hover:text-yellow-800" />
                        </span>
                        Acessar Materiais
                    </button>
                </form>
            </div>
        </div>
    )
}

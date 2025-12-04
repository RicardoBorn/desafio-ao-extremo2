"use client";

import { useState, useEffect } from "react";
import { getVideoSettings, updateVideoSettings, type VideoSettings, DEFAULT_VIDEOS } from "@/lib/videoSettings";

export function VideoAdmin() {
    const [settings, setSettings] = useState<VideoSettings>(DEFAULT_VIDEOS);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getVideoSettings();
            setSettings(data);
        } catch (error) {
            console.error("Error loading settings:", error);
            setMessage({ type: "error", text: "Erro ao carregar configurações." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (key: keyof VideoSettings, field: 'url' | 'title', value: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            await updateVideoSettings(settings);
            setMessage({ type: "success", text: "Vídeos atualizados com sucesso!" });
        } catch (error) {
            console.error("Error saving settings:", error);
            setMessage({ type: "error", text: "Erro ao salvar alterações." });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="text-white p-8">Carregando configurações de vídeo...</div>;

    return (
        <div className="w-full bg-zinc-900/50 border-2 border-brand-yellow/30 p-6 md:p-8 mt-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-brand-yellow uppercase italic tracking-wider">
                    🎬 GERENCIAR VÍDEOS
                </h3>
                {message && (
                    <div className={`px-4 py-2 rounded font-bold ${message.type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {message.text}
                    </div>
                )}
            </div>

            <div className="space-y-8">
                {/* Seção: Página Evento */}
                <div>
                    <h4 className="text-xl font-bold text-white mb-4 border-l-4 border-brand-yellow pl-3">
                        Página /evento (Vídeos da Semana)
                    </h4>

                    <div className="grid gap-6">
                        {/* Vídeo Principal */}
                        <div className="bg-black/40 p-4 rounded border border-zinc-800">
                            <h5 className="text-brand-yellow font-bold mb-3">Vídeo Principal (Grande)</h5>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-xs text-zinc-400 mb-1">Link do YouTube</label>
                                    <input
                                        type="text"
                                        value={settings.weekly_main.url}
                                        onChange={(e) => handleChange('weekly_main', 'url', e.target.value)}
                                        className="w-full bg-zinc-800 border border-zinc-700 p-2 text-white rounded focus:border-brand-yellow outline-none"
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-zinc-400 mb-1">Título (Opcional)</label>
                                    <input
                                        type="text"
                                        value={settings.weekly_main.title}
                                        onChange={(e) => handleChange('weekly_main', 'title', e.target.value)}
                                        className="w-full bg-zinc-800 border border-zinc-700 p-2 text-white rounded focus:border-brand-yellow outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vídeos Menores */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {['weekly_1', 'weekly_2', 'weekly_3', 'weekly_4'].map((key, index) => (
                                <div key={key} className="bg-black/40 p-4 rounded border border-zinc-800">
                                    <h5 className="text-zinc-300 font-bold mb-3">Vídeo Menor #{index + 1}</h5>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1">Link do YouTube</label>
                                            <input
                                                type="text"
                                                value={settings[key as keyof VideoSettings].url}
                                                onChange={(e) => handleChange(key as keyof VideoSettings, 'url', e.target.value)}
                                                className="w-full bg-zinc-800 border border-zinc-700 p-2 text-white rounded focus:border-brand-yellow outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-zinc-400 mb-1">Título</label>
                                            <input
                                                type="text"
                                                value={settings[key as keyof VideoSettings].title}
                                                onChange={(e) => handleChange(key as keyof VideoSettings, 'title', e.target.value)}
                                                className="w-full bg-zinc-800 border border-zinc-700 p-2 text-white rounded focus:border-brand-yellow outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Seção: Página Desafio */}
                <div>
                    <h4 className="text-xl font-bold text-white mb-4 border-l-4 border-brand-yellow pl-3">
                        Página /desafioaoextremo (Trailer)
                    </h4>

                    <div className="bg-black/40 p-4 rounded border border-zinc-800">
                        <h5 className="text-brand-yellow font-bold mb-3">Vídeo Principal</h5>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1">Link do YouTube</label>
                                <input
                                    type="text"
                                    value={settings.desafio_main.url}
                                    onChange={(e) => handleChange('desafio_main', 'url', e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 p-2 text-white rounded focus:border-brand-yellow outline-none"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={settings.desafio_main.title}
                                    onChange={(e) => handleChange('desafio_main', 'title', e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 p-2 text-white rounded focus:border-brand-yellow outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end pt-4 border-t border-zinc-800">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-3 bg-brand-yellow text-black font-black uppercase tracking-wider hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>
        </div>
    );
}

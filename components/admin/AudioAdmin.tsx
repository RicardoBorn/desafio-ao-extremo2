"use client";

import { useState } from "react";
import Image from "next/image";

interface AudioTrack {
    title: string;
    duration: string;
    audioUrl: string;
    albumArtUrl: string;
}

export function AudioAdmin() {
    const [tracks, setTracks] = useState<AudioTrack[]>([]);

    const addNewTrack = () => {
        setTracks([...tracks, {
            title: "",
            duration: "03:00",
            audioUrl: "",
            albumArtUrl: ""
        }]);
    };

    const updateTrack = (index: number, field: keyof AudioTrack, value: string) => {
        const newTracks = [...tracks];
        newTracks[index] = { ...newTracks[index], [field]: value };
        setTracks(newTracks);
    };

    const removeTrack = (index: number) => {
        setTracks(tracks.filter((_, i) => i !== index));
    };

    const copyCode = () => {
        const validTracks = tracks.filter(t => t.title && t.audioUrl);

        if (validTracks.length === 0) {
            alert('❌ Adicione pelo menos uma música com título e URL de áudio!');
            return;
        }

        const code = validTracks.map((track, index) => {
            return `    {
        id: "${index + 1}",
        title: "${track.title}",
        duration: "${track.duration}",
        url: "${track.audioUrl}"${track.albumArtUrl ? `,
        albumArt: "${track.albumArtUrl}"` : ''}
    }`;
        }).join(',\n');

        const fullCode = `const tracks: Track[] = [\n${code}\n];`;

        navigator.clipboard.writeText(fullCode);
        alert('✅ Código copiado! Cole em app/evento/page.tsx na linha 18');
    };

    return (
        <div className="w-full max-w-6xl bg-zinc-900/50 border-2 border-blue-500/30 p-8">
            <div className="mb-6">
                <h2 className="text-3xl font-black text-blue-500 mb-4">🎵 GERENCIAR MÚSICAS</h2>
                <p className="text-zinc-400">
                    Cole as URLs diretas dos arquivos de áudio e imagens (Google Drive, Dropbox, etc.)
                </p>
            </div>

            {/* Tracks List */}
            <div className="space-y-6 mb-6">
                {tracks.map((track, index) => (
                    <div
                        key={index}
                        className="bg-zinc-800 border-2 border-zinc-700 p-6"
                    >
                        <div className="grid grid-cols-1 gap-4">
                            {/* Title */}
                            <div>
                                <label className="block text-white font-bold mb-2">
                                    Nome da Música *
                                </label>
                                <input
                                    type="text"
                                    value={track.title}
                                    onChange={(e) => updateTrack(index, 'title', e.target.value)}
                                    placeholder="Ex: A Vitória é o Destino Verdadeiro"
                                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-white font-bold mb-2">
                                    Duração
                                </label>
                                <input
                                    type="text"
                                    value={track.duration}
                                    onChange={(e) => updateTrack(index, 'duration', e.target.value)}
                                    placeholder="Ex: 03:00"
                                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Audio URL */}
                            <div>
                                <label className="block text-white font-bold mb-2">
                                    URL do Áudio (MP3) *
                                </label>
                                <input
                                    type="url"
                                    value={track.audioUrl}
                                    onChange={(e) => updateTrack(index, 'audioUrl', e.target.value)}
                                    placeholder="https://drive.google.com/uc?export=download&id=..."
                                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 focus:border-blue-500 focus:outline-none font-mono text-sm"
                                />
                                <p className="text-zinc-500 text-xs mt-1">
                                    💡 Google Drive: Compartilhar → Qualquer pessoa com o link → Copiar link de download direto
                                </p>
                            </div>

                            {/* Album Art URL */}
                            <div>
                                <label className="block text-white font-bold mb-2">
                                    URL da Imagem (opcional)
                                </label>
                                <input
                                    type="url"
                                    value={track.albumArtUrl}
                                    onChange={(e) => updateTrack(index, 'albumArtUrl', e.target.value)}
                                    placeholder="https://i.imgur.com/..."
                                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 focus:border-blue-500 focus:outline-none font-mono text-sm"
                                />

                                {/* Preview */}
                                {track.albumArtUrl && (
                                    <div className="mt-3 flex items-center gap-4">
                                        <div className="relative w-24 h-24 border-2 border-blue-500 bg-zinc-900">
                                            <Image
                                                src={track.albumArtUrl}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="text-zinc-400 text-sm">
                                            <p>✅ Preview da imagem</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Remove Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => removeTrack(index)}
                                    className="text-red-500 hover:text-red-400 font-bold"
                                >
                                    🗑️ Remover
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="space-y-4">
                {/* Add Button */}
                <button
                    onClick={addNewTrack}
                    className="w-full bg-white text-black px-6 py-3 font-bold hover:bg-zinc-200 transition-colors"
                >
                    + ADICIONAR MÚSICA
                </button>

                {/* Copy Button */}
                {tracks.length > 0 && (
                    <button
                        onClick={copyCode}
                        className="w-full bg-green-500 text-white px-8 py-4 font-black text-xl hover:bg-green-400 transition-colors"
                    >
                        📋 COPIAR CÓDIGO
                    </button>
                )}
            </div>

            {tracks.length === 0 && (
                <div className="text-center py-12 text-zinc-500">
                    <p className="text-xl">Nenhuma música adicionada ainda.</p>
                    <p className="text-sm mt-2">Clique em &quot;ADICIONAR MÚSICA&quot; para começar.</p>
                </div>
            )}
        </div>
    );
}

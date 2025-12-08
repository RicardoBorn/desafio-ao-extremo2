"use client";

import { useState } from "react";
import { uploadAudioFile } from "@/lib/blobStorage";
import Image from "next/image";

interface AudioTrack {
    title: string;
    duration: string;
    audioFile: File | null;
    albumArtFile: File | null;
    albumArtPreview: string | null;
    status: 'idle' | 'uploading' | 'success' | 'error';
    url?: string;
    albumArtUrl?: string;
}

export function AudioAdmin() {
    const [tracks, setTracks] = useState<AudioTrack[]>([]);
    const [uploading, setUploading] = useState(false);

    const addNewTrack = () => {
        setTracks([...tracks, {
            title: "",
            duration: "03:00",
            audioFile: null,
            albumArtFile: null,
            albumArtPreview: null,
            status: 'idle'
        }]);
    };

    const updateTrack = (index: number, field: keyof AudioTrack, value: string | File | null | 'idle' | 'uploading' | 'success' | 'error') => {
        const newTracks = [...tracks];
        newTracks[index] = { ...newTracks[index], [field]: value };
        setTracks(newTracks);
    };

    const handleAudioFileChange = (index: number, file: File | null) => {
        if (file) {
            // Auto-fill title from filename if empty
            const newTracks = [...tracks];
            if (!newTracks[index].title) {
                const title = file.name.replace(/\.(mp3|wav|ogg)$/i, '');
                newTracks[index].title = title;
            }
            newTracks[index].audioFile = file;
            setTracks(newTracks);
        }
    };

    const handleAlbumArtChange = (index: number, file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newTracks = [...tracks];
                newTracks[index].albumArtFile = file;
                newTracks[index].albumArtPreview = reader.result as string;
                setTracks(newTracks);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeTrack = (index: number) => {
        setTracks(tracks.filter((_, i) => i !== index));
    };

    const uploadAllTracks = async () => {
        setUploading(true);

        for (let i = 0; i < tracks.length; i++) {
            const track = tracks[i];

            if (!track.audioFile || !track.title) {
                updateTrack(i, 'status', 'error');
                continue;
            }

            updateTrack(i, 'status', 'uploading');

            try {
                const result = await uploadAudioFile(
                    track.audioFile,
                    track.title,
                    track.duration,
                    track.albumArtFile || undefined
                );

                const newTracks = [...tracks];
                newTracks[i].status = 'success';
                newTracks[i].url = result.url;
                newTracks[i].albumArtUrl = result.albumArt;
                setTracks(newTracks);
            } catch (error) {
                console.error('Upload error:', error);
                updateTrack(i, 'status', 'error');
            }
        }

        setUploading(false);
    };

    const copyCode = () => {
        const successTracks = tracks.filter(t => t.status === 'success');

        const code = successTracks.map((track, index) => {
            return `    {
        id: "${index + 1}",
        title: "${track.title}",
        duration: "${track.duration}",
        url: "${track.url}"${track.albumArtUrl ? `,
        albumArt: "${track.albumArtUrl}"` : ''}
    }`;
        }).join(',\n');

        const fullCode = `const tracks: Track[] = [\n${code}\n];`;

        navigator.clipboard.writeText(fullCode);
        alert('✅ Código copiado para a área de transferência!');
    };

    return (
        <div className="w-full max-w-6xl bg-zinc-900/50 border-2 border-blue-500/30 p-8">
            <div className="mb-6">
                <h2 className="text-3xl font-black text-blue-500 mb-4">🎵 GERENCIAR MÚSICAS</h2>
            </div>

            {/* Tracks List */}
            <div className="space-y-6 mb-6">
                {tracks.map((track, index) => (
                    <div
                        key={index}
                        className={`bg-zinc-800 border-2 p-6 ${track.status === 'success'
                            ? 'border-green-500/50'
                            : track.status === 'error'
                                ? 'border-red-500/50'
                                : track.status === 'uploading'
                                    ? 'border-yellow-500/50'
                                    : 'border-zinc-700'
                            }`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
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
                                        disabled={track.status === 'uploading' || track.status === 'success'}
                                    />
                                </div>



                                {/* Audio File */}
                                <div>
                                    <label className="block text-white font-bold mb-2">
                                        Arquivo de Áudio (MP3) *
                                    </label>
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) => handleAudioFileChange(index, e.target.files?.[0] || null)}
                                        className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 cursor-pointer hover:bg-zinc-800 transition-colors"
                                        disabled={track.status === 'uploading' || track.status === 'success'}
                                    />
                                    {track.audioFile && (
                                        <p className="text-zinc-400 text-sm mt-1">
                                            📁 {track.audioFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {/* Album Art */}
                                <div>
                                    <label className="block text-white font-bold mb-2">
                                        Imagem da Música (100x100)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleAlbumArtChange(index, e.target.files?.[0] || null)}
                                        className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 cursor-pointer hover:bg-zinc-800 transition-colors mb-3"
                                        disabled={track.status === 'uploading' || track.status === 'success'}
                                    />

                                    {/* Preview */}
                                    {track.albumArtPreview && (
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-24 h-24 border-2 border-blue-500">
                                                <Image
                                                    src={track.albumArtPreview}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="text-zinc-400 text-sm">
                                                <p>✅ Imagem carregada</p>
                                                <p className="text-xs">Será redimensionada para 100x100</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        {track.status === 'idle' && (
                                            <span className="text-zinc-500">⏸️ Aguardando upload</span>
                                        )}
                                        {track.status === 'uploading' && (
                                            <span className="text-yellow-500 font-bold">⏳ Fazendo upload...</span>
                                        )}
                                        {track.status === 'success' && (
                                            <span className="text-green-500 font-bold">✅ Upload concluído!</span>
                                        )}
                                        {track.status === 'error' && (
                                            <span className="text-red-500 font-bold">❌ Erro no upload</span>
                                        )}
                                    </div>

                                    {track.status !== 'uploading' && track.status !== 'success' && (
                                        <button
                                            onClick={() => removeTrack(index)}
                                            className="text-red-500 hover:text-red-400 font-bold"
                                        >
                                            🗑️ Remover
                                        </button>
                                    )}
                                </div>
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

                {/* Upload and Copy Buttons */}
                {tracks.length > 0 && (
                    <div className="flex gap-4">
                        <button
                            onClick={uploadAllTracks}
                            disabled={uploading || tracks.every(t => t.status === 'success')}
                            className="flex-1 bg-blue-500 text-white px-8 py-4 font-black text-xl hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? '⏳ FAZENDO UPLOAD...' : '🚀 FAZER UPLOAD DE TODAS'}
                        </button>

                        {tracks.some(t => t.status === 'success') && (
                            <button
                                onClick={copyCode}
                                className="bg-green-500 text-white px-8 py-4 font-black text-xl hover:bg-green-400 transition-colors"
                            >
                                📋 COPIAR CÓDIGO
                            </button>
                        )}
                    </div>
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

"use client";

import { useState } from "react";
import { uploadAudioFile } from "@/lib/audioStorage";
import { Header } from "@/components/ui/Header";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";

interface UploadedTrack {
    title: string;
    duration: string;
    url: string;
    status: 'uploading' | 'success' | 'error';
}

export default function AudioAdminPage() {
    const [uploading, setUploading] = useState(false);
    const [uploadedTracks, setUploadedTracks] = useState<UploadedTrack[]>([]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const title = file.name.replace(/\.(mp3|wav|ogg)$/i, '');

            // Add to list with uploading status
            const newTrack: UploadedTrack = {
                title,
                duration: "03:00", // Default duration, can be edited later
                url: "",
                status: 'uploading'
            };
            setUploadedTracks(prev => [...prev, newTrack]);

            try {
                const result = await uploadAudioFile(file, title, "03:00");

                // Update status to success
                setUploadedTracks(prev =>
                    prev.map(track =>
                        track.title === title && track.status === 'uploading'
                            ? { ...track, url: result.url, status: 'success' }
                            : track
                    )
                );
            } catch (error) {
                console.error('Upload error:', error);

                // Update status to error
                setUploadedTracks(prev =>
                    prev.map(track =>
                        track.title === title && track.status === 'uploading'
                            ? { ...track, status: 'error' }
                            : track
                    )
                );
            }
        }

        setUploading(false);
    };

    const copyAllURLs = () => {
        const urls = uploadedTracks
            .filter(track => track.status === 'success')
            .map(track => `    {
        id: "${Date.now()}",
        title: "${track.title}",
        duration: "${track.duration}",
        url: "${track.url}"
    }`)
            .join(',\n');

        const fullCode = `const tracks: Track[] = [\n${urls}\n];`;

        navigator.clipboard.writeText(fullCode);
        alert('Código copiado para a área de transferência!');
    };

    return (
        <>
            <div className="min-h-screen bg-brand-dark text-white">
                <Header />
                <TacticalMapBackground />

                <div className="relative z-10 container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-black text-brand-yellow mb-4">
                                UPLOAD DE MÚSICAS
                            </h1>
                            <p className="text-zinc-400 text-lg">
                                Faça upload dos arquivos MP3 para o Firebase Storage
                            </p>
                        </div>

                        {/* Upload Section */}
                        <div className="bg-zinc-900 border-2 border-brand-yellow/30 p-8 mb-8">
                            <div className="mb-6">
                                <label className="block text-xl font-bold text-white mb-4">
                                    📁 Selecione os arquivos de áudio
                                </label>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    multiple
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                    className="block w-full text-white bg-zinc-800 border border-zinc-700 rounded p-3 cursor-pointer hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <p className="text-zinc-500 text-sm mt-2">
                                    Formatos aceitos: MP3, WAV, OGG. Você pode selecionar múltiplos arquivos.
                                </p>
                            </div>

                            {uploading && (
                                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded">
                                    <p className="text-yellow-500 font-bold">
                                        ⏳ Fazendo upload dos arquivos...
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Uploaded Tracks List */}
                        {uploadedTracks.length > 0 && (
                            <div className="bg-zinc-900 border-2 border-brand-yellow/30 p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">
                                        Arquivos Processados ({uploadedTracks.length})
                                    </h2>
                                    {uploadedTracks.some(t => t.status === 'success') && (
                                        <button
                                            onClick={copyAllURLs}
                                            className="bg-brand-yellow text-black px-6 py-2 font-bold hover:bg-yellow-400 transition-colors"
                                        >
                                            📋 COPIAR CÓDIGO
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {uploadedTracks.map((track, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 border-2 ${track.status === 'success'
                                                    ? 'bg-green-500/10 border-green-500/30'
                                                    : track.status === 'error'
                                                        ? 'bg-red-500/10 border-red-500/30'
                                                        : 'bg-yellow-500/10 border-yellow-500/30'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="font-bold text-white mb-1">
                                                        {track.title}
                                                    </p>
                                                    {track.status === 'success' && (
                                                        <p className="text-xs text-zinc-400 font-mono break-all">
                                                            {track.url}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    {track.status === 'uploading' && (
                                                        <span className="text-yellow-500 font-bold">⏳</span>
                                                    )}
                                                    {track.status === 'success' && (
                                                        <span className="text-green-500 font-bold">✅</span>
                                                    )}
                                                    {track.status === 'error' && (
                                                        <span className="text-red-500 font-bold">❌</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="mt-8 bg-zinc-900/50 border border-zinc-800 p-6">
                            <h3 className="text-xl font-bold text-brand-yellow mb-4">
                                📝 Instruções
                            </h3>
                            <ol className="space-y-2 text-zinc-300">
                                <li>1. Baixe as músicas do Google Drive para seu computador</li>
                                <li>2. Clique em "Selecione os arquivos de áudio" e escolha todos os MP3</li>
                                <li>3. Aguarde o upload completar (pode demorar alguns minutos)</li>
                                <li>4. Clique em "COPIAR CÓDIGO" para copiar as URLs</li>
                                <li>5. Cole o código no arquivo <code className="bg-zinc-800 px-2 py-1">app/evento/page.tsx</code></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

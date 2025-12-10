"use client";

import { useState } from "react";

export default function UploadVideoPage() {
    const [uploading, setUploading] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/upload-video', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.url) {
                setVideoUrl(data.url);
                alert(`Vídeo enviado com sucesso!\n\nURL: ${data.url}\n\nCopie esta URL e cole no código da página /desafio`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Erro ao fazer upload do vídeo');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-brand-yellow">Upload de Vídeo para Vercel Blob</h1>

                <form onSubmit={handleUpload} className="space-y-6">
                    <div>
                        <label className="block text-lg mb-2">Selecione o vídeo:</label>
                        <input
                            type="file"
                            name="file"
                            accept="video/*"
                            required
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-brand-yellow text-black font-bold py-4 px-6 rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Enviando...' : 'Fazer Upload'}
                    </button>
                </form>

                {videoUrl && (
                    <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded">
                        <h2 className="text-xl font-bold mb-4 text-brand-yellow">URL do Vídeo:</h2>
                        <code className="block p-4 bg-black rounded text-sm break-all">
                            {videoUrl}
                        </code>
                        <button
                            onClick={() => navigator.clipboard.writeText(videoUrl)}
                            className="mt-4 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded"
                        >
                            Copiar URL
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

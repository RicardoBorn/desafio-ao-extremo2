"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    getParticipants,
    addParticipant,
    updateParticipant,
    deleteParticipant,
    canAddParticipant,
    type Participant,
} from "@/lib/rankingStorage";

interface FormData {
    name: string;
    channel: string;
    score: number;
    imageUrl: string;
}

export function RankingAdmin() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        channel: "",
        score: 0,
        imageUrl: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const loadParticipants = async () => {
        const data = await getParticipants();
        setParticipants(data);
    };

    // Load participants on mount
    useEffect(() => {
        // eslint-disable-next-line
        loadParticipants();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.channel || !formData.imageUrl) {
            setMessage({ type: "error", text: "Preencha todos os campos!" });
            return;
        }

        if (formData.score < 0) {
            setMessage({ type: "error", text: "Pontuação não pode ser negativa!" });
            return;
        }

        let result;
        if (editingId) {
            // Update existing
            result = await updateParticipant(editingId, formData);
        } else {
            // Add new
            const canAdd = await canAddParticipant();
            if (!canAdd) {
                setMessage({ type: "error", text: "Limite de 40 participantes atingido!" });
                return;
            }
            result = await addParticipant(formData);
        }

        setMessage({ type: result.success ? "success" : "error", text: result.message });

        if (result.success) {
            resetForm();
            await loadParticipants();
        }
    };

    const handleEdit = (participant: Participant) => {
        setFormData({
            name: participant.name,
            channel: participant.channel,
            score: participant.score,
            imageUrl: participant.imageUrl,
        });
        setEditingId(participant.id);
        setMessage(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir este participante?")) {
            const result = await deleteParticipant(id);
            setMessage({ type: result.success ? "success" : "error", text: result.message });
            await loadParticipants();
        }
    };

    const resetForm = () => {
        setFormData({ name: "", channel: "", score: 0, imageUrl: "" });
        setEditingId(null);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="border-2 border-blue-500/30 p-6 bg-black/40">
                    <h3 className="text-2xl font-bold text-blue-500 mb-6">
                        {editingId ? "✏️ Editar Participante" : "➕ Adicionar Participante"}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-zinc-300 mb-2">Nome *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 focus:outline-none"
                                placeholder="Ex: Ricardo Born"
                            />
                        </div>

                        {/* Channel */}
                        <div>
                            <label className="block text-sm font-bold text-zinc-300 mb-2">Canal (YouTube) *</label>
                            <input
                                type="text"
                                value={formData.channel}
                                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 focus:outline-none"
                                placeholder="Ex: Born ao Extremo"
                            />
                        </div>

                        {/* Score */}
                        <div>
                            <label className="block text-sm font-bold text-zinc-300 mb-2">Pontuação *</label>
                            <input
                                type="number"
                                value={formData.score}
                                onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 focus:outline-none"
                                placeholder="Ex: 42"
                                min="0"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-bold text-zinc-300 mb-2">Imagem do Participante *</label>

                            <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-700 mb-3">
                                <p className="text-xs text-zinc-400 mb-3">
                                    Para adicionar uma imagem:
                                    <br />1. Clique no botão abaixo para abrir o PostImages
                                    <br />2. Faça upload da imagem
                                    <br />3. Copie o &quot;Link direto&quot; (Direct link)
                                    <br />4. Cole no campo abaixo
                                </p>
                                <a
                                    href="https://postimages.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold py-2 px-3 rounded transition-colors"
                                >
                                    📤 Fazer Upload de Imagem (PostImages)
                                </a>
                            </div>

                            <input
                                type="text"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 focus:outline-none"
                                placeholder="Cole o Link Direto aqui (ex: https://i.postimg.cc/...)"
                            />
                            {formData.imageUrl && (
                                <div className="mt-2 relative w-20 h-20 border border-zinc-700">
                                    <Image
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                        onError={() => setMessage({ type: "error", text: "Erro ao carregar imagem. Verifique se é um link direto." })}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 transition-colors"
                            >
                                {editingId ? "💾 Salvar Alterações" : "➕ Adicionar"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 transition-colors"
                                >
                                    ❌ Cancelar
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Message */}
                    {message && (
                        <div
                            className={`mt-4 p-3 ${message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                } border ${message.type === "success" ? "border-green-500/50" : "border-red-500/50"}`}
                        >
                            {message.text}
                        </div>
                    )}
                </div>

                {/* List Section */}
                <div className="border-2 border-blue-500/30 p-6 bg-black/40">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-blue-500">📊 Participantes ({participants.length}/40)</h3>
                        <button
                            onClick={loadParticipants}
                            className="text-sm bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 transition-colors"
                        >
                            🔄 Atualizar
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {participants.length === 0 ? (
                            <p className="text-zinc-500 text-center py-8">Nenhum participante cadastrado</p>
                        ) : (
                            participants.map((participant, index) => (
                                <div
                                    key={participant.id}
                                    className="flex items-center justify-between bg-zinc-800/50 p-3 border border-zinc-700 hover:border-blue-500/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="bg-brand-yellow text-black font-bold w-8 h-8 flex items-center justify-center text-sm">
                                            {index + 1}º
                                        </div>
                                        <div className="relative w-12 h-12 border border-zinc-600">
                                            <Image src={participant.imageUrl} alt={participant.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-white text-sm">{participant.name}</div>
                                            <div className="text-zinc-500 text-xs">{participant.channel}</div>
                                        </div>
                                        <div className="bg-brand-yellow/20 text-brand-yellow font-black px-3 py-1 text-lg">
                                            {participant.score}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-3">
                                        <button
                                            onClick={() => handleEdit(participant)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm transition-colors"
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(participant.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm transition-colors"
                                            title="Excluir"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Ranking Storage Library - Desafio ao Extremo
// Manages participant data with localStorage persistence

export interface Participant {
    id: string;
    name: string;
    channel: string;
    score: number;
    imageUrl: string;
}

const STORAGE_KEY = 'desafio-ranking-data';
const MAX_PARTICIPANTS = 40;

// Initialize with default data (current top 3)
const DEFAULT_PARTICIPANTS: Participant[] = [];

// Get all participants sorted by score (highest first)
export function getParticipants(): Participant[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Initialize with default data on first load
            initializeDefaultData();
            return DEFAULT_PARTICIPANTS;
        }

        const participants: Participant[] = JSON.parse(stored);
        return participants.sort((a, b) => b.score - a.score);
    } catch (error) {
        console.error('Error loading participants:', error);
        return [];
    }
}

// Add new participant
export function addParticipant(participant: Omit<Participant, 'id'>): { success: boolean; message: string } {
    try {
        const participants = getParticipants();

        if (participants.length >= MAX_PARTICIPANTS) {
            return { success: false, message: `Limite de ${MAX_PARTICIPANTS} participantes atingido!` };
        }

        const newParticipant: Participant = {
            ...participant,
            id: Date.now().toString()
        };

        participants.push(newParticipant);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));

        return { success: true, message: 'Participante adicionado com sucesso!' };
    } catch (error) {
        console.error('Error adding participant:', error);
        return { success: false, message: 'Erro ao adicionar participante.' };
    }
}

// Update existing participant
export function updateParticipant(id: string, updatedData: Omit<Participant, 'id'>): { success: boolean; message: string } {
    try {
        const participants = getParticipants();
        const index = participants.findIndex(p => p.id === id);

        if (index === -1) {
            return { success: false, message: 'Participante não encontrado.' };
        }

        participants[index] = { ...updatedData, id };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));

        return { success: true, message: 'Participante atualizado com sucesso!' };
    } catch (error) {
        console.error('Error updating participant:', error);
        return { success: false, message: 'Erro ao atualizar participante.' };
    }
}

// Delete participant
export function deleteParticipant(id: string): { success: boolean; message: string } {
    try {
        const participants = getParticipants();
        const filtered = participants.filter(p => p.id !== id);

        if (filtered.length === participants.length) {
            return { success: false, message: 'Participante não encontrado.' };
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return { success: true, message: 'Participante removido com sucesso!' };
    } catch (error) {
        console.error('Error deleting participant:', error);
        return { success: false, message: 'Erro ao remover participante.' };
    }
}

// Initialize with default data
export function initializeDefaultData(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PARTICIPANTS));
}

// Get participant count
export function getParticipantCount(): number {
    return getParticipants().length;
}

// Check if can add more participants
export function canAddParticipant(): boolean {
    return getParticipantCount() < MAX_PARTICIPANTS;
}

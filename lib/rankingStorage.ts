// Ranking Storage Library - Desafio ao Extremo
// Manages participant data with Firestore persistence

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface Participant {
    id: string;
    name: string;
    channel: string;
    score: number;
    imageUrl: string;
    createdAt?: Date;
}

const COLLECTION_NAME = 'participants';
const MAX_PARTICIPANTS = 40;

// Get all participants sorted by score (highest first)
export async function getParticipants(): Promise<Participant[]> {
    try {
        const participantsRef = collection(db, COLLECTION_NAME);
        const q = query(participantsRef, orderBy('score', 'desc'));
        const querySnapshot = await getDocs(q);

        const participants: Participant[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            participants.push({
                id: doc.id,
                name: data.name,
                channel: data.channel,
                score: data.score,
                imageUrl: data.imageUrl,
                createdAt: data.createdAt?.toDate()
            });
        });

        return participants;
    } catch (error) {
        console.error('Error loading participants from Firestore:', error);
        return [];
    }
}

// Add new participant
export async function addParticipant(participant: Omit<Participant, 'id'>): Promise<{ success: boolean; message: string }> {
    try {
        const participants = await getParticipants();

        if (participants.length >= MAX_PARTICIPANTS) {
            return { success: false, message: `Limite de ${MAX_PARTICIPANTS} participantes atingido!` };
        }

        const participantsRef = collection(db, COLLECTION_NAME);
        await addDoc(participantsRef, {
            ...participant,
            createdAt: Timestamp.now()
        });

        return { success: true, message: 'Participante adicionado com sucesso!' };
    } catch (error: any) {
        console.error('Error adding participant to Firestore:', error);
        return { success: false, message: `Erro ao adicionar: ${error.message || 'Erro desconhecido'}` };
    }
}

// Update existing participant
export async function updateParticipant(id: string, updatedData: Omit<Participant, 'id'>): Promise<{ success: boolean; message: string }> {
    try {
        const participantRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(participantRef, {
            name: updatedData.name,
            channel: updatedData.channel,
            score: updatedData.score,
            imageUrl: updatedData.imageUrl
        });

        return { success: true, message: 'Participante atualizado com sucesso!' };
    } catch (error: any) {
        console.error('Error updating participant in Firestore:', error);
        return { success: false, message: `Erro ao atualizar: ${error.message || 'Erro desconhecido'}` };
    }
}

// Delete participant
export async function deleteParticipant(id: string): Promise<{ success: boolean; message: string }> {
    try {
        const participantRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(participantRef);

        return { success: true, message: 'Participante removido com sucesso!' };
    } catch (error: any) {
        console.error('Error deleting participant from Firestore:', error);
        return { success: false, message: `Erro ao remover: ${error.message || 'Erro desconhecido'}` };
    }
}

// Get participant count
export async function getParticipantCount(): Promise<number> {
    const participants = await getParticipants();
    return participants.length;
}

// Check if can add more participants
export async function canAddParticipant(): Promise<boolean> {
    const count = await getParticipantCount();
    return count < MAX_PARTICIPANTS;
}

import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface Bet {
    id?: string;
    participantId: string;
    participantName: string;
    userName: string;
    predictedScore: number;
    timestamp: Date;
}

export interface ParticipantStats {
    totalBets: number;
    averageScore: number;
}

const COLLECTION_NAME = 'bets';

export async function placeBet(bet: Omit<Bet, 'id' | 'timestamp'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...bet,
            timestamp: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error placing bet:', error);
        throw error;
    }
}

export async function getParticipantStats(participantId: string): Promise<ParticipantStats> {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("participantId", "==", participantId));
        const querySnapshot = await getDocs(q);

        let totalScore = 0;
        const totalBets = querySnapshot.size;

        if (totalBets === 0) {
            return { totalBets: 0, averageScore: 0 };
        }

        querySnapshot.forEach((doc) => {
            totalScore += doc.data().predictedScore;
        });

        return {
            totalBets,
            averageScore: Math.round(totalScore / totalBets)
        };
    } catch (error) {
        console.error('Error getting stats:', error);
        return { totalBets: 0, averageScore: 0 };
    }
}

export async function getAllBets(): Promise<Bet[]> {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate()
        })) as Bet[];
    } catch (error) {
        console.error('Error getting all bets:', error);
        return [];
    }
}

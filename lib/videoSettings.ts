import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface VideoSetting {
    url: string;
    title: string;
}

export interface VideoSettings {
    weekly_main: VideoSetting;
    weekly_1: VideoSetting;
    weekly_2: VideoSetting;
    weekly_3: VideoSetting;
    weekly_4: VideoSetting;
    desafio_main: VideoSetting;
}

const SETTINGS_COLLECTION = 'site_settings';
const VIDEOS_DOC = 'videos';

export const DEFAULT_VIDEOS: VideoSettings = {
    weekly_main: { url: 'https://www.youtube.com/watch?v=f76ydcJxBKg', title: 'VÍDEOS DA SEMANA' },
    weekly_1: { url: 'https://www.youtube.com/watch?v=f76ydcJxBKg', title: 'Desafio da Semana #1 - João Silva' },
    weekly_2: { url: 'https://www.youtube.com/watch?v=f76ydcJxBKg', title: 'Superação Extrema - Maria Santos' },
    weekly_3: { url: 'https://www.youtube.com/watch?v=f76ydcJxBKg', title: 'Treinamento Tático - Pedro Costa' },
    weekly_4: { url: 'https://www.youtube.com/watch?v=f76ydcJxBKg', title: 'Sobrevivência na Selva - Ana Lima' },
    desafio_main: { url: 'https://www.youtube.com/watch?v=f76ydcJxBKg', title: 'Trailer Oficial' }
};

export async function getVideoSettings(): Promise<VideoSettings> {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, VIDEOS_DOC);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { ...DEFAULT_VIDEOS, ...docSnap.data() } as VideoSettings;
        } else {
            // Initialize with defaults if not exists
            await setDoc(docRef, DEFAULT_VIDEOS);
            return DEFAULT_VIDEOS;
        }
    } catch (error) {
        console.error('Error fetching video settings:', error);
        return DEFAULT_VIDEOS;
    }
}

export async function updateVideoSettings(settings: VideoSettings): Promise<void> {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, VIDEOS_DOC);
        await setDoc(docRef, settings);
    } catch (error) {
        console.error('Error updating video settings:', error);
        throw error;
    }
}

export function extractVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
}

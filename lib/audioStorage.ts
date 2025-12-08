// Audio Storage Management with Firebase Storage
// This module handles uploading and retrieving audio files from Firebase Storage

import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import app from './firebase';

// Initialize Firebase Storage
const storage = getStorage(app);

export interface AudioFile {
    id: string;
    title: string;
    duration: string;
    url: string;
    fileName: string;
    albumArt?: string; // URL da imagem do álbum
}

/**
 * Upload an album art image to Firebase Storage
 * @param file - The image file to upload
 * @returns Promise with the uploaded image URL
 */
export async function uploadAlbumArt(file: File): Promise<string> {
    try {
        // Create a reference to the file location
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `audio/album-art/${fileName}`);

        // Upload the file
        console.log('Uploading album art:', fileName);
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const url = await getDownloadURL(snapshot.ref);

        console.log('Album art uploaded successfully:', url);
        return url;
    } catch (error) {
        console.error('Error uploading album art:', error);
        throw error;
    }
}

/**
 * Upload an audio file to Firebase Storage
 * @param file - The audio file to upload
 * @param title - The title of the track
 * @param duration - The duration of the track (e.g., "03:00")
 * @param albumArtFile - Optional album art image file
 * @returns Promise with the uploaded file info
 */
export async function uploadAudioFile(
    file: File,
    title: string,
    duration: string,
    albumArtFile?: File
): Promise<AudioFile> {
    try {
        // Upload album art if provided
        let albumArtUrl: string | undefined;
        if (albumArtFile) {
            albumArtUrl = await uploadAlbumArt(albumArtFile);
        }

        // Create a reference to the audio file location
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `audio/${fileName}`);

        // Upload the audio file
        console.log('Uploading audio file:', fileName);
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const url = await getDownloadURL(snapshot.ref);

        console.log('Audio file uploaded successfully:', url);

        return {
            id: Date.now().toString(),
            title,
            duration,
            url,
            fileName,
            albumArt: albumArtUrl
        };
    } catch (error) {
        console.error('Error uploading audio file:', error);
        throw error;
    }
}

/**
 * Get all audio files from Firebase Storage
 * @returns Promise with array of audio file URLs
 */
export async function listAudioFiles(): Promise<string[]> {
    try {
        const audioRef = ref(storage, 'audio/');
        const result = await listAll(audioRef);

        const urls = await Promise.all(
            result.items.map(itemRef => getDownloadURL(itemRef))
        );

        return urls;
    } catch (error) {
        console.error('Error listing audio files:', error);
        throw error;
    }
}

/**
 * Get download URL for a specific audio file
 * @param fileName - The name of the file in storage
 * @returns Promise with the download URL
 */
export async function getAudioURL(fileName: string): Promise<string> {
    try {
        const storageRef = ref(storage, `audio/${fileName}`);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error getting audio URL:', error);
        throw error;
    }
}

// Vercel Blob Storage Management
// This module handles uploading and retrieving audio files from Vercel Blob Storage

import { put } from '@vercel/blob';

export interface AudioFile {
    id: string;
    title: string;
    duration: string;
    url: string;
    fileName: string;
    albumArt?: string;
}

/**
 * Upload an album art image to Vercel Blob Storage
 * @param file - The image file to upload
 * @returns Promise with the uploaded image URL
 */
export async function uploadAlbumArt(file: File): Promise<string> {
    try {
        const fileName = `album-art/${Date.now()}_${file.name}`;

        console.log('Uploading album art to Vercel Blob:', fileName);

        const blob = await put(fileName, file, {
            access: 'public',
            token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        });

        console.log('Album art uploaded successfully:', blob.url);
        return blob.url;
    } catch (error) {
        console.error('Error uploading album art:', error);
        throw error;
    }
}

/**
 * Upload an audio file to Vercel Blob Storage
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

        // Upload the audio file
        const fileName = `audio/${Date.now()}_${file.name}`;

        console.log('Uploading audio file to Vercel Blob:', fileName);

        const blob = await put(fileName, file, {
            access: 'public',
            token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        });

        console.log('Audio file uploaded successfully:', blob.url);

        return {
            id: Date.now().toString(),
            title,
            duration,
            url: blob.url,
            fileName: file.name,
            albumArt: albumArtUrl
        };
    } catch (error) {
        console.error('Error uploading audio file:', error);
        throw error;
    }
}

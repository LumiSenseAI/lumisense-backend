import type { Context } from 'hono';
import { processAudioFile } from '../services/audioService.js';

export const handleAudioUpload = async (ctx: Context) => {
    try {
        // Utilise hono-multipart pour gérer le fichier envoyé
        const audioFile = await ctx.req.multipart(); // Pour récupérer le fichier multipart

        if (!audioFile || !audioFile.audio) {
            return ctx.json({ message: 'No audio file uploaded' }, 400);
        }

        // Appel au service pour traiter le fichier audio
        const result = await processAudioFile(audioFile.audio); // Audio est le champ dans le multipart

        // Retourne un boolean en fonction du traitement du fichier
        if (result) {
            return ctx.json({ success: true });
        } else {
            return ctx.json({ success: false }, 500);
        }
    } catch (error) {
        console.error('Error in audio upload:', error);
        return ctx.json({ message: 'Error processing audio file' }, 500);
    }
};

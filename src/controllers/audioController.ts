import type { Context } from 'hono';
import { processAudioFile } from '../services/audioService.js';

export const handleAudioUpload = async (ctx: Context) => {
    try {
        const formData = await ctx.req.parseBody();
        const audioFile = formData['audio'];

        if (!(audioFile instanceof File)) {
            return ctx.json({ message: 'Fichier audio invalide' }, 400);
        }

        const result = await processAudioFile(audioFile);

        if (result) {
            return ctx.json({ success: true, ...result });
        } else {
            return ctx.json({ success: false }, 500);
        }
    } catch (error) {
        console.error('Error in audio upload:', error);
        return ctx.json({ message: 'Error processing audio file' }, 500);
    }
};

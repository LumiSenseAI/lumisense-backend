import type { Context } from 'hono';
import { processAudioFile } from '../services/audioService.js';
import { getObjectByUserIdAndName } from '../services/objectService.js';

export const handleAudioUpload = async (ctx: Context) => {
    try {
        const userId = ctx.get('user').id;

        const formData = await ctx.req.parseBody();
        const audioFile = formData['audio'];

        if (!(audioFile instanceof File)) {
            return ctx.json({ message: 'Fichier audio invalide' }, 400);
        }

        const result = await processAudioFile(audioFile);

        const object = await getObjectByUserIdAndName(userId, result.name);

        result.id = object?.id;

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

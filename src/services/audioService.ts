import fs from 'fs';
import path from 'path';

// Fonction pour traiter le fichier audio
export const processAudioFile = async (audioFile: any): Promise<boolean> => {
    try {
        // Vérifie l'extension du fichier
        const fileExtension = path.extname(audioFile.filename).toLowerCase();
        if (fileExtension !== '.mp3' && fileExtension !== '.wav') {
            throw new Error('Invalid audio format');
        }

        // Sauvegarde du fichier sur le serveur
        const filePath = path.join(__dirname, '../../uploads', audioFile.filename);
        fs.writeFileSync(filePath, audioFile.buffer);

        // Traitement du fichier audio ici (par exemple avec ffmpeg, etc.)

        return true;
    } catch (error) {
        console.error('Error processing audio file:', error);
        return false;
    }
};

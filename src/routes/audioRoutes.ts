import { Hono } from 'hono';
import * as AudioController from '../controllers/audioController.js';

const audioRouter = new Hono();

// Route pour uploader un fichier audio
audioRouter.post('/upload', AudioController.handleAudioUpload);

export default audioRouter;

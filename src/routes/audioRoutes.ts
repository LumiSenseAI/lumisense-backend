import { Hono } from 'hono';
import * as AudioController from '../controllers/audioController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const audioRouter = new Hono();

// Route pour uploader un fichier audio
audioRouter.post('/upload', authenticate, AudioController.handleAudioUpload);

export default audioRouter;

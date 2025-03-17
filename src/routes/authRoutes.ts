// src/routes/authRoutes.ts
import { Hono } from 'hono';
import * as AuthController from '../controllers/authController.js';

const authRouter = new Hono();

authRouter.post('/login', AuthController.login);

export default authRouter;

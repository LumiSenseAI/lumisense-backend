// src/routes/userRoutes.ts
import { Hono } from 'hono';
import * as UserController from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const userRouter = new Hono();

userRouter.get('/', authenticate, UserController.getAllUsers);
userRouter.get('/:id', authenticate, UserController.getUser);
userRouter.post('/', authenticate, UserController.createUser);
userRouter.put('/:id', authenticate, UserController.updateUser);
userRouter.delete('/:id', authenticate, UserController.deleteUser);

export default userRouter;

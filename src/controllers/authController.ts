import type { Context } from 'hono';
import { getUserByEmail, generateAuthToken, verifyPassword } from '../services/authService.js';

export const login = async (ctx: Context) => {
    const { email, password } = await ctx.req.json();

    // Vérifier si l'utilisateur existe
    const user = await getUserByEmail(email);
    if (!user) {
        return ctx.json({ message: 'User not found' }, 404);
    }

    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        return ctx.json({ message: 'Invalid password' }, 401);
    }

    // Générer le token JWT
    const token = generateAuthToken(user);

    // Retourner le token
    return ctx.json({ token });
};

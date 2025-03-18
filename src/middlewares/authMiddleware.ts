import type { Context } from 'hono';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Middleware d'authentification pour Hono.
 *
 * Ce middleware vérifie le token JWT dans l'en-tête d'autorisation, le décode,
 * et ajoute les informations d'utilisateur à l'objet `ctx`.
 * Si le token est valide, il appelle `next()` pour passer au middleware suivant.
 * Sinon, il renvoie une réponse 401 Unauthorized.
 *
 * @param {Context} ctx - Le contexte de la requête Hono.
 * @param {Function} next - La fonction pour passer au middleware suivant.
 */
export const authenticate = async (ctx: Context, next: () => Promise<void>) => {
    const authHeader = ctx.req.header('Authorization');

    if (!authHeader) {
        return ctx.json({ message: 'Token missing' }, 401);
    }

    // Supposons que le token est envoyé sous la forme "Bearer <token>"
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return ctx.json({ message: 'Invalid token format' }, 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        ctx.set('user', decoded);

        await next();
    } catch (error) {
        return ctx.json({ message: 'Invalid or expired token' }, 401);
    }
};
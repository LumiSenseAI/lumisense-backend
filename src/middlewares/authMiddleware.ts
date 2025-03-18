import type { Context } from 'hono';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


export const authenticate = async (ctx: Context, next: () => Promise<void>) => {
    const cookieHeader = ctx.req.header('Cookie');
    // const cookieAuth = ctx.req.header('Authorization');
    // console.log(cookieHeader);
    // console.log(cookieAuth);

    if (!cookieHeader) {
        return ctx.json({ message: 'Token missing' }, 401);
    }

    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    const token = cookies.token; 

    if (!token) {
        return ctx.json({ message: 'Token missing' }, 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        ctx.set('user', decoded);

        return next();
    } catch (error) {
        return ctx.json({ message: 'Invalid or expired token' }, 401);
    }
};

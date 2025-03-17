import type { Context } from 'hono';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticate = async (ctx: Context, next: () => Promise<void>) => {
    const authHeader = ctx.req.header('Authorization');
    if (!authHeader) {
        return ctx.json({ message: 'Token missing' }, 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log("token :", token)
        console.log("JWT :", JWT_SECRET)
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded)
        // ctx.set('user', decoded);
        
        return next();
    } catch (error) {
        return ctx.json({ message: 'Invalid or expired token' }, 401);
    }
};

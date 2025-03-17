import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { IUser } from '../models/userModel.js';  
import { User } from '../models/userModel.js';   

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';  

export const generateAuthToken = (user: IUser): string => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email });
};

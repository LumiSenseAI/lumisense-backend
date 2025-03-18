// src/services/userService.ts
import { User } from '../models/userModel.js';
import type { IUser } from '../models/userModel.js';

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return await user.save();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
};

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find();
};

export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id);
};

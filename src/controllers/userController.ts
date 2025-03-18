// src/controllers/userController.ts
import type { Context } from 'hono';
import * as UserService from '../services/userService.js';

export const createUser = async (ctx: Context) => {
    const body = await ctx.req.json();
    const user = await UserService.createUser(body);
    return ctx.json(user, 201);
};

export const getUser = async (ctx: Context) => {
    const { id } = ctx.req.param();
    const user = await UserService.getUserById(id);
    if (!user) return ctx.json({ message: 'User not found' }, 404);
    return ctx.json(user);
};

export const getAllUsers = async (ctx: Context) => {
    const users = await UserService.getAllUsers();
    return ctx.json(users);
};

export const updateUser = async (ctx: Context) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json();
    const updatedUser = await UserService.updateUser(id, body);
    if (!updatedUser) return ctx.json({ message: 'User not found' }, 404);
    return ctx.json(updatedUser);
};

export const deleteUser = async (ctx: Context) => {
    const { id } = ctx.req.param();
    const deletedUser = await UserService.deleteUser(id);
    if (!deletedUser) return ctx.json({ message: 'User not found' }, 404);
    return ctx.json({ message: 'User deleted' });
};

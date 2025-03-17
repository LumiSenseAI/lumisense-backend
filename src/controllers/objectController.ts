import type { Context } from 'hono'; 
import * as ObjectService from '../services/objectService.js'; 
import type { IObject } from '../models/objectModel.js'; 


export const createObject = async (ctx: Context) => {
    const body: Partial<IObject> = await ctx.req.json(); 
    const createdObject = await ObjectService.createObject(body); 
    return ctx.json(createdObject, 201); 
};


export const getObjectById = async (ctx: Context) => {
    const { id } = ctx.req.param(); 
    const object = await ObjectService.getObjectById(id);
    if (!object) return ctx.json({ message: 'Object not found' }, 404); 
    return ctx.json(object); 
};

export const getAllObjects = async (ctx: Context) => {
    const objects = await ObjectService.getAllObjects(); 
    return ctx.json(objects); 
};

export const updateObject = async (ctx: Context) => {
    const { id } = ctx.req.param(); 
    const body: Partial<IObject> = await ctx.req.json(); 
    const updatedObject = await ObjectService.updateObject(id, body); 
    if (!updatedObject) return ctx.json({ message: 'Object not found' }, 404); 
    return ctx.json(updatedObject); 
};

export const deleteObject = async (ctx: Context) => {
    const { id } = ctx.req.param(); 
    const deletedObject = await ObjectService.deleteObject(id); 
    if (!deletedObject) return ctx.json({ message: 'Object not found' }, 404);
    return ctx.json({ message: 'Object deleted' }); 
};

import { ObjectModel } from '../models/objectModel.js';
import type { IObject } from '../models/objectModel.js';  

export const createObject = async (objectData: Partial<IObject>): Promise<IObject> => {
    const existingObject = await ObjectModel.findOne({ type: objectData.type });

    if (existingObject) {
        throw new Error('Ce nom est déjà pris');
    }

    const object = new ObjectModel(objectData);
    return await object.save();
};

export const getObjectById = async (id: string): Promise<IObject | null> => {
    return await ObjectModel.findById(id).populate('idUser'); 
};

export const getObjectByUserIdAndName = async (userId: string, name: string): Promise<IObject | null> => {
    console.log(userId, name)
    return await ObjectModel.findOne({
        idUser: userId,
        nom: name,
    });
};

export const getAllObjects = async (): Promise<IObject[]> => {
    return await ObjectModel.find().populate('idUser'); 
};

export const updateObject = async (id: string, objectData: Partial<IObject>): Promise<IObject | null> => {
    return await ObjectModel.findByIdAndUpdate(id, objectData, { new: true });
};

export const deleteObject = async (id: string): Promise<IObject | null> => {
    return await ObjectModel.findByIdAndDelete(id);
};

export const getObjectsByUser = async (userId: string): Promise<IObject[]> => {
    return await ObjectModel.find({ idUser: userId });
};
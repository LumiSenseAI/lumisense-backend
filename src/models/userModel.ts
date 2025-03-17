import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role: Enumerator;
}

export enum Enumerator {
    Admin = 'admin',
    User = 'user',
    Moderator = 'moderator',
  }

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: Object.values(Enumerator), 
        required: true 
      },
}, {
    timestamps: true,
});

export const User = mongoose.model<IUser>('User', UserSchema);
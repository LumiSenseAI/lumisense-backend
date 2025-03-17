import mongoose, { Schema, Document } from 'mongoose';

export interface IObject extends Document {
  nom: string;
  type: string;
  state: boolean;
  idUser: mongoose.Schema.Types.ObjectId;
}

const ObjectSchema: Schema = new Schema(
  {
    nom: { type: String, required: true },
    type: { type: String, required: true, unique: true }, 
    state: { type: Boolean, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const ObjectModel = mongoose.model<IObject>('Object', ObjectSchema);

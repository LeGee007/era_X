import mongoose, { Schema, Document } from 'mongoose';

export interface IRegion extends Document {
  owner: string; // user id
  coordinates: { x: number, y: number };
  area: number; // in km^2
}

const RegionSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  area: { type: Number, default: 2 }
});

export default mongoose.model<IRegion>('Region', RegionSchema);
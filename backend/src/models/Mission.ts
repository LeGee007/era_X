import mongoose, { Schema, Document } from 'mongoose';

export interface IMission extends Document {
  key: string;
  description: string;
  reward: { area?: number; coins?: number; soldiers?: number };
  type: 'start' | 'daily';
}

const MissionSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  reward: {
    area: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    soldiers: { type: Number, default: 0 }
  },
  type: { type: String, enum: ['start', 'daily'], default: 'start' }
});

export default mongoose.model<IMission>('Mission', MissionSchema);
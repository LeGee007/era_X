import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  telegramId: number;
  username: string;
  coins: number;
  area: number; // in km^2
  soldiers: { type: string; count: number }[];
  clan?: string; // clan id
  missionsCompleted: string[];
  referrals: string[];
}

const UserSchema: Schema = new Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: { type: String },
  coins: { type: Number, default: 100 },
  area: { type: Number, default: 0 },
  soldiers: [{ type: { type: String }, count: { type: Number, default: 0 } }],
  clan: { type: Schema.Types.ObjectId, ref: 'Clan' },
  missionsCompleted: [String],
  referrals: [String]
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface IClan extends Document {
  name: string;
  owner: string; // user id
  members: string[]; // user ids
}

const ClanSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model<IClan>('Clan', ClanSchema);
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// --- Routes ---
import userRoutes from './routes/user';
import missionRoutes from './routes/mission';
import regionRoutes from './routes/region';
import clanRoutes from './routes/clan';

app.use('/api/user', userRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/clans', clanRoutes);

app.get('/', (_req, res) => {
  res.send('Kingdom Game Backend Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import Mission from '../models/Mission';
import User from '../models/User';

const router = express.Router();

// Get all missions
router.get('/', async (_req, res) => {
  const missions = await Mission.find();
  res.json(missions);
});

// Complete a mission
router.post('/complete', async (req, res) => {
  const { telegramId, missionKey } = req.body;
  const user = await User.findOne({ telegramId });
  const mission = await Mission.findOne({ key: missionKey });
  if (!user || !mission) return res.status(404).send('Not found');

  if (user.missionsCompleted.includes(missionKey))
    return res.status(400).send('Already completed');

  user.missionsCompleted.push(missionKey);
  user.area += mission.reward.area || 0;
  user.coins += mission.reward.coins || 0;
  if (mission.reward.soldiers) {
    const idx = user.soldiers.findIndex(s => s.type === 'infantry');
    if (idx >= 0) user.soldiers[idx].count += mission.reward.soldiers;
    else user.soldiers.push({ type: 'infantry', count: mission.reward.soldiers });
  }
  await user.save();
  res.json({ ok: true, user });
});

export default router;
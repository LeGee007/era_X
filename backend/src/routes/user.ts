import express from 'express';
import User from '../models/User';

const router = express.Router();

// Register or login
router.post('/auth', async (req, res) => {
  const { telegramId, username } = req.body;
  let user = await User.findOne({ telegramId });
  if (!user) {
    user = new User({ telegramId, username });
    await user.save();
  }
  res.json(user);
});

// Get user profile
router.get('/:telegramId', async (req, res) => {
  const { telegramId } = req.params;
  const user = await User.findOne({ telegramId });
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

export default router;
import express from 'express';
import Clan from '../models/Clan';
import User from '../models/User';

const router = express.Router();

// Get all clans
router.get('/', async (_req, res) => {
  const clans = await Clan.find().populate('owner', 'username').populate('members', 'username');
  res.json(clans);
});

// Create clan
router.post('/create', async (req, res) => {
  const { name, ownerId } = req.body;
  const owner = await User.findById(ownerId);
  if (!owner || owner.area < 10000) return res.status(400).send('Insufficient area to create clan');
  const clan = new Clan({ name, owner: owner._id, members: [owner._id] });
  await clan.save();
  owner.clan = clan._id;
  await owner.save();
  res.json(clan);
});

export default router;
import express from 'express';
import Region from '../models/Region';
import User from '../models/User';

const router = express.Router();

// Get all regions (for map)
router.get('/', async (_req, res) => {
  const regions = await Region.find().populate('owner', 'username clan');
  res.json(regions);
});

// Get region details
router.get('/:regionId', async (req, res) => {
  const region = await Region.findById(req.params.regionId).populate('owner', 'username clan');
  if (!region) return res.status(404).send('Region not found');
  res.json(region);
});

export default router;
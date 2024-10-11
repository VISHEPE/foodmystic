const express = require('express');
const router = express.Router();
const DistributionCenter = require('../models/distributionCenter');

// Get all distribution centers
router.get('/', async (req, res) => {
  try {
    const centers = await DistributionCenter.getAll();
    res.render('distributionCenters', { title: 'Distribution Centers', centers });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create new distribution center
router.post('/', async (req, res) => {
  try {
    await DistributionCenter.create(req.body);
    res.redirect('/distribution-centers');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add other CRUD routes (GET /:id, PUT /:id, DELETE /:id) if needed

module.exports = router;

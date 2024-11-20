const express = require('express');
const router = express.Router();
const FoodType = require('../models/foodType');

// Get all food types
router.get('/', async (req, res) => {
  try {
    const foodTypes = await FoodType.getAll();
    res.render('foodTypes', { title: 'Food Types', foodTypes });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create new food type
router.post('/', async (req, res) => {
  try {
    await FoodType.create(req.body);
    res.redirect('/food-types');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add other CRUD routes (GET /:id, PUT /:id, DELETE /:id

module.exports = router;

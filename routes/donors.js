const express = require('express');
const router = express.Router();
const Donor = require('../models/donors');

router.get('/', async (req, res) => {
  try {
    const donors = await Donor.getAll();
    res.render('donors', { title: 'Donors', donors });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const donorId = await Donor.create(req.body);
    res.redirect('/donors');
  } catch (error) {
    res.status(500).send('Server error');
  }
});



module.exports = router;
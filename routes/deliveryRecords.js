const express = require('express');
const router = express.Router();
const DeliveryRecord = require('../models/deliveryRecord');


router.get('/', async (req, res) => {
  try {
    const deliveryRecords = await DeliveryRecord.getAll();
    res.render('deliveryRecords', { title: 'Delivery Records', deliveryRecords });
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.post('/', async (req, res) => {
  try {
    await DeliveryRecord.create(req.body);
    res.redirect('/delivery-records');
  } catch (error) {
    res.status(500).send('Server error');
  }
});



module.exports = router;

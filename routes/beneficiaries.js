const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/beneficiary');

router.get('/', async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.getAll();
    res.render('beneficiaries', { 
      title: 'Beneficiaries', 
      beneficiaries,
      user: req.session.user,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      }
    });
  } catch (error) {
    req.flash('error', 'Error retrieving beneficiaries');
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    await Beneficiary.create(req.body);
    req.flash('success', 'Beneficiary added successfully');
    res.redirect('/beneficiaries');
  } catch (error) {
    req.flash('error', 'Error adding beneficiary');
    res.redirect('/beneficiaries');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const beneficiary = await Beneficiary.getById(req.params.id);
    res.render('editBeneficiary', { 
      title: 'Edit Beneficiary', 
      beneficiary,
      user: req.session.user,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      }
    });
  } catch (error) {
    req.flash('error', 'Error retrieving beneficiary');
    res.redirect('/beneficiaries');
  }
});

router.post('/:id/edit', async (req, res) => {
  try {
    await Beneficiary.update(req.params.id, req.body);
    req.flash('success', 'Beneficiary updated successfully');
    res.redirect('/beneficiaries');
  } catch (error) {
    req.flash('error', 'Error updating beneficiary');
    res.redirect('/beneficiaries');
  }
});

router.post('/:id/delete', async (req, res) => {
  try {
    await Beneficiary.delete(req.params.id);
    req.flash('success', 'Beneficiary deleted successfully');
    res.redirect('/beneficiaries');
  } catch (error) {
    req.flash('error', 'Error deleting beneficiary');
    res.redirect('/beneficiaries');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.getByEmail(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user;
      req.flash('success', 'Logged in successfully');
      res.redirect('/');
    } else {
      req.flash('error', 'Invalid email or password');
      res.redirect('/auth/login');
    }
  } catch (error) {
    req.flash('error', 'Server error');
    res.redirect('/auth/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});

module.exports = router;
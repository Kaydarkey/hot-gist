const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Render login page
router.get('/login', (req, res) => {
  res.render('login'); // Create a login.ejs view in your views directory
});

// Handle login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile', // Redirect to profile page on successful login
  failureRedirect: '/auth/login',
  failureFlash: true // Optional: if using connect-flash for flash messages
}));

// Render registration page
router.get('/signup', (req, res) => {
  res.render('signup'); // Create a register.ejs view in your views directory
});

// Handle registration form submission
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).render('signup', { msg: 'Email already registered' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
});

module.exports = router;

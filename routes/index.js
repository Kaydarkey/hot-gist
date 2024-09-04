const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this path is correct

// Define your routes here
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/chat');
  } else {
    res.render('login');
  }
});

router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/login', (req, res) => {
  // Authentication logic (you should replace this with actual authentication logic)
  req.session.isAuthenticated = true; // This is a placeholder
  res.redirect('/chat');
});

module.exports = router;

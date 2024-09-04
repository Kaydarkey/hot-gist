const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated } = require('../config/passport'); // Ensure user is authenticated

// Get user profile
router.get('/:userId', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('profile', { user });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update user profile
router.post('/update', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update user details
    user.name = req.body.name;
    user.email = req.body.email;
    await user.save();

    // Redirect to updated profile
    res.redirect(`/profile/${user._id}`);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

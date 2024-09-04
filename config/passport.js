const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const { comparePassword } = require('../utils/cryptoUtil'); // Ensure this path is correct

// Configure Passport with Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email', // Field for username
  passwordField: 'password' // Field for password
}, async (email, password, done) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    // Compare hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login'); // Redirect to login if not authenticated
}

module.exports = { ensureAuthenticated };

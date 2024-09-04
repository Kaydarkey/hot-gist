const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  activationToken: { type: String, default: null },
  activationExpires: { type: Date, default: null },
  // Additional fields as needed
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  avatarUrl: String,
  xp: { type: Number, default: 0 },
  mood: { type: String, default: 'neutral' },
  level: { type: Number, default: 1 }
});

module.exports = mongoose.model('Pet', petSchema);

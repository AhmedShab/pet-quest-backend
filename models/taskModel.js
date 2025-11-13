const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  petType: String, // 'cat', 'guineaPig', etc.
  type: String, // 'feed', 'clean', 'play', 'refill'
  timeOfDay: String, // 'morning', 'evening'
  completed: { type: Boolean, default: false },
  xpReward: Number,
  label: String,
  date: { type: Date, default: () => new Date() }
});

module.exports = mongoose.model('Task', taskSchema);

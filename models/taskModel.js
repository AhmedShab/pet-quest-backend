const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
  type: String, // e.g., 'feed', 'clean', 'play'
  dueDate: Date,
  completed: { type: Boolean, default: false },
  xpReward: Number
});

module.exports = mongoose.model('Task', taskSchema);

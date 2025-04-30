// models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goal: { type: String, required: true },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  date: String,
  weight: Number,
});

module.exports = mongoose.model('Progress', progressSchema);
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  exercise: String,
  sets: Number,
  reps: Number,
  weight: Number,
  duration: Number,
  date: {
    type: Date,
    default: Date.now, // Default is the current date/time
  },
});

module.exports = mongoose.model('Workout', workoutSchema);

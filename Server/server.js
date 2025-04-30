const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const Workout = require('./models/Workout');
const Goal = require('./models/Goal');
const Progress = require('./models/Progress');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Fitness_Tracker_App', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// --- Workout Routes ---
app.post('/api/workouts', async (req, res) => {
  const { exercise, sets, reps, weight, duration } = req.body;
  try {
    const workout = new Workout({ exercise, sets, reps, weight, duration });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save workout' });
  }
});

app.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workouts' });
  }
});

// --- Goal Routes ---
app.get('/api/goals', async (req, res) => {
  try {
    const goal = await Goal.findOne().sort({ createdAt: -1 });
    res.status(200).json(goal || { goal: 'Start Your Fitness Journey!', progress: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goal' });
  }
});

app.post('/api/goals', async (req, res) => {
  const { goal } = req.body;
  try {
    const newGoal = new Goal({ goal, progress: 0 });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ message: 'Error saving goal' });
  }
});

// --- Progress Routes ---
app.get('/api/progress', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendProgress = async () => {
    try {
      const progress = await Progress.findOne().sort({ createdAt: -1 });
      const progressData = progress ? progress.progress : 0;

      res.write(`data: ${JSON.stringify({ progress: progressData })}\n\n`);

      // Send progress every 5 seconds
      setTimeout(sendProgress, 5000);
    } catch (err) {
      console.error('Error fetching progress:', err);
      res.write(`data: ${JSON.stringify({ progress: 0 })}\n\n`);
    }
  };

  sendProgress();
});

// --- User Registration Route ---
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// --- User Login Route ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Start Server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

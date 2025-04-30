import React, { useState } from 'react';
import axios from 'axios';

const WorkoutForm = () => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');

  // Predefined list of exercises
  const exercises = [
    'Push-up',
    'Squat',
    'Deadlift',
    'Bench Press',
    'Pull-up',
    'Lunge',
    'Overhead Press',
    'Bicep Curl',
    'Tricep Extension',
    'Plank',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exercise || !sets || !reps || !weight || !duration) {
      alert('Please fill in all fields.');
      return;
    }

    const workoutData = { exercise, sets, reps, weight, duration };

    try {
      await axios.post('http://localhost:5000/api/workouts', workoutData);
      alert('Workout logged successfully!');
      setExercise('');
      setSets('');
      setReps('');
      setWeight('');
      setDuration('');
    } catch (error) {
      console.error('Error logging workout', error);
      alert('Something went wrong while logging your workout.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Log New Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="exercise" className="font-medium">Exercise Name</label>
          <select
            id="exercise"
            className="p-2 border rounded"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          >
            <option value="">Select an Exercise</option>
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="sets" className="font-medium">Sets</label>
          <input
            type="number"
            id="sets"
            className="p-2 border rounded"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="reps" className="font-medium">Reps</label>
          <input
            type="number"
            id="reps"
            className="p-2 border rounded"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="weight" className="font-medium">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            className="p-2 border rounded"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="duration" className="font-medium">Duration (min)</label>
          <input
            type="number"
            id="duration"
            className="p-2 border rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Log Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;

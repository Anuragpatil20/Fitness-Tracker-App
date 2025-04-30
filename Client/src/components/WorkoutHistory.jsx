// src/components/WorkoutHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workouts');
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts', error);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Workout History</h2>
      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li key={workout._id} className="p-4 border rounded shadow-sm">
            <p><strong>Exercise:</strong> {workout.exercise}</p>
            <p><strong>Sets:</strong> {workout.sets} | <strong>Reps:</strong> {workout.reps} | <strong>Weight:</strong> {workout.weight} kg</p>
            <p><strong>Duration:</strong> {workout.duration} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutHistory;

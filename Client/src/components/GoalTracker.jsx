import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoalTracker = () => {
  const [goal, setGoal] = useState('');
  const [progress, setProgress] = useState(0);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/goals');
        setGoal(response.data.goal);
        setProgress(response.data.progress);
      } catch (error) {
        console.error('Error fetching goal:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/goals', { goal: newGoal });
      setGoal(response.data.goal);
      setProgress(response.data.progress);
      setNewGoal('');
    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎯 Fitness Goal</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p><strong>Current Goal:</strong> {goal}</p>
          <p><strong>Progress:</strong> {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="goal" className="block font-medium">Set New Goal</label>
        <input
          type="text"
          id="goal"
          className="w-full p-2 border rounded"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Set Goal
        </button>
      </form>
    </div>
  );
};

export default GoalTracker;

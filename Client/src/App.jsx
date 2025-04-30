import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import WorkoutForm from './components/WorkoutForm';
import WorkoutHistory from './components/WorkoutHistory';
import ProgressChart from './components/ProgressChart';
import GoalTracker from './components/GoalTracker';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if there's a JWT token in localStorage (i.e., user is logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout and clear token
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logout !")
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-6 text-white">
          {!isAuthenticated ? (
            <>
              <li><Link to="/login" className="hover:text-gray-200">Login</Link></li>
              <li><Link to="/register" className="hover:text-gray-200">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/workout" className="hover:text-gray-200">Log Workout</Link></li>
              <li><Link to="/history" className="hover:text-gray-200">Workout History</Link></li>
              <li><Link to="/progress" className="hover:text-gray-200">Progress Chart</Link></li>
              <li><Link to="/goal" className="hover:text-gray-200">Goal Tracker</Link></li>
              <li><button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button></li>
            </>
          )}
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        {/* If not authenticated, redirect to login page */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/workout" element={isAuthenticated ? <WorkoutForm /> : <Navigate to="/login" />} />
        <Route path="/history" element={isAuthenticated ? <WorkoutHistory /> : <Navigate to="/login" />} />
        <Route path="/progress" element={isAuthenticated ? <ProgressChart /> : <Navigate to="/login" />} />
        <Route path="/goal" element={isAuthenticated ? <GoalTracker /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

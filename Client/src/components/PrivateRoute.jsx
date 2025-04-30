import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');  // Check if the user is logged in

  return (
    <Route 
      {...rest} 
      element={isAuthenticated ? element : <Navigate to="/login" />}  // Redirect to login if not authenticated
    />
  );
};

export default PrivateRoute;

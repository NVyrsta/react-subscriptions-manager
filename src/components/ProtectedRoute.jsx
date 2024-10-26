import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  return isAuthenticated ? element : <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;

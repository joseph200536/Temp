import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required, allow access to any authenticated user
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user has required role
  const hasRequiredRole = (
    (allowedRoles.includes('admin') && user?.isAdmin) ||
    (allowedRoles.includes('seller') && user?.isSeller) ||
    (allowedRoles.includes('user') && !user?.isAdmin && !user?.isSeller)
  );

  if (!hasRequiredRole) {
    // Redirect based on user role
    if (user?.isAdmin) {
      return <Navigate to="/admin" replace />;
    } else if (user?.isSeller) {
      return <Navigate to="/seller" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
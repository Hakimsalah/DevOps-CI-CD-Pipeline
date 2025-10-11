import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from './authUtils';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/Homepage" replace />;
  }

  return children;
};

export default RoleProtectedRoute;

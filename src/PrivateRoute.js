import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;

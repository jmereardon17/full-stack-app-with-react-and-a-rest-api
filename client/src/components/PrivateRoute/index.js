import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { Consumer } from '../Context';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  return (
    <Consumer>
      {context => {
        if (!context.currentUser)
          return <Navigate to="/sign-in" state={{ from: location }} replace />;

        return children ? children : <Outlet />;
      }}
    </Consumer>
  );
};

export default PrivateRoute;

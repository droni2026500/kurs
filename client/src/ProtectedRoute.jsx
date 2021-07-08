/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (JSON.parse(sessionStorage.getItem('isAuthorized'))) {
        return <Component {...props} />;
      }

      return <Redirect to="/" />;
    }}
  />
);
export default ProtectedRoute;

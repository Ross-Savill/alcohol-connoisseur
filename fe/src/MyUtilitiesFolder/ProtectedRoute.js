import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

  const { user } = useAuth0();

  return (
    <Route
      {...rest}
      render={props => {
        if(user['https://drinkandrate.netlify.app/roles'][0] === "admin") {
          return <Component {...props} drinkers={rest.drinkers} />;
        }
        else {
          return <Redirect to={
            {
              pathname: "/",
            }
          } />
        }
      }}
    />
  )
}
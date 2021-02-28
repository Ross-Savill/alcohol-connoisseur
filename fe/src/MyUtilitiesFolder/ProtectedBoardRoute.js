import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const ProtectedBoardRoute = ({ component: Component, drinkers, ...rest }) => {

  const [sessionStatus, setSessionStatus] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function getSessionStatus() {
      const token = await getAccessTokenSilently();
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
      axios.get("https://drinkandrate.herokuapp.com/theboard", config)
        .then(resp => console.log(resp))
        // .then(resp => setSessionStatus(resp))
    }
    getSessionStatus()
  }, [drinkers])

  return (
    <Route
      {...rest}
      render={props => {
        if(sessionStatus === true) {
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
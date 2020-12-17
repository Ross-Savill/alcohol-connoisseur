import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RatingWord from './RatingWord';
import Drinkers from './DrinkerFolder/Drinkers';
import WorldMap from './MapFolder/WorldMap';
import USMap from './MapFolder/USMap';
import './Stylesheets/App.css';
import LoginButton from './AuthFolder/LoginButton';
import LogoutButton from './AuthFolder/LogoutButton';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';

const App = () => {
  const [state, setState] = useState ({
        drinks: null,
        drinkers: null,
        drinkTypes: null
  })

  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    async function getInfo() {
      if(user) {
        const token = await getAccessTokenSilently();
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        }
        const requestDrinkers = axios.get("https://drinkandrate.herokuapp.com/peoplenames", config)
        const requestDrinks = axios.get("https://drinkandrate.herokuapp.com/drinks", config)
        const requestDrinkTypes = axios.get("https://drinkandrate.herokuapp.com/drinktypes", config)

        axios.all([requestDrinkers, requestDrinks, requestDrinkTypes])
        .then(resp => setState({ drinkers: resp[0].data,
                                 drinks: resp[1].data,
                                 drinkTypes: resp[2].data
        }))
        .catch(error => console.log(error))
      }
    }
    getInfo();
  }, [user])

  if(!user) {
    return (
      <div>
        <LoginButton />
      </div>
    )
  } else {
    return (
      <div>
        <LogoutButton />
        <BrowserRouter>
          <div>
            <Route
              exact path="/"
              render={(props) => (
                <HomePage {...props}
                drinks={state.drinks}
                />
              )}
            />
            <Route
              exact path="/drinkers"
              render={(props) => (
                <Drinkers {...props}
                drinks={state.drinks}
                drinkers={state.drinkers}
                drinkTypes={state.drinkTypes}
                />
              )}
            />
            <Route
              exact path="/ratingwords"
              render={(props) => (
                <RatingWord {...props}
                  drinks={state.drinks}
                />
              )}
            />
            <Route
              exact path="/world-map" render={(props) => (
                <WorldMap {...props}
                  drinks={state.drinks}
                  drinkers={state.drinkers}
                />
              )}
            />
            <Route
              exact path="/us-map" render={(props) => (
                <USMap {...props}
                  drinks={state.drinks}
                  drinkers={state.drinkers}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default withAuth0(App);

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RatingWord from '../RatingWordFolder/RatingWord';
import Drinkers from '../DrinkerFolder/Drinkers';
import Sessions from '../SessionsFolder/Sessions';
import BreweryPage from '../BreweryFolder/BreweryPage';
import WorldMap from '../MapFolder/WorldFolder/WorldMap';
import USMap from '../MapFolder/USFolder/USMap';
import '../Stylesheets/MainPageSS/App.css';
import LoginButton from '../AuthFolder/LoginButton';
import { ProtectedRoute } from '../MyUtilitiesFolder/ProtectedRoute';
import Admin from '../AdminFolder/Admin';
import TheBoard from '../BoardFolder/TheBoard';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';
import LoadingSpin from '../MyUtilitiesFolder/LoadingSpin';

const App = () => {
  const [state, setState] = useState ({
    drinks: null,
    drinkers: null,
    drinkTypes: null,
    confirmedDrinks: null
  })

  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    async function getInfo() {
      if(user) {
        const token = await getAccessTokenSilently();
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        }
        const requestDrinkers = axios.get("https://drinkandrate.herokuapp.com/users", config)
        const requestDrinks = axios.get("https://drinkandrate.herokuapp.com/drinks", config)
        const requestDrinkTypes = axios.get("https://drinkandrate.herokuapp.com/drinktypes", config)

        axios.all([requestDrinkers, requestDrinks, requestDrinkTypes])
          .then(resp => setState({ drinkers: resp[0].data,
                                   drinks: resp[1].data,
                                   drinkTypes: resp[2].data }))
          .catch(error => console.log(error))
      }
    }
    getInfo();
  }, [user])

  if(!user) { return ( <div><LoginButton /></div>) }
    else if(!state.drinks) { return <LoadingSpin /> }
    else {

      let confirmedDrinks = [];
      let confirmedDrinkers = [];
      if(user['sub'] === "auth0|60510e48f083990017c29d7f") {
        state.drinks.map((drink) => {
          let anonymousDrink = drink;
          state.drinkers.map((drinker) => {
            if(anonymousDrink.name === drinker.personName && anonymousDrink.confirmed === true) {
              anonymousDrink.name = drinker.fakeName
              confirmedDrinks.push(anonymousDrink)
            }

          })
        })
        state.drinkers.map((drinker) => {
          let anonymousDrinker = drinker;
          anonymousDrinker.personName = anonymousDrinker.fakeName;
          confirmedDrinkers.push(anonymousDrinker)
        })
      } else {
        state.drinks.map((drink) => {
          if(drink.confirmed === true) {
            confirmedDrinks.push(drink)
          }
        })
        state.drinkers.map((drinker) => {
          confirmedDrinkers.push(drinker)
        })
      }

      return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              exact path="/"
              render={(props) => (
                <HomePage {...props}
                drinks={confirmedDrinks}
                drinkers={confirmedDrinkers}
                />
              )}
            />
            <Route
              exact path="/drinkers"
              render={(props) => (
                <Drinkers {...props}
                drinks={confirmedDrinks}
                drinkers={confirmedDrinkers}
                drinkTypes={state.drinkTypes}
                />
              )}
            />
            <Route
              exact path="/ratingwords"
              render={(props) => (
                <RatingWord {...props}
                  drinks={confirmedDrinks}
                />
              )}
            />
            <Route
              exact path="/sessions"
              render={(props) => (
                <Sessions {...props}
                  drinks={confirmedDrinks}
                  drinkers={confirmedDrinkers}
                  drinkTypes={state.drinkTypes}
                />
              )}
            />
            <Route
              exact path="/breweries"
              render={(props) => (
                <BreweryPage {...props}
                  drinks={confirmedDrinks}
                />
              )}
            />
            <Route
              exact path="/world-map" render={(props) => (
                <WorldMap {...props}
                  drinks={confirmedDrinks}
                />
              )}
            />
            <Route
              exact path="/us-map" render={(props) => (
                <USMap {...props}
                  drinks={confirmedDrinks}
                />
              )}
            />
            <Route
              exact path="/theboard"
              render={(props) => (
                <TheBoard {...props}
                  drinkers={confirmedDrinkers}
                  drinkTypes={state.drinkTypes}
                />
              )}
            />
            <ProtectedRoute
              exact path="/admin"
              component={Admin}
              drinkers={confirmedDrinkers}
            />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default withAuth0(App);

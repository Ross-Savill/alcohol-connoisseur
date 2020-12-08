import React, { Component } from 'react';
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
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {

  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null
      }
  }

  componentDidMount() {
    const requestDrinkers = axios.get("https://drinkandrate.herokuapp.com/peoplenames")
    const requestDrinks = axios.get("https://drinkandrate.herokuapp.com/drinks")
    const requestDrinkTypes = axios.get("https://drinkandrate.herokuapp.com/drinktypes")
    axios.all([requestDrinkers, requestDrinks, requestDrinkTypes])
      .then(resp => this.setState({ drinkers: resp[0].data,
                                    drinks: resp[1].data,
                                    drinkTypes: resp[2].data
                                  }))
      .catch(error => console.log(error))
  }

  render () {
    const { user } = this.props.auth0;
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
                  drinks={this.state.drinks}
                  />
                )}
              />
              <Route
                exact path="/drinkers"
                render={(props) => (
                  <Drinkers {...props}
                  drinks={this.state.drinks}
                  drinkers={this.state.drinkers}
                  drinkTypes={this.state.drinkTypes}
                  />
                )}
              />
              <Route
                exact path="/ratingwords"
                render={(props) => (
                  <RatingWord {...props}
                    drinks={this.state.drinks}
                  />
                )}
              />
              <Route
                exact path="/world-map" render={(props) => (
                  <WorldMap {...props}
                    drinks={this.state.drinks}
                    drinkers={this.state.drinkers}
                  />
                )}
              />
              <Route
                exact path="/us-map" render={(props) => (
                  <USMap {...props}
                    drinks={this.state.drinks}
                    drinkers={this.state.drinkers}
                  />
                )}
              />
            </div>
          </BrowserRouter>
        </div>
      )
    }
  }
}

export default withAuth0(App);

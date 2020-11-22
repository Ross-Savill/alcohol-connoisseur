import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import RatingWord from './RatingWord';
import Drinkers from './DrinkerFolder/Drinkers';
import WorldMap from './MapFolder/WorldMap';
import USMap from './MapFolder/USMap';
import './Stylesheets/App.css';

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
    const requestDrinkers = axios.get("http://localhost:5000/peoplenames")
    const requestDrinks = axios.get("http://localhost:5000/drinks")
    const requestDrinkTypes = axios.get("http://localhost:5000/drinktypes")
    axios.all([requestDrinkers, requestDrinks, requestDrinkTypes])
      .then(resp => this.setState({ drinkers: resp[0].data,
                                    drinks: resp[1].data,
                                    drinkTypes: resp[2].data
                                  }))
      .catch(error => console.log(error))
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route
            exact path="/drinkers"
            render={(props) => (
              <Drinkers {...props}
              drinks={this.state.drinks}
              drinkers={this.state.drinkers}
              drinkTypes={this.state.drinkTypes}
              />
            )}
          >
          </Route>
          <Route exact path="/ratingwords">
            <RatingWord />
          </Route>
          <Route
            exact path="/world-map" render={(props) => (
              <WorldMap {...props} drinks={this.state.drinks} drinkers={this.state.drinkers} />
            )}
          />
          <Route
            exact path="/us-map" render={(props) => (
              <USMap {...props} drinks={this.state.drinks} drinkers={this.state.drinkers} />
            )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

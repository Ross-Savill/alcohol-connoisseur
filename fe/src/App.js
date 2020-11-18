import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import RatingWord from './RatingWord';
import Drinkers from './DrinkerFolder/Drinkers';
import WorldMap from './MapFolder/WorldMap';
import USMap from './MapFolder/USMap';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null
      }
  }

  componentDidMount() {
    const requestDrinkers = axios.get("http://localhost:5000/peopleNames")
    const requestDrinks = axios.get("http://localhost:5000/drinks")
    axios.all([requestDrinkers, requestDrinks])
      .then(resp => this.setState({ drinkers: resp[0].data,
                                    drinks: resp[1].data }))
      .catch(error => console.log(error))
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/drinkers">
            <Drinkers />
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

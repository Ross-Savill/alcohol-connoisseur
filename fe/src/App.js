import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RatingWord from './RatingWord';
import Drinkers from './Drinkers';
import './App.css';

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/drinkers" component={Drinkers}></Route>
          <Route exact path="/ratingwords" component={RatingWord}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

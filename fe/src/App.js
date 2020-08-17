import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Drinks from './Drinks';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Route exact path="/" component={Drinks}>
      </Route>
    </BrowserRouter>
    )
  }
}

export default App;

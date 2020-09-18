import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TotalData from './TotalData';
import './App.css';

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/totaldata" component={TotalData}></Route>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

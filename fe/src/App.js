import React, { Component } from 'react';
import './App.css';
import Drinks from './Drinks';
import Search from './Search';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <Route exact path="/" component={Drinks}></Route>
      <Route exact path="/search" component={Search}></Route>
    </BrowserRouter>
    )
  }
}

export default App;

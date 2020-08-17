import React, { Component } from 'react';
import axios from 'axios';

class Drinks extends Component {

  componentDidMount() {
    axios.get('http://localhost:5000/drinks')
      .then(resp => console.log(resp.data))
  }

  render() {
    return (
      <button>Click me</button>
    )
  }
}

export default Drinks;
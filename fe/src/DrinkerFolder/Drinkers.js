import React, { Component } from 'react';
import axios from 'axios';
import RadarChart from './RadarChart';

class Drinkers extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null
      }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/drinks")
      .then(resp => this.setState({ drinks: resp.data }))
      .catch(error => console.log(error))
    }

  async componentDidUpdate(prevProps, prevState) {

  }

  render() {
    return(
      <div>
        <p>Drinkers Page</p>
        <RadarChart drinks={this.state.drinks} />
      </div>
    )
  }
}

  export default Drinkers
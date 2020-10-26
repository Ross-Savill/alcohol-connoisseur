import React, { Component } from 'react';
import axios from 'axios';
import RadarChart from './RadarChart';

class Drinkers extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        chosenDrinker: null
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

  async componentDidUpdate(prevProps, prevState) {

  }

  render() {
    return(
      <div>
        <p>Drinkers Page</p>
        <select>Choose Your Drinker!
          <optgroup label="Regular Attendees">
            <option value="test">Test Person</option>
            <option value="test2">Test Person</option>
          </optgroup>
          <optgroup label="Others">
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </optgroup>
        </select>
        <RadarChart drinks={this.state.drinks}
                    drinkers={this.state.drinkers} />
      </div>
    )
  }
}

  export default Drinkers
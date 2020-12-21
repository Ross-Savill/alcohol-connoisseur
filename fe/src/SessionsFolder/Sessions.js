import React, { Component } from 'react';
import Navbar from '../Navbar.js'
import LineChart from './LineChart.js'
import '../Stylesheets/Sessions.css'

class Sessions extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
      }
  }

  componentDidMount() {
    const { drinks, drinkers, drinkTypes } = this.props
    if(drinks) {
      this.haveDrinks()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks } = this.state
    if(this.props.drinks !== drinks) {
      this.haveDrinks()
    }
  }

  haveDrinks = () => {
    // SET STATE WITH DRINKS AND DRINKERS
    const { drinks, drinkers, drinkTypes } = this.props
    this.setState({ drinks, drinkers, drinkTypes })
  }

  render() {
    return(
      <div>
        <h1 className="sessionsTitle">Drink and Rate Sessions</h1>
        <Navbar />
        <LineChart drinks={this.state.drinks}
                   drinkers={this.state.drinkers}
                   drinkTypes={this.state.drinkTypes}
        />
      </div>
    )
  }
}

export default Sessions;
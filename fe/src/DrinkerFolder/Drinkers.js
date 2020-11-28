import React, { Component } from 'react';
import RadarChart from './RadarChart';
import DrinkersTable from './DrinkersTable';
import Navbar from '../Navbar.js'
import '../Stylesheets/Drinkers.css'

class Drinkers extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        selectedDrinker: "All Drinkers",
        drinksPerPerson: null,
        regularDrinkers: [],
        irregularDrinkers: [],
      }
  }

  componentDidMount() {
    const { drinks } = this.props
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

    // SET STATE - DRINKS PER PERSON
    const drinksPerPerson = drinks.reduce( (acc, o) => (acc[o.name] = (acc[o.name] || 0)+1, acc), {} );
    this.setState({ drinksPerPerson })

    //SET STATE - REGULAR / IRREGULAR DRINKERS
    let regularDrinkers = []
    let irregularDrinkers = []
    for (const [person, drinkNum] of Object.entries(drinksPerPerson)) {
      if (drinkNum >= 20) {
        regularDrinkers.push(person)
      } else {
        irregularDrinkers.push(person)
      }
    }
    regularDrinkers.sort(function (a, b) {
      return a.localeCompare(b);
    });
    irregularDrinkers.sort(function (a, b) {
      return a.localeCompare(b);
    });
    this.setState({ regularDrinkers, irregularDrinkers })
}

  regularDrinkers() {
    const { regularDrinkers } = this.state
      return regularDrinkers.map((drinker, index) => {
        return <option key={index} value={drinker}>{drinker}</option>
      })
  }

  irregularDrinkers() {
    const { irregularDrinkers } = this.state
      return irregularDrinkers.map((drinker, index) => {
        return <option key={index} value={drinker}>{drinker}</option>
      })
  }

  onSelectDrinker (event) {
    this.setState({ selectedDrinker: event.target.value });
  }

  render() {
    if(!this.state.drinks) {
      return("Please Wait")
    } else {
      return(
      <div className="drinkersContainer">
        <h1 className="drinkersPageTitle">Drinkers Page</h1>
        <Navbar />
        <select
          className="drinkerSelect"
          onChange={this.onSelectDrinker.bind(this)}
          value={this.state.selectedDrinker}
        >
          <option value="All Drinkers">ALL DRINKERS</option>
          <optgroup label="Regular Attendees">
            {this.regularDrinkers()}
          </optgroup>
          <optgroup label="Irregular Attendees">
            {this.irregularDrinkers()}
          </optgroup>
        </select>
        <div className="chartsAndTable">
          <div className="radarAndBarChart">
            <RadarChart drinks={this.state.drinks}
                        drinkers={this.state.drinkers}
                        drinkTypes={this.state.drinkTypes}
                        selectedDrinker={this.state.selectedDrinker} />
          </div>
          <div className="drinkersTable">
            <DrinkersTable drinks={this.state.drinks}
                        drinkers={this.state.drinkers}
                        drinkTypes={this.state.drinkTypes}
                        selectedDrinker={this.state.selectedDrinker}
                        regularDrinkers={this.state.regularDrinkers}
                        irregularDrinkers={this.state.irregularDrinkers}/>
          </div>
        </div>
      </div>

      )
    }
  }
}
  export default Drinkers;
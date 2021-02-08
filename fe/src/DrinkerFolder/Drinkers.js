import React, { Component } from 'react';
import DrinkersBarChart from './DrinkersBarChart';
import DrinkersTable from './DrinkersTable';
import Navbar from '../MyUtilitiesFolder/Navbar.js'
import '../Stylesheets/DrinkersPageSS/Drinkers.css'

class Drinkers extends Component {
  constructor(props) {
    super(props)
      this.onSelectDrinker = this.onSelectDrinker.bind(this)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        selectedDrinker: "All Drinkers",
        drinksPerPerson: null,
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
  }

  onSelectDrinker (clickedRowName) {
    this.setState({ selectedDrinker: clickedRowName });
  }

  render() {
    if(!this.state.drinks) {
      return("Please Wait")
    } else {
      return(
      <div className="drinkersContainer">
        <h1 className="drinkersPageTitle">Drinkers Page</h1>
        <Navbar />
        <div className="selectBarTable">
          <div className="chartsAndTable">
            <div className="drinkersBarChart">
            <h4>{this.state.selectedDrinker}'s Drinks Breakdown</h4>
              <DrinkersBarChart drinks={this.state.drinks}
                                drinkTypes={this.state.drinkTypes}
                                selectedDrinker={this.state.selectedDrinker} />
            </div>
            <div className="drinkersTable">
              <DrinkersTable drinks={this.state.drinks}
                             drinkers={this.state.drinkers}
                             drinkTypes={this.state.drinkTypes}
                             selectedDrinker={this.state.selectedDrinker}
                             regularDrinkers={this.state.regularDrinkers}
                             irregularDrinkers={this.state.irregularDrinkers}
                             onSelectDrinker={this.onSelectDrinker}/>
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}
  export default Drinkers;
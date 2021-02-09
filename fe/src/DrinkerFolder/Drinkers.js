import React, { Component } from 'react';
import DrinkersBarChart from './DrinkersBarChart';
import DrinkersTable from './DrinkersTable';
import Navbar from '../MyUtilitiesFolder/Navbar.js'
import backgroundImage from '../MyUtilitiesFolder/BackgroundImages/backgroundBarImage.webp';
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

  backToAllDrinkers() {
    this.setState({ selectedDrinker: "All Drinkers" });

  }

  render() {
    if(!this.state.drinks) {
      return("Please Wait")
    } else {
      return(
      <div className="drinkersContainer">
        <h1 className="drinkersPageTitle">Drinkers Page</h1>
        <Navbar />
        {this.state.selectedDrinker === "All Drinkers" ?
          <div className="allDrinkersPlayArea">
            <div className="allDrinkersBarChart">
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
                               onSelectDrinker={this.onSelectDrinker} />
              </div>
          </div> :
          <div className="selectedDrinkerPlayArea">
            <button className="backToAllDrinkersButton" onClick={() => this.backToAllDrinkers()}>Return to All Drinkers</button>
            <div className="drinkerProfilePic">
              Photo Here
            </div>
            <div className="selectDrinkerBarChart">
              <DrinkersBarChart drinks={this.state.drinks}
                                drinkTypes={this.state.drinkTypes}
                                selectedDrinker={this.state.selectedDrinker} />
            </div>
          </div>
          }
        </div>
      )
    }
  }
}
  export default Drinkers;
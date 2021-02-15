import React, { Component } from 'react';
import DrinkersBarChart from './DrinkersBarChart';
import DrinkersTable from './DrinkersTable';
import DrinkersTopRatings from './DrinkersTopRatings';
import DrinkersRatingPieChart from './DrinkersRatingPieChart';
import DrinkersMilestonesTable from './DrinkersMilestonesTable';
import Navbar from '../MyUtilitiesFolder/Navbar.js'
import backgroundImage from '../MyUtilitiesFolder/BackgroundImages/backgroundBarImage.webp';
import '../Stylesheets/DrinkersPageSS/Drinkers.css'
import maleDefaultPhoto from '../MyUtilitiesFolder/DefaultProfilePhotos/defaultMaleProfile.jpg';
import femaleDefaultPhoto from '../MyUtilitiesFolder/DefaultProfilePhotos/defaultFemaleProfile.jpg';

class Drinkers extends Component {
  constructor(props) {
    super(props)
      this.onSelectDrinker = this.onSelectDrinker.bind(this)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        selectedDrinker: "All Drinkers",
        selectedDrinkerProfilePic: null,
        selectedDrinkerTitle: null,
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

  onSelectDrinker(clickedRowName) {
    this.setState({ selectedDrinker: clickedRowName });
    this.state.drinkers.map((drinker) => {
      if(drinker.personName === clickedRowName) {
        this.setState({ selectedDrinkerProfilePic: drinker.profilePic,
                        selectedDrinkerTitle: drinker.title });
      }
    })
  }

  backToAllDrinkers() {
    this.setState({ selectedDrinker: "All Drinkers",
                    selectedDrinkerProfilePic: null });

  }

  render() {
    if(!this.state.drinks) {
      return("Please Wait")
    } else {
      return(
      <div className="drinkersContainer">
        <h1 className="drinkersPageTitle">{this.state.selectedDrinker}</h1>
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
            <div className="selectedDrinkerImg">
              <img className="drinkerProfileImage" src={this.state.selectedDrinkerProfilePic ? this.state.selectedDrinkerProfilePic :
                      this.state.selectedDrinkerTitle === "Queen" ? femaleDefaultPhoto : maleDefaultPhoto}/>
              <p className="returnToDrinkersLink" onClick={() => this.backToAllDrinkers()}>Return to All Drinkers</p>
            </div>
            <div className="selectDrinkerRatingPieChart">
              <DrinkersRatingPieChart drinks={this.state.drinks}
                                      selectedDrinker={this.state.selectedDrinker} />
            </div>
            <div className="selectDrinkerBarChart">
              <DrinkersBarChart drinks={this.state.drinks}
                                drinkTypes={this.state.drinkTypes}
                                selectedDrinker={this.state.selectedDrinker} />
            </div>
            <div className="topRatingWords">
              <DrinkersTopRatings drinks={this.state.drinks}
                                  selectedDrinker={this.state.selectedDrinker} />
            </div>
            <div className="milestoneDatesComponent">
              <DrinkersMilestonesTable drinks={this.state.drinks}
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
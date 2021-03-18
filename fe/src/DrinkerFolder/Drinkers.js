import React, { Component } from 'react';
import DrinkersBarChart from './DrinkersBarChart';
import DrinkersTable from './DrinkersTable';
import DrinkersTopRatings from './DrinkersTopRatings';
import DrinkersRatingPieChart from './DrinkersRatingPieChart';
import DrinkersMilestonesTable from './DrinkersMilestonesTable';
import TableModal from '../MyUtilitiesFolder/TableModal';
import Navbar from '../MyUtilitiesFolder/Navbar.js'
import backgroundImage from '../MyUtilitiesFolder/BackgroundImages/backgroundBarImage.webp';
import '../Stylesheets/DrinkersPageSS/Drinkers.css'
import maleDefaultPhoto from '../MyUtilitiesFolder/DefaultProfilePhotos/defaultMaleProfile.jpg';
import femaleDefaultPhoto from '../MyUtilitiesFolder/DefaultProfilePhotos/defaultFemaleProfile.jpg';

class Drinkers extends Component {
  constructor(props) {
    super(props)
      this.onSelectDrinker = this.onSelectDrinker.bind(this)
      this.handleSelectedDate = this.handleSelectedDate.bind(this)
      this.resetSelectedChoices = this.resetSelectedChoices.bind(this)
      this.handleSelectedRatingWord = this.handleSelectedRatingWord.bind(this)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        selectedDrinker: "All Drinkers",
        selectedDrinkerProfilePic: null,
        selectedDrinkerTitle: null,
        selectedDate: null,
        selectedRatingWord: null,
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

  handleSelectedDate(selectedDate) {
    this.setState({ selectedDate })
  }

  handleSelectedRatingWord(selectedRatingWord) {
    this.setState({ selectedRatingWord })
  }

  resetSelectedChoices() {
    this.setState({ selectedDate: null, selectedRatingWord: null })
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
              <button className="returnToDrinkersLink" onClick={() => this.backToAllDrinkers()}>Return to All Drinkers</button>
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
                                  selectedDrinker={this.state.selectedDrinker}
                                  handleSelectedRatingWord={this.handleSelectedRatingWord} />
            </div>
            <div className="milestoneDatesComponent">
              <DrinkersMilestonesTable drinks={this.state.drinks}
                                       selectedDrinker={this.state.selectedDrinker}
                                       handleSelectedDate={this.handleSelectedDate} />
            </div>
            {this.state.selectedDate && <TableModal selectedDate={this.state.selectedDate}
                                                    resetSelectedChoices={this.resetSelectedChoices}
                                                    selectedDrinker={this.state.selectedDrinker}
                                                    drinks={this.state.drinks} />
            }
            {this.state.selectedRatingWord && <TableModal selectedRatingWord={this.state.selectedRatingWord}
                                                    resetSelectedChoices={this.resetSelectedChoices}
                                                    selectedDrinker={this.state.selectedDrinker}
                                                    drinks={this.state.drinks} />
              }
          </div>
          }
        </div>
      )
    }
  }
}
  export default Drinkers;
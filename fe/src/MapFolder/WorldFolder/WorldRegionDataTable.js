import React, { Component } from 'react';
import '../../Stylesheets/WorldPageSS/WorldRegionDataTable.css'
const { getName } = require("country-list");


class WorldRegionDataTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        regionCode: null,
        regionName: null,
        drinks: null
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    this.setState({ drinks })
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, regionCode, regionName } = this.props
    if(regionCode !== this.state.regionCode || drinks !== this.state.drinks) {
      this.setState({ regionCode, regionName, drinks })
    }
  }

  renderClickedCountryHeader() {
    const { regionCode } = this.state
    return(
      <tr className="drinkRegionHeader">
          {!regionCode ? <th>Country</th> : ""}
          <th>Drinker</th>
          <th>Drink</th>
          <th>Drink Type</th>
          <th>Rating Words</th>
          <th>Score</th>
          <th>Brand</th>
          <th>Company</th>
      </tr>
    )
  }

  allCountryData() {
    const { drinks } = this.state
    if(drinks) {
    const orderedDrinks = drinks.sort((a, b) => (a.country > b.country) ? 1 : -1)

    return orderedDrinks.map((drink, index) => {
      return(
        <tr key={index}>
          <td>{drink.secondCollabCountry ? `${getName(drink.country)} / ${getName(drink.firstCollabCountry)} / ${getName(drink.secondCollabCountry)}` :
               drink.firstCollabCountry ? `${getName(drink.country)} / ${getName(drink.firstCollabCountry)}` :
               `${getName(drink.country)}`}</td>
          <td className="drinkRegionData">{drink.name}</td>
          <td className="drinkRegionData">{drink.mixerSeven ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive}, ${drink.mixerSix} and ${drink.mixerSeven}` :
                                          drink.mixerSix ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive} and ${drink.mixerSix}` :
                                          drink.mixerFive ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour} and ${drink.mixerFive}` :
                                          drink.mixerFour ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree} and ${drink.mixerFour}` :
                                          drink.mixerThree ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo} and ${drink.mixerThree}` :
                                          drink.mixerTwo ? `${drink.drinkMain} with ${drink.mixerOne} and ${drink.mixerTwo}` :
                                          drink.mixerOne ? `${drink.drinkMain} with ${drink.mixerOne}` :
                                          `${drink.drinkMain}`}</td>
          <td className="drinkRegionData">{drink.drinkType}</td>
          <td className="drinkRegionData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
          <td className="drinkRegionData">{drink.score}</td>
          <td className="drinkRegionData">{drink.brand}</td>
          <td className="drinkRegionData">{drink.company}</td>
        </tr>
      )
    })
  }
  }

  renderClickedCountryData() {
    const selectedDrinks = []
    const { regionCode, drinks } = this.state
    if(drinks) {
        drinks
        .filter(drink => drink.country === regionCode || drink.firstCollabCountry === regionCode || drink.secondCollabCountry === regionCode)
        .map(drink => selectedDrinks.push(drink))
      const orderedSelectedDrinks = selectedDrinks.sort((a, b) => (a.name > b.name) ? 1 : -1)

      return orderedSelectedDrinks.map((drink, index) => {
        return(
          <tr key={index}>
            <td className="drinkRegionData">{drink.name}</td>
            <td className="drinkRegionData">{drink.mixerSeven ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive}, ${drink.mixerSix} and ${drink.mixerSeven}` :
                                            drink.mixerSix ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive} and ${drink.mixerSix}` :
                                            drink.mixerFive ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour} and ${drink.mixerFive}` :
                                            drink.mixerFour ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree} and ${drink.mixerFour}` :
                                            drink.mixerThree ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo} and ${drink.mixerThree}` :
                                            drink.mixerTwo ? `${drink.drinkMain} with ${drink.mixerOne} and ${drink.mixerTwo}` :
                                            drink.mixerOne ? `${drink.drinkMain} with ${drink.mixerOne}` :
                                            `${drink.drinkMain}`}</td>
            <td className="drinkRegionData">{drink.drinkType}</td>
            <td className="drinkRegionData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
            <td className="drinkRegionData">{drink.score}</td>
            <td className="drinkRegionData">{drink.brand}</td>
            <td className="drinkRegionData">{drink.company}</td>
          </tr>
        )
      })
    }
  }

  render() {
    const { regionName, regionCode } = this.state
      return (
        <div className="selectedCountryDiv">
          <table className='selectedCountryTable'>
            <thead>
              <tr>
                {!regionCode ? <th colSpan="8" className="regionRegionHeader">All Drinks By Country</th> :
                               <th colSpan="7" className="regionRegionHeader">{regionName}</th>}
              </tr>
                {this.renderClickedCountryHeader()}
            </thead>
            <tbody>
              {!regionCode ? this.allCountryData() : this.renderClickedCountryData()}
            </tbody>
          </table>
        </div>
      )
    }
  // }
}

export default WorldRegionDataTable;


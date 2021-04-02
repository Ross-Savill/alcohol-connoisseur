import React, { Component } from 'react';
import '../../Stylesheets/USPageSS/USRegionDataTable.css'

class USRegionDataTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        regionCode: null,
        regionName: null,
        drinks: null
      }
  }

  componentDidMount() {
    const { drinks, regionCode, regionName} = this.props
    this.setState({ drinks, regionCode, regionName })
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, chosenMap, regionCode, regionName } = this.props
    if(drinks !== this.state.drinks || regionCode !== this.state.regionCode) {
      this.setState({ regionCode, regionName, drinks, chosenMap })
    }
  }

  renderClickedCountryHeader() {
    return(
      <tr className="usDrinkRegionHeader">
        <th>Drinker</th>
        <th>Drink</th>
        <th>Type</th>
        <th>Rating Words</th>
        <th>Score</th>
        <th>Brand</th>
        <th>Company</th>
      </tr>
    )
  }

  renderClickedCountryData() {
    const selectedDrinks = []
    const { regionCode, drinks } = this.state

    if(!regionCode) {
      drinks
      .filter(drink => drink.country === "US" ||
                       drink.firstCollabCountry === "US" ||
                       drink.secondCollabCountry === "US")
      .map(drink => selectedDrinks.push(drink))
    } else {
      drinks
      .filter(drink => drink.ukUsa === regionCode ||
                       drink.firstUkUsa === regionCode ||
                       drink.secondUkUsa === regionCode)
      .map(drink => selectedDrinks.push(drink))
    }

    const orderedSelectedDrinks = selectedDrinks.sort((a, b) => (a.name > b.name) ? 1 : -1)
    return orderedSelectedDrinks.map((drink, index) => {
      return(
        <tr key={index}>
          <td className="usDrinkRegionData">{drink.name}</td>
          <td className="usDrinkRegionData">{drink.mixerEight ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive}, ${drink.mixerSix}, ${drink.mixerSeven} and ${drink.mixerEight}` :
                                             drink.mixerSeven ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive}, ${drink.mixerSix} and ${drink.mixerSeven}` :
                                             drink.mixerSix ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive} and ${drink.mixerSix}` :
                                             drink.mixerFive ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour} and ${drink.mixerFive}` :
                                             drink.mixerFour ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree} and ${drink.mixerFour}` :
                                             drink.mixerThree ? `${drink.drinkMain} with ${drink.mixerOne}, ${drink.mixerTwo} and ${drink.mixerThree}` :
                                             drink.mixerTwo ? `${drink.drinkMain} with ${drink.mixerOne} and ${drink.mixerTwo}` :
                                             drink.mixerOne ? `${drink.drinkMain} with ${drink.mixerOne}` :
                                             `${drink.drinkMain}`}</td>
          <td className="usDrinkRegionData">{drink.drinkType}</td>
          <td className="usDrinkRegionData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
          <td className="usDrinkRegionData">{drink.score}</td>
          <td className="usDrinkRegionData">{drink.brand}</td>
          <td className="usDrinkRegionData">{drink.company}</td>
        </tr>
      )
    })
  }

  render() {
    const { drinks, regionName } = this.state
    if(!drinks) {
      return <p>One Moment Please</p>
    } else {
      return (
        <div className="usSelectedState">
          <table className='usSelectedStateTable'>
            <thead>
              <tr>
                <th colSpan="7" className="usRegionHeader">{regionName}</th>
              </tr>
                {this.renderClickedCountryHeader()}
            </thead>
            <tbody>
              {this.renderClickedCountryData()}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default USRegionDataTable;

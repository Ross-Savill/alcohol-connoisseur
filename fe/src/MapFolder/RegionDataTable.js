import React, { Component } from 'react';

class RegionDataTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        regionCode: null,
        regionName: null,
        chosenMap: null,
        drinks: null
      }
  }
  componentDidUpdate(prevProps, prevState) {
    const { drinks, chosenMap, regionCode, regionName } = this.props
    if(regionCode !== this.state.regionCode) {
      this.setState({ regionCode, regionName, drinks, chosenMap })
    }
  }

  renderClickedCountryHeader() {
    return(
      <tr>
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

  renderClickedCountryData() {
    const selectedDrinks = []

    const { chosenMap, regionCode, drinks } = this.state

    if(chosenMap === "world") {
      drinks
      .filter(drink => drink.country === regionCode)
      .map(drink => selectedDrinks.push(drink))
    } else if(chosenMap === "usa") {
      drinks
      .filter(drink => drink.ukUsa === regionCode ||
                       drink.firstUkUsa === regionCode ||
                       drink.secondUkUsa === regionCode)
      .map(drink => selectedDrinks.push(drink))
    }

    return selectedDrinks.map((drink, index) => {
      if(drink.mixerTwo) {
        return(
          <tr key={index}>
            <td className="drinkData">{drink.name}</td>
            <td className="drinkData">{drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo}</td>
            <td className="drinkData">{drink.drinkType}</td>
            <td className="drinkData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
            <td className="drinkData">{drink.score}</td>
            <td className="drinkData">{drink.brand}</td>
            <td className="drinkData">{drink.company}</td>
          </tr>
        )
      } else if(drink.mixerOne) {
          return(
          <tr key={index}>
            <td className="drinkData">{drink.name}</td>
            <td className="drinkData">{drink.drinkMain} with {drink.mixerOne}</td>
            <td className="drinkData">{drink.drinkType}</td>
            <td className="drinkData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
            <td className="drinkData">{drink.score}</td>
            <td className="drinkData">{drink.brand}</td>
            <td className="drinkData">{drink.company}</td>
          </tr>
          )
      } else {
          return (
            <tr key={index}>
              <td className="drinkData">{drink.name}</td>
              <td className="drinkData">{drink.drinkMain}</td>
              <td className="drinkData">{drink.drinkType}</td>
              <td className="drinkData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
              <td className="drinkData">{drink.score}</td>
              <td className="drinkData">{drink.brand}</td>
              <td className="drinkData">{drink.company}</td>
            </tr>
          )
      }
    })
  }

  render() {
    const { regionName } = this.state
    if(!this.state.regionCode) {
      return <p>Select a Country for Data</p>
    } else {
      return (
        <div className="selectedCountry">
          <table className='selectedCountryTable'>
            <thead>
              <tr>
                <th>{regionName}</th>
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

export default RegionDataTable;


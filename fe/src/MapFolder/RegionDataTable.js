import React, { Component } from 'react';
import '../Stylesheets/RegionDataTable.css'

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
      <tr className="drinkRegionHeader">
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

    const orderedSelectedDrinks = selectedDrinks.sort((a, b) => (a.name > b.name) ? 1 : -1)

    return orderedSelectedDrinks.map((drink, index) => {
      if(drink.mixerTwo) {
        return(
          <tr key={index}>
            <td className="drinkRegionData">{drink.name}</td>
            <td className="drinkRegionData">{drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo}</td>
            <td className="drinkRegionData">{drink.drinkType}</td>
            <td className="drinkRegionData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
            <td className="drinkRegionData">{drink.score}</td>
            <td className="drinkRegionData">{drink.brand}</td>
            <td className="drinkRegionData">{drink.company}</td>
          </tr>
        )
      } else if(drink.mixerOne) {
          return(
          <tr key={index}>
            <td className="drinkRegionData">{drink.name}</td>
            <td className="drinkRegionData">{drink.drinkMain} with {drink.mixerOne}</td>
            <td className="drinkRegionData">{drink.drinkType}</td>
            <td className="drinkRegionData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
            <td className="drinkRegionData">{drink.score}</td>
            <td className="drinkRegionData">{drink.brand}</td>
            <td className="drinkRegionData">{drink.company}</td>
          </tr>
          )
      } else {
          return (
            <tr key={index}>
              <td className="drinkRegionData">{drink.name}</td>
              <td className="drinkRegionData">{drink.drinkMain}</td>
              <td className="drinkRegionData">{drink.drinkType}</td>
              <td className="drinkRegionData">{drink.ratingWordOne} {drink.ratingWordTwo}</td>
              <td className="drinkRegionData">{drink.score}</td>
              <td className="drinkRegionData">{drink.brand}</td>
              <td className="drinkRegionData">{drink.company}</td>
            </tr>
          )
      }
    })
  }

  render() {
    const { regionName } = this.state
    if(!this.state.regionCode) {
      return <h2 className="selectRegionText">Select a Region for Data</h2>
    } else {
      return (
        <div className="selectedCountry">
          <table className='selectedCountryTable'>
            <thead>
              <tr>
                <th colSpan="7" className="regionRegionHeader">{regionName}</th>
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


import React, { Component } from 'react';

class CountryTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        country: null,
        drinks: null
      }
  }
  componentDidUpdate(prevProps, prevState) {
    const currentPropCountry = this.props.countryCode
    const currentPropDrinks = this.props.drinks
    if(currentPropCountry !== this.state.country) {
      this.setState({ country: currentPropCountry ,
                      drinks: currentPropDrinks})
    }
  }

  renderClickedCountryHeader() {
    return(
      <tr>
          <th>Drinker</th>
          <th>Drink</th>
          <th>Drink Type</th>
          <th>Score</th>
          <th>Brand</th>
          <th>Company</th>
      </tr>
    )
  }

  renderClickedCountryData() {
    const { country, drinks } = this.state
    return drinks
      .filter(drink => drink.country === country)
      .map((drink, index) => {
        if(drink.mixerTwo) {
          return(
            <tr key={index}>
              <td className="drinkData">{drink.name}</td>
              <td className="drinkData">{drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo}</td>
              <td className="drinkData">{drink.drinkType}</td>
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
                <td className="drinkData">{drink.score}</td>
                <td className="drinkData">{drink.brand}</td>
                <td className="drinkData">{drink.company}</td>
              </tr>
            )
        }
      })
  }

  render() {
    const { country } = this.state
    if(!this.state.country) {
      return <p>Select a Country for Data</p>
    } else {
      return (
        <div className="selectedCountry">
          <table className='selectedCountryTable'>
            <thead>
              <tr>
                <th>{country}</th>
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

export default CountryTable;


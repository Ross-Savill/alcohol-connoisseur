import React, { Component } from 'react';
import '../../Stylesheets/WorldPageSS/WorldDrinkerDataTable.css';
const { getName } = require("country-list");

class WorldDrinkerDataTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        regionCode: null,
        regionName: null,
        drinks: null,
        selectedDrinksPerDrinker: []
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    this.setState({ drinks })
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, regionCode, regionName } = this.props
    if(prevState.drinks !== drinks || prevState.regionCode !== regionCode) {
      this.setState({ regionCode, regionName, drinks })
    }
  }

  renderCountryDataHeader() {
    const { regionCode } = this.state
    if(!regionCode) {
      return (
        <tr className="drinkerTableRowHeader">
          <th>Country</th>
          <th>Drink Count</th>
          <th>Avg Score</th>
        </tr>
      )
    } else {
      return(
        <tr className="drinkerTableRowHeader">
          <th>Drinker</th>
          <th>Drink Count</th>
          <th>Avg Score</th>
        </tr>
      )
    }
  }

  renderAllCountryData() {
    const { drinks } = this.state
    if(drinks) {
    // DEFAULT NO COUNTRY SELECTED
      const drinksByCountry = drinks.reduce(function(memo, drink) {
        if (!memo[drink["country"]]) { memo[drink["country"]] = []; }
        memo[drink["country"]].push(drink);
        return memo;
      }, {});

      return Object.keys(drinksByCountry)
        .sort(function(a,b) { { return drinksByCountry[a].length < drinksByCountry[b].length }})
        .map(function(key) {
          return(
            <tr key={key}>
              <td>{getName(key)}</td>
              <td>{drinksByCountry[key].length}</td>
              <td>{(drinksByCountry[key].reduce((a,b) => a + b.score, 0) / drinksByCountry[key].length).toFixed(2)}</td>
            </tr>
          )
        })
    }
  }

  renderClickedDrinkerData() {
    const { regionCode, drinks } = this.state
    if(drinks){

      //ESTABLISH SELECTED DRINKS ARRAY
      const selectedDrinks = []
      drinks
      .filter(drink => drink.country === regionCode)
      .map(drink => selectedDrinks.push(drink))
      //ESTABLISH UNIQUE DRINKERS ARRAY
      const uniqueDrinkerNames = [...new Set(selectedDrinks.map(drink => drink.name))];

      //ESTABLISH NUMBER OF DRINKS PER PERSON ARRAY AND AVG SCORES ARRAY
      let drinksPerPerson = []
      let averageScoresArray = []

      uniqueDrinkerNames.map((name) => {
        let drinksCounter = 0
        let drinkerScores = []
        selectedDrinks.map((drink) => {
          if(name === drink.name) {
            drinksCounter++
            drinkerScores.push(drink.score)
          }
        })
        drinksPerPerson.push(drinksCounter)
        averageScoresArray.push(drinkerScores)
      })

      //ESTABLISH DRINKER AVERAGE SCORE
      const averageScores = averageScoresArray.map((drinkerArray) => {
        const sum = drinkerArray.reduce((a, b) => a + b, 0)
        const avg = (sum / drinkerArray.length) || 0;
        return avg.toFixed(2)
      })

      //BRING ALL TOGETHER IN AN OBJECT
      const unorganisedDrinkersData = uniqueDrinkerNames.map((name, index) => {
        return {
          name: uniqueDrinkerNames[index],
          drinksNumber: drinksPerPerson[index],
          averageScore: averageScores[index]
        }
      });

      //ORGANISE THE OBJECTS
      const finalDrinkersData = unorganisedDrinkersData.sort(function(a,b){return b.averageScore-a.averageScore})

      //RENDER IN TABLE DATA
      return finalDrinkersData.map((drinkObj, index) => {
        return(
          <tr key={index}>
            <td className="drinkDataNameText">{drinkObj.name}</td>
            <td className="drinkDataNumberText">{drinkObj.drinksNumber}</td>
            <td className="drinkDataAvgScoreText">{drinkObj.averageScore}</td>
          </tr>
        )
      })
    }
  }

  render() {
    const { regionCode, regionName } = this.state
      return (
        <div className="selectedCountryDiv">
          <table className='selectedCountryTable'>
            <thead>
              <tr>
                {!regionCode ? <th colSpan="3">All Countries In Drink And Rate</th> :
                  <th colSpan="3">
                    <span className="regionNameSpan">{regionName}</span>
                    <span className="allCountryReturnSpan" onClick={this.props.resetSelectedCountry}>Return To All Countries</span>
                  </th>
                }
              </tr>
                {this.renderCountryDataHeader()}
            </thead>
            <tbody>
              {!regionCode ? this.renderAllCountryData() : this.renderClickedDrinkerData() }
            </tbody>
          </table>
        </div>
      )
  }
}

export default WorldDrinkerDataTable;
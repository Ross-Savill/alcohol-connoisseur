import React, { Component } from 'react';
import './DrinkerDataTable.css';

class DrinkerDataTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        regionCode: null,
        regionName: null,
        chosenMap: null,
        drinks: null,
        selectedDrinksPerDrinker: []
      }
  }
  componentDidUpdate(prevProps, prevState) {
    const { drinks, chosenMap, regionCode, regionName } = this.props
    if(regionCode !== this.state.regionCode) {
      this.setState({ regionCode, regionName, drinks, chosenMap })
    }
  }

  renderClickedDrinkerHeader() {
    return(
      <tr>
          <th>Drinker</th>
          <th>Drink Count</th>
          <th>Avg Score</th>
      </tr>
    )
  }

  renderClickedDrinkerData() {
    const { chosenMap, regionCode, drinks } = this.state
    const selectedDrinks = []

    //ESTABLISH SELECTED DRINKS ARRAY
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
          <td className="drinkData">{drinkObj.name}</td>
          <td className="drinkData">{drinkObj.drinksNumber}</td>
          <td className="drinkData">{drinkObj.averageScore}</td>
        </tr>
      )
    })
  }

  render() {
    const { regionName } = this.state
    if(!this.state.regionCode) {
      return <p>Select a Country for Drinker Info</p>
    } else {
      return (
        <div className="selectedCountry">
          <table className='selectedCountryTable'>
            <thead>
              <tr>
                <th colSpan="3" className="drinkerRegionName">{regionName}</th>
              </tr>
                {this.renderClickedDrinkerHeader()}
            </thead>
            <tbody>
              {this.renderClickedDrinkerData()}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default DrinkerDataTable;
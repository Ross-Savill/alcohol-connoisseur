import React, { Component } from 'react';

class DrinkersTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        selectedDrinker: 'All Drinkers',
        regularDrinkers: null,
        irregularDrinkers: null
      }
    }

    componentDidMount() {
      const { drinks, drinkers, drinkTypes, selectedDrinker, regularDrinkers, irregularDrinkers } = this.props
      this.setState({ drinks, drinkers, drinkTypes, selectedDrinker, regularDrinkers, irregularDrinkers })
    }

    renderDrinkerHeader() {
      return(
        <tr>
          <th>Name</th>
          <th>Number of Drinks</th>
          <th>Weeks Participated</th>
          <th>Avg Drinks Had Per Visit</th>
          <th>Favourite Drink Type</th>
          <th>Highest Ever Score</th>
          <th>Lowest Ever Score</th>
          <th>Average Score</th>
          <th>Percent of All Drinks Drunk</th>
        </tr>
      )
    }

    renderDrinkerData() {
      if(!this.state.drinks) {
        return "Please Wait"
      } else {

        const { drinks, drinkers } = this.state
        let allDrinkersArrays = []
        let drinkerObjectsArray = []

        //ESTABLISH ARRAY OF ARRAYS OF DRINKERS
        drinkers.map((drinker) => {
          let oneDrinkerArray = []
          drinks.map((drink) => {
            if(drink.name === drinker.drinker) {
              oneDrinkerArray.push(drink)
            }
          })
          allDrinkersArrays.push(oneDrinkerArray)
        })

        //SET UP DRINKER OBJECTS
          allDrinkersArrays.map((aDrinkArray) => {
            console.log("A new array map")
            // GET DRINKER NAME
            const drinkerName = aDrinkArray
            .map(drink => drink.name)
            .filter((value, index, self) => self.indexOf(value) === index)

            // GET NUMBER OF DRINKS
            const numOfDrinks = aDrinkArray.length
            // GET WEEKS PARTICIPATED
            const weeksParticipated =  "TBC"
            // GET AVERAGE DRINK CONSUMED
            const drinksAvg = "TBC"
            // GET FAVOURITE DRINK TYPE
            let allDrinkerDrinkTypes = []
            aDrinkArray.map((drink) => allDrinkerDrinkTypes.push(drink.drinkType))
            let frequency = {};
            let maxType = 0;
            let favouriteDrinkType;
            for(let type in allDrinkerDrinkTypes) {
              frequency[allDrinkerDrinkTypes[type]]=(frequency[allDrinkerDrinkTypes[type]] || 0)+1; // increment frequency.
              if(frequency[allDrinkerDrinkTypes[type]] > maxType) { // is this frequency > max so far ?
                maxType = frequency[allDrinkerDrinkTypes[type]];  // update max.
                favouriteDrinkType = allDrinkerDrinkTypes[type];          // update result.
              }
            }
            // GET HIGHEST/LOWEST/AVERAGE SCORE
            let allDrinkerScores = []
            aDrinkArray.map((drink) => allDrinkerScores.push(drink.score))
            const highestScore = Math.max(...allDrinkerScores)
            const lowestScore = Math.min(...allDrinkerScores)
            const averageScoreFunc = allDrinkerScores => allDrinkerScores.reduce(
              (prevScore, currScore) => prevScore + currScore, 0 ) / allDrinkerScores.length;
            const averageScore = (averageScoreFunc(allDrinkerScores)).toFixed(2)

            // GET % OF TOTAL DRINKS DRUNK
            const percentOfTotal = ((aDrinkArray.length / drinks.length) * 100).toFixed(2) + '%'

            const drinkerObject = {
              drinkerName: drinkerName[0],
              drinksNum: numOfDrinks,
              drinkerWeeks: weeksParticipated,
              drinkerAvgConsume: drinksAvg,
              drinkerFaveType: favouriteDrinkType,
              drinkerHighScore: highestScore,
              drinkerLowScore: lowestScore,
              drinkerAvgScore: averageScore,
              drinkerDrinkPercentage: percentOfTotal
            }
            drinkerObjectsArray.push(drinkerObject)
          })

      return drinkerObjectsArray.map((dataObject) => {
        return(
          <tr>
            <td>{dataObject.drinkerName}</td>
            <td>{dataObject.drinksNum}</td>
            <td>{dataObject.drinkerWeeks}</td>
            <td>{dataObject.drinkerAvgConsume}</td>
            <td>{dataObject.drinkerFaveType}</td>
            <td>{dataObject.drinkerHighScore}</td>
            <td>{dataObject.drinkerLowScore}</td>
            <td>{dataObject.drinkerAvgScore}</td>
            <td>{dataObject.drinkerDrinkPercentage}</td>
          </tr>
        )
      })
      }
    }

  render() {
    return(
      <div>
        <table className="drinkersTable">
          <thead>
            {this.renderDrinkerHeader()}
          </thead>
          <tbody>
            {this.renderDrinkerData()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DrinkersTable;
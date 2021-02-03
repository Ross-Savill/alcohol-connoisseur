import React, { Component } from 'react';
import '../Stylesheets/DrinkersPageSS/DrinkersTable.css';

class DrinkersTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        selectedDrinker: 'All Drinkers',
        regularDrinkers: null,
        irregularDrinkers: null,
        drinkerObjectsArray: null,
        irregDrinkersCheck: false,
        sort: {
          column: null,
          direction: 'desc',
        },
      }
    }

    componentDidMount() {
      const { drinks, drinkers, drinkTypes, selectedDrinker, regularDrinkers, irregularDrinkers } = this.props
      this.setState({ drinks, drinkers, drinkTypes, selectedDrinker, regularDrinkers, irregularDrinkers })
    }

    componentDidUpdate() {
      this.setDrinkerData()
    }

    renderDrinkerHeader() {
      return(
        <tr className="tRDrinkerHeader">
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerName")}>Name</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinksNum")}>Number of Drinks</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerWeeks")}>Weeks Participated</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerAvgConsume")}>Avg Drinks Per Visit</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerAvgStrength")}>Avg Strength (Beer/Cider)</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerFaveType")}>Favourite Drink Type</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerHighScore")}>Highest Ever Score</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerLowScore")}>Lowest Ever Score</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerAvgScore")}>Average Score</th>
          <th className="tHDrinkerHeader" onClick={e => this.onSort("drinkerDrinkPercentage")}>Percent of All Drinks Drunk</th>
        </tr>
      )
    }

    setDrinkerData() {
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
            if(drink.name === drinker.personName) {
              oneDrinkerArray.push(drink)
            }
          })
          allDrinkersArrays.push(oneDrinkerArray)
        })
        //SET UP DRINKER OBJECTS
          allDrinkersArrays.map((aDrinkArray) => {
            // GET DRINKER NAME
            const drinkerName = aDrinkArray
            .map(drink => drink.name)
            .filter((value, index, self) => self.indexOf(value) === index)

            // GET NUMBER OF DRINKS
            const numOfDrinks = aDrinkArray.length

            // GET WEEKS PARTICIPATED
            let allDrinksDates = []
            aDrinkArray.map((drink) => {
              const drinkDate = new Date(drink.date)
              const date = +drinkDate.getDate() + "/" + drinkDate.getMonth() + "/" + drinkDate.getFullYear()
              allDrinksDates.push(date)
            })
            const weeksParticipated =  new Set(allDrinksDates).size

            // GET AVERAGE DRINK CONSUMED
            const drinksAvg = (numOfDrinks / weeksParticipated).toFixed(2)

            // GET AVERAGE DRINK STRENGTH
            let allDrinkStrengths = []
            aDrinkArray.map((drink) => {
              if(drink.drinkType === "Beer" || drink.drinkType === "Cider") {
                allDrinkStrengths.push(drink.abv)
              }
            })
            let averageDrinkStrength = "";

            if(allDrinkStrengths.length === 0) {
              averageDrinkStrength = "-"
            } else {
              const sumOfAbvs = allDrinkStrengths.reduce((a, b) => a + b, 0);
              averageDrinkStrength = ((sumOfAbvs / allDrinkStrengths.length)*100).toFixed(2) + '%' || 0;
            }

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
              drinkerAvgStrength: averageDrinkStrength,
              drinkerFaveType: favouriteDrinkType,
              drinkerHighScore: highestScore,
              drinkerLowScore: lowestScore,
              drinkerAvgScore: averageScore,
              drinkerDrinkPercentage: percentOfTotal
            }
            drinkerObjectsArray.push(drinkerObject)
          })
        if(!this.state.drinkerObjectsArray) {
          this.setState({ drinkerObjectsArray })
        }
      }
    }

    renderDrinkerData() {
      const { drinks, drinkerObjectsArray } = this.state

        // ESTABLISH TOTAL WEEKS SO FAR FOR LATER DATE COMPARISON
        let totalWeeks = []
        drinks.map((drink) => {
          const thisDrinkDate = new Date(drink.date)
          const oneDrinkDate =  +thisDrinkDate.getDate() + "/" + thisDrinkDate.getMonth() + "/" + thisDrinkDate.getFullYear()
          totalWeeks.push(oneDrinkDate)
        })
        const totalWeeksNumber =  new Set(totalWeeks).size

        // RETURN DATA TABLE INFO!
        return drinkerObjectsArray.map((dataObject, index) => {
          if(this.state.irregDrinkersCheck === false && dataObject.drinkerWeeks/totalWeeksNumber*100 < 15) {
            return;
          } else {
            return(
              <tr key={index} className="tableRowDrinkersTable">
                <td className="tableDataDrinkersTable">{dataObject.drinkerName}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinksNum}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerWeeks} / {totalWeeksNumber} ({parseFloat(dataObject.drinkerWeeks/totalWeeksNumber*100).toFixed(0)}%)</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerAvgConsume}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerAvgStrength}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerFaveType}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerHighScore}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerLowScore}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerAvgScore}</td>
                <td className="tableDataDrinkersTable">{dataObject.drinkerDrinkPercentage}</td>
              </tr>
            )
          }
        })
    }

    onSort(column) {
      const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';

      // SORT DATA BY PERSON NAME
      const sortedNameData = () => {
        const dataSortedByName = this.state.drinkerObjectsArray.sort((a, b) => {
          const firstText = a.drinkerName.toUpperCase();
          const secondText = b.drinkerName.toUpperCase();
          if (firstText < secondText) return -1;
          else if (firstText > secondText) return 1;
          return 0;
        });
        if (direction === 'desc') dataSortedByName.reverse();
        this.setState({ drinkerObjectsArray: dataSortedByName,
                        sort: { column, direction }
                      });
      }

      // SORT DATA BY DRINK TYPE
      const sortedDrinkTypeData = () => {
        const dataSortedByDrinkType = this.state.drinkerObjectsArray.sort((a, b) => {
          const firstText = a.drinkerFaveType.toUpperCase();
          const secondText = b.drinkerFaveType.toUpperCase();
          if (firstText < secondText) return -1;
          else if (firstText > secondText) return 1;
          return 0;
        });
        if (direction === 'desc') dataSortedByDrinkType.reverse();
        this.setState({ drinkerObjectsArray: dataSortedByDrinkType,
                        sort: { column, direction }
                      });
      }

      const sortedNumberColumn = () => {
        const dataSortedByNumbers = this.state.drinkerObjectsArray.sort((a, b) => {
          const firstNum = parseFloat(a[column])
          const secondNum = parseFloat(b[column])
            if( !isFinite(firstNum) && !isFinite(secondNum) ) {
                return 0;
            }
            if( !isFinite(firstNum) ) {
                return -1;
            }
            if( !isFinite(secondNum) ) {
                return 1;
            }
            return firstNum-secondNum;
        })
        if (direction === 'desc') dataSortedByNumbers.reverse();
        this.setState({ drinkerObjectsArray: dataSortedByNumbers,
                        sort: { column, direction }
                      });
      }

      if(column === "drinkerName") {
        sortedNameData()
      } else if(column === "drinkerFaveType") {
        sortedDrinkTypeData()
      } else {
        sortedNumberColumn()
      }
    }

    handleIrregDrinkersCheck() {
      this.setState({ irregDrinkersCheck: !this.state.irregDrinkersCheck })
    }

  render() {
    const { drinkerObjectsArray } = this.state
    if (!drinkerObjectsArray) {
      return <p>Awaiting Data</p>
    } else {
      if(this.state.sort.column === null) {
        this.onSort("drinksNum")
      }
      return(
        <div>
          <h4 className="drinkerTableTitle">Click a Header for Sorted Data</h4>
          <span className="includeDrinkersSpan">Include Drinkers with less than 15% attendance? </span>
          <input type="checkbox"
                 className="irregularDrinkersCheckbox"
                 defaultChecked={this.state.irregDrinkersCheck}
                 onChange={() => this.handleIrregDrinkersCheck()} />
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
}

export default DrinkersTable;
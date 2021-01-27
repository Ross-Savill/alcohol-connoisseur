import React, { Component } from 'react';
import { USStateList } from './USStateList';
import '../../Stylesheets/USPageSS/USDrinkerDataTable.css';

class USDrinkerDataTable extends Component {
  constructor(props) {
    super(props)
      this.onSort = this.onSort.bind(this)
      this.state = {
        regionCode: null,
        regionName: null,
        drinks: null,
        selectedDrinksPerDrinker: [],
        organisedDrinkersData: null,
        sortedDrinkerData: null,
        sort: {
          column: null,
          direction: 'desc',
        },
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    this.setState({ drinks })
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, regionCode, regionName } = this.props
    if(drinks !== this.state.drinks) {
      this.setState({ drinks })
    }
    if((this.state.drinks && regionName !== this.state.regionName) || drinks !== this.state.drinks) {
      this.setState({ regionName, regionCode, drinks })
      this.renderClickedDrinkerData(drinks, regionCode)
    }
  }

  renderClickedDrinkerHeader() {
    const { regionCode } = this.state
    if(!regionCode) {
      return(
        <tr className="drinkerTableRowHeader">
          <th className="drinkerUSTableTh" onClick={e => this.onSort(e, 'name')}>Drinker</th>
          <th className="drinkerUSTableTh" onClick={e => this.onSort(e, 'drinksNumber')}>Drink Count</th>
          <th className="drinkerUSTableTh" onClick={e => this.onSort(e, 'averageScore')}>Avg Score</th>
          <th className="drinkerUSTableTh" onClick={e => this.onSort(e, 'uniqueStatesList')}>State Count</th>
          <th>State Names</th>
        </tr>
      )
    } else {
      return(
        <tr className="drinkerTableRowHeader">
          <th className="drinkerUSTableTh" onClick={e => this.onSort(e, 'name')}>Drinker</th>
          <th className="drinkerUSTableTh" onClick={e => this.onSort(e, 'drinksNumber')}>Drink Count</th>
          <th className="drinkerUSTableTh" onClick={e => this.onSort(e, 'averageScore')}>Avg Score</th>
        </tr>
      )
    }
  }

  renderClickedDrinkerData(drinks, regionCode) {
    if(drinks) {
    const selectedDrinks = []

    //ESTABLISH SELECTED DRINKS ARRAY
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
    //ESTABLISH UNIQUE DRINKERS ARRAY
    const uniqueDrinkerNames = [...new Set(selectedDrinks.map(drink => drink.name))];
    //ESTABLISH NUMBER OF DRINKS PER PERSON ARRAY, AVG SCORES ARRAY AND STATE #
    let drinksPerPerson = [];
    let averageScoresArray = [];
    let uniqueStateCodes = [];
    let fullStateNamesArray = [];

    uniqueDrinkerNames.map((name) => {
      let drinksCounter = 0;
      let drinkerScores = [];
      let statesDrankFrom = [];
      let fullStateNameForDrinker = [];

      selectedDrinks.map((drink) => {
        if(name === drink.name) {
          drinksCounter++
          drinkerScores.push(drink.score)
          if(!regionCode && drink.country === "US") {
            statesDrankFrom.push(drink.ukUsa)
          }
          if(!regionCode && drink.firstCollabCountry === "US") {
            statesDrankFrom.push(drink.firstUkUsa)
          }
          if(!regionCode && drink.secondCollabCountry === "US") {
            statesDrankFrom.push(drink.secondUkUsa)
          }
        }
      })
      // SET TOTAL DRINKS FOR DRINKER
      drinksPerPerson.push(drinksCounter)

      // COLLECT AVERAGES TO PROCESS
      averageScoresArray.push(drinkerScores)

      // SET STATE LIST AND FULL NAMES
      const uniqueCodes = [...new Set(statesDrankFrom)]
      uniqueStateCodes.push(uniqueCodes);
      uniqueCodes.map((code) => {
        for (const [selectedRegion, fullRegionName] of Object.entries(USStateList)) {
          if (code === selectedRegion) {
            fullStateNameForDrinker.push(fullRegionName + ", ")
          }
        }
      })
      fullStateNamesArray.push(fullStateNameForDrinker.sort((a,b) => a > b ? 1 : -1))
    })

    //ESTABLISH DRINKER AVERAGE SCORE
    const averageScores = averageScoresArray.map((drinkerArray) => {
      const sum = drinkerArray.reduce((a, b) => a + b, 0)
      const avg = (sum / drinkerArray.length) || 0;
      return avg.toFixed(2)
    })

    //BRING ALL TOGETHER IN OBJECTS INSIDE AN ARRAY
    const unorganisedDrinkersData = uniqueDrinkerNames.map((name, index) => {
      return {
        name: uniqueDrinkerNames[index],
        uniqueStatesList: uniqueStateCodes[index].length,
        drinksNumber: drinksPerPerson[index],
        averageScore: averageScores[index],
        uniqueStateNames: fullStateNamesArray[index]
      }
    });

    //ORGANISE THE OBJECTS SO THAT STATE CONDITION WONT CAUSE INFINITE LOOP
    const organisedDrinkersData =
    !regionCode ?
      unorganisedDrinkersData.sort((a,b) => b.uniqueStatesList < a.uniqueStatesList ? -1 : 1) :
      unorganisedDrinkersData.sort((a,b) => b.drinksNumber < a.drinksNumber ? -1 : 1)

    this.setState({ sortedDrinkerData: organisedDrinkersData })
    }
  }

  onSort(event, sortKey){
    const direction = sortKey !== this.state.sort.column ? "desc" : this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
    const data = this.state.sortedDrinkerData;
    let sortedToGo = data.sort((a,b) => a[sortKey] > (b[sortKey]) ? 1 : -1);
    if (direction === 'desc') sortedToGo.reverse();

    this.setState({ sortedDrinkerData: sortedToGo,
                    sort: { column: sortKey, direction }
    })
  }

  render() {
    const { regionName, regionCode, sortedDrinkerData } = this.state
    const resetRegionButton = () => {
      if(!regionCode) {
        return;
      } else {
        return (
          <th
            colSpan="2"
            className="resetButtonHeader"
            onClick={() => resetRegion()}
          >
            <p className="resetButtonParagraph">Back To All States</p>
          </th>
        )
      }
    }
    const handleUSTableHeaderColspan = () => {
      if(!regionCode) {
        return "5"
      } else {
        return "1"
      }
    }

    const resetRegion = () => {
      this.props.handleRegionReset()
    }
    const drinkerTableData = () => {
      if(sortedDrinkerData.length === 0) {
        return (<tr><td colSpan="3">Nothing from {regionName} yet!</td></tr>)
      } else {
        return sortedDrinkerData.map((drinkObj, index) => {
          if(!regionCode) {
            return(
              <tr key={index}>
                <td className="drinkerUSTableDataText">{drinkObj.name}</td>
                <td className="ddrinkerUSTableDataNum">{drinkObj.drinksNumber}</td>
                <td className="ddrinkerUSTableDataNum">{drinkObj.averageScore}</td>
                <td className="drinkerUSTableDataNum">{drinkObj.uniqueStatesList}</td>
                <td className="drinkerUSTableDataText">{drinkObj.uniqueStateNames}</td>
              </tr>
            )
          } else {
          return(
            <tr key={index}>
              <td className="drinkerUSTableDataText">{drinkObj.name}</td>
              <td className="drinkerUSTableDataNum">{drinkObj.drinksNumber}</td>
              <td className="drinkerUSTableDataNum">{drinkObj.averageScore}</td>
            </tr>
          )
          }
        })
      }
    }
    if(!this.state.sortedDrinkerData) {
      return <h2 className="selectRegionText">One Moment Please</h2>
    } else {
      return (
        <div className="selectedCountry">
          <table className='selectedCountryTable'>
            <thead className="usMapDrinkerTHead">
              <tr className="usMapDrinkerTableHeaderRow">
                <th colSpan={handleUSTableHeaderColspan()} className="drinkerRegionName">{regionName}</th>
                {resetRegionButton()}
              </tr>
                {this.renderClickedDrinkerHeader()}
            </thead>
            <tbody>
              {drinkerTableData()}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default USDrinkerDataTable;
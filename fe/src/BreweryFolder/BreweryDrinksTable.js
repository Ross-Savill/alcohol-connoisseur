import React, { Component } from 'react';
import '../Stylesheets/BreweryDrinksTable.css';

class BreweryDrinksTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breweryObjectsArray: null,
      expandedBreweryName: null,
      sortedDrinkerList: null,
      sortedTotalDrinkerList: null
    }
  }

  componentDidMount() {
    const { breweryObjectsArray, expandedBreweryName } = this.props
      this.setState({ breweryObjectsArray, expandedBreweryName })
  }

  componentDidUpdate(prevProps, prevState) {
    const { breweryObjectsArray, expandedBreweryName } = this.props
    if(prevState.breweryObjectsArray !== breweryObjectsArray) {
      this.setState({ breweryObjectsArray, expandedBreweryName })

      // COUNT ALL DRINKERS BY BREWERY
      let allDrinkers = [];
      breweryObjectsArray.map((breweryObject) => {
        allDrinkers.push(breweryObject.breweryDrinkersArray)
      })
      const drinkerAndBreweryCount = allDrinkers.reduce((acc, cur) => {
        cur.map((name) => name).forEach(n => acc[n] = (acc[n] || 0) + 1);
        return acc;
      }, {})

      // CHANGE FROM OBJECTS TO ARRAYS AND SORT
      let sortableNames = [];
        for (const name in drinkerAndBreweryCount) {
        sortableNames.push([name, drinkerAndBreweryCount[name]]);
      }
      const sortedDrinkerList = sortableNames.sort(function (a, b) {
        return b[1] - a[1];
      });


      // COUNT TOTAL DRINKS FOR EACH DRINKER
      let allTotalDrinkers = [];
      breweryObjectsArray.map((breweryObject) => {
        allTotalDrinkers.push(breweryObject.breweryUneditedDrinkersArray)
      })
      const drinkerTotalDrinkCount = allTotalDrinkers.reduce((acc, cur) => {
        cur.map((name) => name).forEach(n => acc[n] = (acc[n] || 0) + 1);
        return acc;
      }, {})
      let totalsortableNames = [];
      for (const name in drinkerTotalDrinkCount) {
        totalsortableNames.push([name, drinkerTotalDrinkCount[name]]);
    }

      sortedDrinkerList.map((drinker, i) => {
        totalsortableNames.map((drinkerArray, itwo) => {
          if(drinkerArray[0] === drinker[0]) {
            sortedDrinkerList[i].push(drinkerArray[1])
            sortedDrinkerList[i].push((drinkerArray[1] / sortedDrinkerList[i][1]).toFixed(2))
          }
        })
      })

      if(this.state.sortedDrinkerList === null) {
        this.setState({ sortedDrinkerList })
      }
    }
  }

  render() {
    const { expandedBreweryName, sortedDrinkerList } = this.state
    if(!sortedDrinkerList) {
      return <p>Please Wait</p>
    }
    if(!expandedBreweryName) {
      // if(!sortedDrinkerList) {
        // return<h4>One Moment For All Brewery/Drinker Data</h4>
      // } else {
        return(
          <div className="noBrewerySelected">
            <table className="noBrewerySelectedDrinkersTable">
              <thead className="noBrewerySelectedDrinkersHeaders">
                <tr>
                <th colSpan="4" >EVERY BEER/CIDER DRINKER ON DnR</th>
                </tr>
                <tr>
                  <th>Drinker</th>
                  <th>Breweries</th>
                  <th>Drinks</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody className="noBrewerySelectedTableBody">
                {sortedDrinkerList.map((drinker, index) => (
                  <tr key={index}>
                    <td>{drinker[0]}</td>
                    <td>{drinker[1]}</td>
                    <td>{drinker[2]}</td>
                    <td>{drinker[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      // }
    } else {
      return(
        <table>
          <thead>
            <tr>
              <th>
              {`${expandedBreweryName}`}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
      )
    }
  }
}

export default BreweryDrinksTable;

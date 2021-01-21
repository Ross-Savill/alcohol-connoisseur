import React, { useEffect, useState } from 'react';
import '../Stylesheets/BreweryDrinkersTable.css';
import useSortableData from '../useSortableData';


const BreweryDrinkersTable = ({ breweryObjectsArray }) => {

const [sortedDrinkerList, setSortedDrinkerList] = useState()

  useEffect(() => {
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
    const localSortedDrinkerList = sortableNames.sort(function (a, b) {
      return b[1] - a[1];
    });
    // COUNT TOTAL DRINKS FOR EACH DRINKER
    let allTotalDrinkers = [];
    breweryObjectsArray.map(breweryObject => breweryObject.breweryAllDrinksArray
      .map((drink) => {
        allTotalDrinkers.push(drink.name)
      })
    )

    let drinkerTotalDrinkCount = {};
    allTotalDrinkers.forEach(function(x) { drinkerTotalDrinkCount[x] = (drinkerTotalDrinkCount[x] || 0)+1; });

    let totalsortableNames = [];
    for (const name in drinkerTotalDrinkCount) {
      totalsortableNames.push([name, drinkerTotalDrinkCount[name]]);
    }

    localSortedDrinkerList.map((drinker, i) => {
      totalsortableNames.map((drinkerArray, itwo) => {
        if(drinkerArray[0] === drinker[0]) {
          localSortedDrinkerList[i].push(drinkerArray[1])
          localSortedDrinkerList[i].push((drinkerArray[1] / localSortedDrinkerList[i][1]).toFixed(2))
        }
      })
    })

    let readableObjects = [];
    localSortedDrinkerList.map((array) => {
      const breweryObjectToUse = {
        drinker: array[0],
        brewery: array[1],
        drinkNum: array[2],
        ratio: array[3]
      };
      readableObjects.push(breweryObjectToUse)
    })
    if(!sortedDrinkerList) {
      setSortedDrinkerList(readableObjects)
    }
  }, [breweryObjectsArray])

  const { items, requestSort, sortConfig } = useSortableData(sortedDrinkerList);

  if(!sortedDrinkerList) {
    return <h3>Please Wait </h3>
  } else {
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
      return(
        <div className="noBrewerySelected">
          <table className="noBrewerySelectedDrinkersTable">
            <thead className="noBrewerySelectedDrinkersHeaders">
              <tr>
              <th colSpan="4"> EVERY BEER/CIDER DRINKER ON DnR </th>
              </tr>
              <tr className="selectedBreweryTableHeaderRow">
                <th onClick={() => requestSort('drinker')}
                    className={getClassNamesFor('drinker')}>Drinker</th>
                <th onClick={() => requestSort('brewery')}
                    className={getClassNamesFor('brewery')}>Breweries</th>
                <th onClick={() => requestSort('drinkNum')}
                    className={getClassNamesFor('drinkNum')}>Drinks</th>
                <th onClick={() => requestSort('ratio')}
                    className={getClassNamesFor('ratio')}>Ratio</th>
              </tr>
            </thead>
            <tbody className="noBrewerySelectedTableBody">
              {items.map((drinker, index) => (
                <tr key={index}>
                  <td>{drinker.drinker}</td>
                  <td>{drinker.brewery}</td>
                  <td>{drinker.drinkNum}</td>
                  <td>{drinker.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export default BreweryDrinkersTable;

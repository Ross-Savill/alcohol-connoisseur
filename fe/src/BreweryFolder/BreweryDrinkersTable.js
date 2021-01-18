import React, { useEffect, useState } from 'react';
import '../Stylesheets/BreweryDrinkersTable.css';

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
    if(!sortedDrinkerList) {
      setSortedDrinkerList(localSortedDrinkerList)
    }
  }, [breweryObjectsArray])

  if(!sortedDrinkerList) {
    return <h3>Please Wait </h3>
  } else {
    // if(!expandedBreweryName) {
      return(
        <div className="noBrewerySelected">
          <table className="noBrewerySelectedDrinkersTable">
            <thead className="noBrewerySelectedDrinkersHeaders">
              <tr>
              <th colSpan="4"> EVERY BEER/CIDER DRINKER ON DnR </th>
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
    // } else {
      // if(!selectedBreweryDrinks) {
      //   return("Loading Brewery Drinks")
      // } else {
      //   return(
      //     <div className="brewerySelectedDiv">
      //       <table className="brewerySelectedDrinkersTable">
      //         <thead className="brewerySelectedDrinkersHeaders">
      //           <tr>
      //             <th colSpan="6"><span onClick={() => handleReturnToDrinkers()} className="backToDrinkersLink">{"<<"} Back To Drinkers</span>{`${expandedBreweryName}`} </th>
      //           </tr>
      //           <tr className="brewerySelectedDrinkerTableHeaderTR">
      //             <th> Drink Name </th>
      //             <th> Drinker </th>
      //             <th> Date </th>
      //             <th colSpan="2"> Rating Words </th>
      //             <th> Score </th>
      //           </tr>
      //         </thead>
      //         <tbody className="brewerySelectedTableBody">
      //             {selectedBreweryDrinks.map((drink, index) => (
      //               <tr key={index}>
      //                 <td>{drink.drinkMain}</td>
      //                 <td>{drink.name}</td>
      //                 <td>{moment(drink.date).format('D/M/YY')}</td>
      //                 <td>{drink.ratingWordOne}</td>
      //                 <td>{drink.ratingWordTwo}</td>
      //                 <td>{drink.score}</td>
      //               </tr>
      //             ))}
      //           </tbody>
      //       </table>
      //     </div>
      //   )
      // }
    // }
  }
}

export default BreweryDrinkersTable;

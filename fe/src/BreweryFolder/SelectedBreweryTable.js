import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useSortableData from '../useSortableData';
import '../Stylesheets/SelectedBreweryTable.css';

const SelectedBreweryTable = ({ breweryObjectsArray,
                                selectedBrewery,
                                handleBreweryReset
                              }) => {

  const [selectedBreweryDrinks, setSelectedBreweryDrinks] = useState([])

  useEffect(() => {
    let chosenBreweryDrinks = [];

    breweryObjectsArray.map((breweryObject) => {
      if(breweryObject.breweryName === selectedBrewery) {
        breweryObject.breweryAllDrinksArray.map((drink) => {
          chosenBreweryDrinks.push(drink)
        })
      }
    })
    setSelectedBreweryDrinks(chosenBreweryDrinks)
  }, [selectedBrewery])

  const { items, requestSort, sortConfig } = useSortableData(selectedBreweryDrinks);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return(
    <div className="selectedBreweryTableDiv">
      <table className="selectedBreweryTable">
        <thead>
          <tr className="selectedBreweryTableMainHeaderRow">
            <th colspan="5">
              <div className="selectedBreweryTableMainHeaderDiv">
                <span className="selectedBreweryTitle">{selectedBrewery}</span>
                <span className="selectedBreweryReturnLink" onClick={() => handleBreweryReset()}>Return to All Breweries</span>
              </div>
            </th>
          </tr>
          <tr className="selectedBreweryTableSubHeadersRow">
            <th onClick={() => requestSort('drinkMain')}
                className={getClassNamesFor('drinkMain')}>Beer/Cider Name</th>
            <th onClick={() => requestSort('date')}
                className={getClassNamesFor('date')}>Drank on</th>
            <th onClick={() => requestSort('name')}
                className={getClassNamesFor('name')}>Drinker</th>
            <th>Rating Words</th>
            <th onClick={() => requestSort('score')}
                className={getClassNamesFor('score')}>Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((drink, index) => (
            <tr className="selectedBrewaryTableBodyRows" key={index}>
              <td className="selectedBrewaryTableData">{drink.drinkMain}</td>
              <td className="selectedBrewaryTableData">{moment(drink.date).format('D/M/YY')}</td>
              <td className="selectedBrewaryTableData">{drink.name}</td>
              <td className="selectedBrewaryTableData">{drink.ratingWordOne}, {drink.ratingWordTwo}</td>
              <td className="selectedBrewaryTableData">{drink.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SelectedBreweryTable;
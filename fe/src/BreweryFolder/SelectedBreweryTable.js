import React, { useEffect, useState } from 'react';
import moment from 'moment';
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
            <th>Beer/Cider Name</th>
            <th>Drank on</th>
            <th>Drinker</th>
            <th>Rating Words</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {selectedBreweryDrinks.map((drink, index) => (
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
import react, { useEffect, useState } from 'react';
import '../Stylesheets/MyUtilitiesSS/TableModal.css';
import LoadingSpin from './LoadingSpin';
import moment from 'moment';

const TableModal = ({drinks, selectedDrinker, resetSelectedDate, selectedDate}) => {

  const [selectedDrinks, setSelectedDrinks] = useState(null)

  useEffect(() => {
    let chosenDrinks = [];
    drinks.map((drink) => {
      if(drink.date === selectedDate && drink.name === selectedDrinker) {
        chosenDrinks.push(drink)
      }
    })
    setSelectedDrinks(chosenDrinks)
  },[drinks])

  if(!selectedDrinks || !selectedDate) {
    return(
      <div className="backdrop">
        <LoadingSpin />
      </div>
    )
    } else {
      const setTableHeaders = () => {
        if(!selectedDrinks) {
          return <p>Please Wait</p>
        } else {
          return(
            <tr className="tableModalHeaderTR">
              <th>Drink</th>
              <th>Drink Type</th>
              <th>ABV(%)</th>
              <th>Brand</th>
              <th>Company</th>
              <th>Rating Words</th>
              <th>Score</th>
              <th>Notes</th>
            </tr>
          )
        }
      }
      const setTableBody = () => {
        return selectedDrinks.map((drink, i) => {
          return (
            <tr key={i}>
              {drink.mixerSix ? <td>{drink.drinkMain} with {drink.mixerOne}, {drink.mixerTwo}, {drink.mixerThree}, {drink.mixerFour}, {drink.mixerFive} and {drink.mixerSix}</td>
              : drink.mixerFive ? <td>{drink.drinkMain} with {drink.mixerOne}, {drink.mixerTwo}, {drink.mixerThree}, {drink.mixerFour} and {drink.mixerFive}</td>
              : drink.mixerFour ? <td>{drink.drinkMain} with {drink.mixerOne}, {drink.mixerTwo}, {drink.mixerThree} and {drink.mixerFour}</td>
              : drink.mixerThree ? <td>{drink.drinkMain} with {drink.mixerOne}, {drink.mixerTwo} and {drink.mixerThree}</td>
              : drink.mixerTwo ? <td>{drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo}</td>
              : drink.mixerOne ? <td>{drink.drinkMain} with {drink.mixerOne}</td>
              : <td>{drink.drinkMain}</td>
              }
              <td>{drink.drinkType}</td>
              <td>{(drink.abv * 100).toFixed(1)}%</td>
              <td>{drink.brand}</td>
              {drink.secondCollabCompany ? <td>{drink.company}, {drink.firstCollabCompany} and {drink.secondCollabCompany}</td>
              : drink.firstCollabCompany ? <td>{drink.company} and {drink.firstCollabCompany}</td>
              : <td>{drink.company}</td>
              }
              <td>{drink.ratingWordOne}, {drink.ratingWordTwo}</td>
              <td>{(drink.score).toFixed(2)}</td>
              <td>{drink.notes}</td>
            </tr>
          )
        })
      }

      return(
        <div className="backdrop" onClick={() => resetSelectedDate()}>
          <table>
            <thead>
              <tr>
                <th className="tableModalMainHead" colSpan="8">{selectedDrinker}'s drinks on {moment(selectedDate).format('MMMM Do YYYY')}</th>
              </tr>
              {setTableHeaders()}
            </thead>
            <tbody>
              {setTableBody()}
            </tbody>
          </table>
        </div>
      )
    }
}

export default TableModal;
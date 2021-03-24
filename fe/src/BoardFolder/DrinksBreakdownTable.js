import React from 'react';
import '../Stylesheets/BoardFolder/DrinksBreakdownTable.css'

const DrinksBreakdownTable = ({ drinks, drinkers }) => {

  const drinksBreakdownHeaders = () => {
    return(
      <tr>
        <th>Drinker</th>
        <th>Beer</th>
        <th>Cider</th>
        <th>Vodka</th>
        <th>Gin</th>
        <th>Rum</th>
        <th>Whiskey</th>
        <th>Wine</th>
        <th>Fortified Wine</th>
        <th>Liqueur</th>
        <th>Brandy</th>
        <th>Soft Drink</th>
        <th>Other</th>
        <th>Total</th>
      </tr>
    )
  }

  const drinksBreakdownTableData = () => {

    if(drinks && drinkers) {

      return drinkers.map((drinker) => {
        let drinkTypes = {};
        let totalDrinks = 0;
        drinks.map((drink) => {
          if(drink.drinkerId === drinker._id) {
            drinkTypes[drink.drinkType] = (drinkTypes[drink.drinkType] || 0) + 1
            totalDrinks++
          }
        })

        const namesArray = drinker.personName.split(" ");
        const firstName = namesArray[0]

        return(
          <tr key={drinker._id}>
            <td>{firstName}</td>
            <td>{drinkTypes["Beer"]}</td>
            <td>{drinkTypes["Cider"]}</td>
            <td>{drinkTypes["Vodka"]}</td>
            <td>{drinkTypes["Gin"]}</td>
            <td>{drinkTypes["Rum"]}</td>
            <td>{drinkTypes["Whiskey"]}</td>
            <td>{drinkTypes["Wine"]}</td>
            <td>{drinkTypes["Fortified Wine"]}</td>
            <td>{drinkTypes["Liqueur"]}</td>
            <td>{drinkTypes["Brandy"]}</td>
            <td>{drinkTypes["Soft Drink"]}</td>
            <td>{drinkTypes["Other"]}</td>
            <td>{totalDrinks}</td>
          </tr>
        )
      })
    }
  }

  return(
    <div className="drinksBreakdownTableDiv">
      <table className="drinksBreakdownTable">
        <thead>
        <tr className="drinksBreakdownMainTitle"><th colSpan="14">Drink And Rate Live Table</th></tr>
          {drinksBreakdownHeaders()}
        </thead>
        <tbody>
          {drinksBreakdownTableData()}
        </tbody>
      </table>
    </div>
  )
}

export default DrinksBreakdownTable;


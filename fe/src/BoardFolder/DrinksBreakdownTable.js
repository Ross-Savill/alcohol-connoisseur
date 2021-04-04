import React from 'react';
import '../Stylesheets/BoardFolder/DrinksBreakdownTable.css'

const DrinksBreakdownTable = ({ drinks, drinkers }) => {

  const drinksBreakdownHeaders = () => {
    return(
      <tr className="drinksBreakdownTableTHRow">
        <th>Drinker</th>
        <th>Beer</th>
        <th>Cider</th>
        <th>Vodka</th>
        <th>Gin</th>
        <th>Rum</th>
        <th>Whiskey</th>
        <th>Wine</th>
        <th>Fort. Wine</th>
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
        const firstName = `${namesArray[0]+ " " +`${namesArray[1].slice(0,1)}`}`

        function excitingNumChecker (num) {
          if(num % 100 === 0 && num !== 0) {
            return "hundredMultiple"
          }
          for (let i = 0; i < 11; i++) {
            let candidate = num + i
            if(candidate % 100 === 0 && candidate !== 0) {
              return "excitingNum"
            }
          }
        }

        return(
          <tr key={drinker._id}>
            <td>{firstName}</td>
            <td className={excitingNumChecker(drinkTypes["Beer"])}>{drinkTypes["Beer"]}</td>
            <td className={excitingNumChecker(drinkTypes["Cider"])}>{drinkTypes["Cider"]}</td>
            <td className={excitingNumChecker(drinkTypes["Vodka"])}>{drinkTypes["Vodka"]}</td>
            <td className={excitingNumChecker(drinkTypes["Gin"])}>{drinkTypes["Gin"]}</td>
            <td className={excitingNumChecker(drinkTypes["Rum"])}>{drinkTypes["Rum"]}</td>
            <td className={excitingNumChecker(drinkTypes["Whiskey"])}>{drinkTypes["Whiskey"]}</td>
            <td className={excitingNumChecker(drinkTypes["Wine"])}>{drinkTypes["Wine"]}</td>
            <td className={excitingNumChecker(drinkTypes["Fortified Wine"])}>{drinkTypes["Fortified Wine"]}</td>
            <td className={excitingNumChecker(drinkTypes["Liqueur"])}>{drinkTypes["Liqueur"]}</td>
            <td className={excitingNumChecker(drinkTypes["Brandy"])}>{drinkTypes["Brandy"]}</td>
            <td className={excitingNumChecker(drinkTypes["Soft Drink"])}>{drinkTypes["Soft Drink"]}</td>
            <td className={excitingNumChecker(drinkTypes["Other"])}>{drinkTypes["Other"]}</td>
            <td className={excitingNumChecker(totalDrinks)}>{totalDrinks}</td>
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


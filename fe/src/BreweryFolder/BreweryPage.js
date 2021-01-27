import React, { useEffect, useState, useMemo } from "react";
import { Container } from "reactstrap";
import Navbar from '../MyUtilitiesFolder/Navbar';
import '../Stylesheets/BreweryPageSS/BreweryPage.css';
import BreweryTable from "./BreweryTable";
import BreweryDrinkersTable from "./BreweryDrinkersTable";
import SelectedBreweryTable from "./SelectedBreweryTable";
import { SearchColumnFilter } from './filters';
import LoadingSpin from '../MyUtilitiesFolder/LoadingSpin';

function BreweryPage(props) {

  const [drinks, setDrinks] = useState(props.drinks)
  const [allBeersAndCiders, setAllBeersAndCiders] = useState([])
  const [breweryObjectsArray, setBreweryObjectsArray] = useState()
  const [chosenDrinkerNum, setChosenDrinkerNum] = useState(1)
  const [chosenDrinkNum, setChosenDrinkNum] = useState(1)
  const [additionalColumns, setAdditionalColumns] = useState(false)
  const [selectedBrewery, setSelectedBrewery] = useState(null)

  useEffect(() => {
    setDrinks(props.drinks)
  },[props.drinks])

  useEffect(() => {
    if(drinks){
      (async() => {
        let drunkBeersAndCiders = []
          await drinks.map((drink) => {
            if((drink.drinkType === "Beer" || drink.drinkType === "Cider") && drink.mixerOne === "") {
              drunkBeersAndCiders.push(drink)
            }
          })
        setAllBeersAndCiders(drunkBeersAndCiders)
      })();
    }
  }, [drinks, chosenDrinkerNum, chosenDrinkNum])

  useEffect(() => {
    makeBreweryData();
  },[allBeersAndCiders])

  const makeBreweryData = () => {
    if(!allBeersAndCiders.length) {
      return <h2>One Moment Please</h2>
    } else {

      //GET A UNIQUE ARRAY OF ALL BREWERIES
      let allBreweries = []
      allBeersAndCiders.map((bevvy) => {
        if(bevvy.secondCollabCompany) {
          allBreweries.push(bevvy.secondCollabCompany)
        }
        if(bevvy.firstCollabCompany) {
          allBreweries.push(bevvy.firstCollabCompany)
        }
        allBreweries.push(bevvy.company)
      })

      const allUniqueBreweries = [...new Set(allBreweries)]

      // BEGIN LOOPING THROUGH ALL BREWERIES FOR DATA

      let localBreweryObjectsArray = [];
      allUniqueBreweries.map((brewery) => {
        let allBreweryDrinks = [];
        let breweryDrinkers = [];
        let ownDrinkCount = 0;
        let collabDrinkCount = 0;
        let soloDrinkScores = [];
        let allDrinkScores = [];
        allBeersAndCiders.map((beerOrCider) => {

        // GRAB DRINK
          if(beerOrCider.company === brewery ||
             beerOrCider.firstCollabCompany === brewery ||
             beerOrCider.secondCollabCompany === brewery) {
               allBreweryDrinks.push(beerOrCider)
          }

        // GRAB DRINKERS OF THIS BREWERY
          if(beerOrCider.company === brewery ||
            beerOrCider.firstCollabCompany === brewery ||
            beerOrCider.secondCollabCompany === brewery) {
            breweryDrinkers.push(beerOrCider.name)
          }

        // GRAB BREWERY OWN DRINK COUNT
          if(beerOrCider.company === brewery && beerOrCider.firstCollabCompany === "") {
            ownDrinkCount = ownDrinkCount + 1
          }
        // GRAB BREWERY COLLAB DRINK COUNT
          if((beerOrCider.company === brewery ||
              beerOrCider.firstCollabCompany === brewery ||
              beerOrCider.secondCollabCompany === brewery) &&
              beerOrCider.firstCollabCompany !== "") {
                collabDrinkCount = collabDrinkCount + 1
          }
        // GRAB SOLO SCORES FOR AVERAGING
          if(beerOrCider.company === brewery && beerOrCider.firstCollabCompany === "") {
            soloDrinkScores.push(beerOrCider.score)
          }
        // GRAB TOTAL SCORES FOR AVERAGING
          if(beerOrCider.company === brewery ||
            beerOrCider.firstCollabCompany === brewery ||
            beerOrCider.secondCollabCompany === brewery) {
            allDrinkScores.push(beerOrCider.score)
          }

      }) // THIS ENDS THE DRINK LOOP
        // GET UNIQUE DRINKERS LIST
        const uniqueDrinkers = [...new Set(breweryDrinkers)]
        const uniqueDrinkerNumber = uniqueDrinkers.length
        // CANCEL IF NOT ENOUGH DRINKERS AS PER SELECTION
        if(uniqueDrinkerNumber < chosenDrinkerNum) { return }
        // GET TOTAL DRINKS
        const totalDrinkCount = ownDrinkCount + collabDrinkCount;
        // CANCEL IF NOT ENOUGH DRINKS AS PER SELECTION
        if(totalDrinkCount < chosenDrinkNum) { return }
        // REPLACE 0s WITH HYPHENS FOR VISUAL APPEAL
        if(ownDrinkCount === 0) {ownDrinkCount = "-"}
        if(collabDrinkCount === 0) {collabDrinkCount = "-"}
        // SET SOLO DRINKS AVERAGE
        const allSoloDrinksAverage = soloDrinkScores.length > 0 ? parseFloat((soloDrinkScores.reduce((a,b) => a+b,0)/soloDrinkScores.length).toFixed(2)) : "-";
        // SET ALL DRINKS AVERAGE
        const allDrinksAverage = parseFloat((allDrinkScores.reduce((a,b) => a+b,0)/allDrinkScores.length).toFixed(2))
        // SET THE DATA OBJECT!
        const breweryObject = {
          breweryName: brewery,
          breweryDrinkerCount: uniqueDrinkerNumber,
          breweryOwnDrinkCount: ownDrinkCount,
          breweryAllDrinksArray: allBreweryDrinks,
          breweryDrinkersArray: uniqueDrinkers,
          breweryCollabDrinkCount: collabDrinkCount,
          breweryTotalDrinksCount: totalDrinkCount,
          breweryOwnDrinkAvgScore: allSoloDrinksAverage,
          breweryTotalDrinkAvgScore: allDrinksAverage
        }
        localBreweryObjectsArray.push(breweryObject)

      }) // THIS ENDS THE BREWERY LOOP
        setBreweryObjectsArray(localBreweryObjectsArray)
    }
  }

  const selectQuestionNumber = (drinkOrDrinker) => {
    let numbers = [];
    let noun = drinkOrDrinker;
      for (let i = 0; i < 10; i++) {
        if(i === 0) {
          numbers.push(<option key={i+1} value={i+1}>{`${i+1} ${noun}`}</option>);
        } else {
          numbers.push(<option key={i+1} value={i+1}>{`${i+1} ${noun}s`}</option>);
        }
      }
    return numbers;
  }

  const handleAdditionalColumns = () => {
    setAdditionalColumns(!additionalColumns)
  }

  const handleSetBrewery = (row) => {
    setSelectedBrewery(row.original.breweryName)
  }

  const handleBreweryReset = () => {
    setSelectedBrewery(null)
  }

  const columns = useMemo(
    () => [
      {
        Header: "A LIST OF EVERY BEER BREWER AND CIDERY RATED ON DnR",
        columns: [
          {
            Header: "Brewery Name Search",
            id: "breweryName",
            accessor: "breweryName",
            Filter: SearchColumnFilter,
            show: true
          },
          {
            Header: "Solo Drink Count",
            id: "breweryOwnDrinkCount",
            accessor: "breweryOwnDrinkCount",
            disableFilters: true,
            sortDescFirst: true,
            show: additionalColumns
          },
          {
            Header: "Collab Drink Count",
            id: "breweryCollabDrinkCount",
            accessor: "breweryCollabDrinkCount",
            disableFilters: true,
            sortDescFirst: true,
            show: additionalColumns
          },
          {
            Header: "Total Drink Count",
            id: "breweryTotalDrinksCount",
            accessor: "breweryTotalDrinksCount",
            disableFilters: true,
            sortDescFirst: true,
            show: true
          },
          {
            Header: "Drinkers",
            id: "breweryDrinkerCount",
            accessor: "breweryDrinkerCount",
            disableFilters: true,
            sortDescFirst: true,
            show: true
          },
          {
            Header: "Solo Drink Avg Score",
            id: "breweryOwnDrinkAvgScore",
            accessor: "breweryOwnDrinkAvgScore",
            disableFilters: true,
            sortType: "sortAvgSolo",
            sortDescFirst: true,
            show: additionalColumns
          },
          {
            Header: "Total Drink Avg Score",
            id: "breweryTotalDrinkAvgScore",
            accessor: "breweryTotalDrinkAvgScore",
            disableFilters: true,
            sortType: "basic",
            sortDescFirst: true,
            show: true
          },
        ],
      },
    ],[additionalColumns]
  )

    if(!breweryObjectsArray) {
      return (
        <div className="breweryPageLoadingDiv">
          <LoadingSpin />
        </div>
      )
    } else {
      console.log(breweryObjectsArray)
      return(
        <div className="breweryPage">
          <div className="titleDiv">
            <h1 className='title'>Breweries Page</h1>
          </div>
          <Navbar />
          <div className="scrollAndCheckboxes">
            <Container className="themed-container" fluid={true}>
              <div className="insideContainerTable">
                <div className="brewTableFiltersAndAdditional">
                  <div className="dataEditChckboxes">
                    <h4>Filters</h4>
                    <label className="filterLabelOne">
                      Minimum Number Of Unique Drinkers:
                      <select value={chosenDrinkerNum} onChange={e => setChosenDrinkerNum(e.currentTarget.value)}>
                        {selectQuestionNumber("Drinker")}
                      </select>
                    </label>
                    <label className="filterLabelTwo">
                      Min Number of Brewery Drinks Drunk:
                      <select value={chosenDrinkNum} onChange={e => setChosenDrinkNum(e.currentTarget.value)}>
                        {selectQuestionNumber("Drink")}
                      </select>
                    </label>
                    <h4>Additional Columns</h4>
                    <label className="additionalLabelOne">
                      See Data On Collab/Solo Made Drinks
                      <input type="checkbox" onClick={() => handleAdditionalColumns()}></input>
                    </label>
                  </div>
                  {selectedBrewery === null &&
                  <BreweryTable
                    columns={columns}
                    data={breweryObjectsArray}
                    handleSetBrewery={handleSetBrewery}
                  />
                  }
                  {selectedBrewery !== null &&
                  <SelectedBreweryTable
                    breweryObjectsArray={breweryObjectsArray}
                    selectedBrewery={selectedBrewery}
                    handleBreweryReset={handleBreweryReset}
                  />
                  }
                </div>
                <div className="breweryDrinksTable">
                  <BreweryDrinkersTable
                    breweryObjectsArray={breweryObjectsArray}
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
      )
    }
}

export default BreweryPage;
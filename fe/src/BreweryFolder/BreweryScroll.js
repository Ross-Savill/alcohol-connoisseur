import React, { useEffect, useState, useMemo } from "react";
import { Container } from "reactstrap";
import Navbar from '../Navbar';
import '../Stylesheets/BreweryScroll.css';
import BreweryTable from "./BreweryTable";
import BreweryDrinksTable from "./BreweryDrinksTable";
import { SearchColumnFilter } from './filters';
import LoadingSpin from '../LoadingSpin';

function BreweryScroll(props) {

  const [drinks, setDrinks] = useState(props.drinks)
  const [allBeersAndCiders, setAllBeersAndCiders] = useState([])
  const [breweryObjectsArray, setBreweryObjectsArray] = useState()
  const [chosenDrinkerNum, setChosenDrinkerNum] = useState(1)
  const [chosenDrinkNum, setChosenDrinkNum] = useState(1)
  const [expandedBreweryName, setExpandedBreweryName] = useState("")

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
        let breweryDrinkers = [];
        let ownDrinkCount = 0;
        let collabDrinkCount = 0;
        let soloDrinkScores = [];
        let allDrinkScores = [];
        allBeersAndCiders.map((beerOrCider) => {

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
        const nonUniqueDrinkers = [...new Set(breweryDrinkers)]
        const uniqueDrinkerNumber = nonUniqueDrinkers.length
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

  const renderRowSubComponent = row => {
    setExpandedBreweryName(row.values.breweryName)
    const {
      breweryName
    } = row.original

    let breweryDrinks = [];
    allBeersAndCiders.map((beerOrCider) => {
      if(beerOrCider.company === breweryName ||
         beerOrCider.firstCollabCompany === breweryName ||
         beerOrCider.secondCollabCompany === breweryName) {
           breweryDrinks.push(beerOrCider)
      }
    })
    return breweryDrinks.map((drink, index) => {
       return (
         <div>
          <div>{index + 1}) {drink.name} had a {drink.drinkMain}: </div>
          <div>"{drink.ratingWordOne}" and "{drink.ratingWordTwo}" - {drink.score}</div>
        </div>
       )
      });
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

  const columns = useMemo(
    () => [
      {
        Header: "A LIST OF EVERY BEER BREWER AND CIDERY RATED ON DnR",
        columns: [
          {
            Header: "Brewery Name Search",
            accessor: "breweryName",
            Filter: SearchColumnFilter,
          },
          {
            Header: "Total Drink Count",
            accessor: "breweryTotalDrinksCount",
            disableFilters: true,
            sortDescFirst: true
          },
          {
            Header: "Drinkers",
            accessor: "breweryDrinkerCount",
            disableFilters: true,
            sortDescFirst: true
          },
          {
            Header: "Total Drink Avg Score",
            accessor: "breweryTotalDrinkAvgScore",
            disableFilters: true,
            sortType: "basic",
            sortDescFirst: true
          },
          {
            Header: "Solo Drink Count",
            accessor: "breweryOwnDrinkCount",
            disableFilters: true,
            sortDescFirst: true
          },
          {
            Header: "Collab Drink Count",
            accessor: "breweryCollabDrinkCount",
            disableFilters: true,
            sortDescFirst: true
          },
          {
            Header: "Solo Drink Avg Score",
            accessor: "breweryOwnDrinkAvgScore",
            disableFilters: true,
            sortType: "sortAvgSolo",
            sortDescFirst: true
          },
        ],
      },
    ],[]
  )

    if(!breweryObjectsArray) {
      return (
        <div className="breweryPageLoadingDiv">
          <LoadingSpin />
        </div>
      )
    } else {
      return(
        <div className="breweryPage">
          <div className="titleDiv">
            <h1 className='title'>Breweries Page</h1>
          </div>
          <Navbar />
          <div className="scrollAndCheckboxes">
            <Container>
              <div className="insideContainerTable">
                <BreweryTable
                  columns={columns}
                  data={breweryObjectsArray}
                  renderRowSubComponent={renderRowSubComponent}
                  setExpandedBreweryName={setExpandedBreweryName}
                />
                <div className="dataEditChckboxesAndDrinksTable">
                  <div className="dataEditChckboxes">
                  <h4>Edits</h4>
                    <label>
                      Minimum Number Of Unique Drinkers:
                      <select value={chosenDrinkerNum} onChange={e => setChosenDrinkerNum(e.currentTarget.value)}>
                        {selectQuestionNumber("Drinker")}
                      </select>
                    </label>
                    <label>
                      Min Number of Drinks By Brewery
                      <select value={chosenDrinkNum} onChange={e => setChosenDrinkNum(e.currentTarget.value)}>
                        {selectQuestionNumber("Drink")}
                      </select>
                    </label>
                  </div>
                {/* {expandedBreweryName && (
                  <div className="breweryDrinksTable">
                    <BreweryDrinksTable
                      breweryObjectsArray={breweryObjectsArray}
                      expandedBreweryName={expandedBreweryName}
                    />
                  </div>
                )} */}
                </div>
              </div>
            </Container>
          </div>
        </div>
      )
    }
}

export default BreweryScroll;
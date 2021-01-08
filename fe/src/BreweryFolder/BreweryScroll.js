import React, { useEffect, useState, useMemo } from "react";
import { Container } from "reactstrap";
import '../Stylesheets/BreweryScroll.css';
import BreweryTableContainer from "./BreweryTableContainer";
import { SearchColumnFilter } from './filters';

function BreweryScroll(props) {

  const [drinks, setDrinks] = useState(props.drinks)
  const [allBeersAndCiders, setAllBeersAndCiders] = useState([])
  const [breweryObjectsArray, setBreweryObjectsArray] = useState()
  const [chosenDrinkerNum, setChosenDrinkerNum] = useState(1)
  const [chosenDrinkNum, setChosenDrinkNum] = useState(1)

  useEffect(() => {
    if(props.drinks) {
      (async () => {
        setDrinks(props.drinks)
        let drunkBeersAndCiders = []
        if(drinks) {
          drinks.map((drink) => {
            if((drink.drinkType === "Beer" || drink.drinkType === "Cider") && drink.mixerOne === "") {
              drunkBeersAndCiders.push(drink)
            }
          })
        }
        setAllBeersAndCiders(drunkBeersAndCiders)
      })();
    }
  }, [props, chosenDrinkerNum, chosenDrinkNum])

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
        let soloDrinksAverage = '';
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
                  // SET SOLO DRINKS AVERAGE
        if(soloDrinkScores.length === 0) { soloDrinksAverage = "-" }
        else
        { soloDrinksAverage = parseFloat((soloDrinkScores.reduce((a,b) => a+b,0)/soloDrinkScores.length).toFixed(2)) }
        if(ownDrinkCount === 0) {ownDrinkCount = "-"}
        if(collabDrinkCount === 0) {collabDrinkCount = "-"}
        // SET ALL DRINKS AVERAGE
        const allDrinksAverage = parseFloat((allDrinkScores.reduce((a,b) => a+b,0)/allDrinkScores.length).toFixed(2))
        const breweryObject = {
          breweryName: brewery,
          breweryDrinkerCount: uniqueDrinkerNumber,
          breweryOwnDrinkCount: ownDrinkCount,
          breweryCollabDrinkCount: collabDrinkCount,
          breweryTotalDrinksCount: totalDrinkCount,
          breweryOwnDrinkAvgScore: soloDrinksAverage,
          breweryTotalDrinkAvgScore: allDrinksAverage
        }
        localBreweryObjectsArray.push(breweryObject)

      }) // THIS ENDS THE BREWERY LOOP
        setBreweryObjectsArray(localBreweryObjectsArray)
    }
  }

  const renderRowSubComponent = row => {
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
        <div>{index + 1}) {drink.name} drank {drink.drinkMain} <br></br></div>
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
        Header: "TOP OF THE SCROLL",
        columns: [
          {
            Header: "Brewery Name Search",
            accessor: "breweryName",
            Filter: SearchColumnFilter,
          },
          {
            Header: "Drinkers",
            accessor: "breweryDrinkerCount",
            disableFilters: true,
            sortDescFirst: true
          },
          {
            Header: "Total Drink Count",
            accessor: "breweryTotalDrinksCount",
            disableFilters: true,
            sortDescFirst: true
          },
          {
            Header: "Total Drink Average",
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
            sortType: "basic",
            sortDescFirst: true
          },
        ],
      },
    ],[]
  )

    if(!breweryObjectsArray) {
      return <p> No Drinks</p>
    } else {
      return(
        <div className="scrollAndCheckboxes">
          <Container>
            <div className="insideContainerTable">
              <BreweryTableContainer
                columns={columns}
                data={breweryObjectsArray}
                renderRowSubComponent={renderRowSubComponent}
              />
            </div>
          </Container>
            <div className="dataEditChckboxes">
              <h4>Edits</h4>
              <label>
                Min Number Of Brewery Drinkers:
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
        </div>
      )
    }
}

export default BreweryScroll;
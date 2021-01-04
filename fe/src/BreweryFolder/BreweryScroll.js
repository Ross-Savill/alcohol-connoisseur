import React, { useEffect, useState, useMemo } from "react";
import { Container } from "reactstrap";
import '../Stylesheets/BreweryScroll.css';
import BreweryTableContainer from "./BreweryTableContainer";

function BreweryScroll(props) {

  const [drinks, setDrinks] = useState(props.drinks)
  const [allBeersAndCiders, setAllBeersAndCiders] = useState([])
  const [breweryObjectsArray, setBreweryObjectsArray] = useState()

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
  }, [props])

  useEffect(() => {
    makeBreweryData();
  },[allBeersAndCiders])

  const makeBreweryData = () => {
    console.log(allBeersAndCiders)
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
        const uniqueDrinkersPreFix = [...new Set(breweryDrinkers)]
        const allUniqueDrinkers = uniqueDrinkersPreFix.map((drinker, i) => {
          if(uniqueDrinkersPreFix.length === 1) {
          return drinker
          } else {
          return `(${i+1}) ${drinker} `
          }
        })
        // GET TOTAL DRINKS
        const totalDrinkCount = ownDrinkCount + collabDrinkCount;
        // SET SOLO DRINKS AVERAGE
        if(soloDrinkScores.length === 0) { soloDrinksAverage = "Collaborator Only" }
        else
        { soloDrinksAverage = parseFloat((soloDrinkScores.reduce((a,b) => a+b,0)/soloDrinkScores.length).toFixed(2)) }
        // SET ALL DRINKS AVERAGE
        const allDrinksAverage = parseFloat((allDrinkScores.reduce((a,b) => a+b,0)/allDrinkScores.length).toFixed(2))

        const breweryObject = {
          breweryName: brewery,
          breweryDrinkers: allUniqueDrinkers,
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

  const columns = useMemo(
    () => [
      {
        Header: "Brewery Name",
        accessor: "breweryName",
      },
      {
        Header: "Drinkers",
        accessor: "breweryDrinkers",
      },
      {
        Header: "Total Drink Count",
        accessor: "breweryTotalDrinksCount",
      },
      {
        Header: "Total Drink Average",
        accessor: "breweryTotalDrinkAvgScore",
      },
    ],
    []
  )

    if(!breweryObjectsArray) {
      return <p> No Drinks</p>
    } else {
      return(
        <div className="scrollAndCheckboxes">
        <div>
          <Container style={{ marginTop: 100 }}>
            <BreweryTableContainer columns={columns} data={breweryObjectsArray} />
          </Container>
        </div>
          <div className="breweryScrollTable">
        </div>
          <div className="checkboxDiv">
            <div className="hideColumnsChbxAndLabel">
            <label className="hideCollabInfoLabel">Show Collaboration Info <br/>
              <input type="checkbox" className="hideCollabInfo" a/>
            </label>
            </div>
          </div>
        </div>
      )
    }
}

export default BreweryScroll;
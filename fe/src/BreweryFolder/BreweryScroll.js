import React, { useEffect, useState, useMemo } from "react";
import { useFlexLayout } from "react-table";
import { Container, Card, CardImg, CardText, CardBody, CardTitle, } from "reactstrap";
import '../Stylesheets/BreweryScroll.css';
import BreweryTableContainer from "./BreweryTableContainer";
import { SearchColumnFilter } from './filters';

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

        // GET TOTAL DRINKS
        const totalDrinkCount = ownDrinkCount + collabDrinkCount;
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

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row, index }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        )
      },
      {
        Header: "All Brewery Drinks",
        columns: [
          {
            Header: "Brewery Name Search",
            accessor: "breweryName",
            Filter: SearchColumnFilter,
          },
          {
            Header: "Drinkers",
            accessor: "breweryDrinkerCount",
            disableFilters: true
          },
          {
            Header: "Total Drink Count",
            accessor: "breweryTotalDrinksCount",
            disableFilters: true
          },
          {
            Header: "Total Drink Average",
            accessor: "breweryTotalDrinkAvgScore",
            disableFilters: true
          },
        ],
      },
      {
        Header: "Own Drinks Vs Collabs",
        columns: [
          {
            Header: "Solo Drink Count",
            accessor: "breweryOwnDrinkCount",
            disableFilters: true
          },
          {
            Header: "Collab Drink Count",
            accessor: "breweryCollabDrinkCount",
            disableFilters: true
          },
          {
            Header: "Solo Drink Avg Score",
            accessor: "breweryOwnDrinkAvgScore",
            disableFilters: true
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
        <div>
          <Container>
            <BreweryTableContainer
              columns={columns}
              data={breweryObjectsArray}
              renderRowSubComponent={renderRowSubComponent} />
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
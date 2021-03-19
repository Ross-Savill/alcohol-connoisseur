import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../MyUtilitiesFolder/Navbar';
import '../Stylesheets/MainPageSS/HomePage.css';
import Table from './Table';
import moment from 'moment';
import LoadingSpin from '../MyUtilitiesFolder/LoadingSpin';
import { Link } from 'react-router-dom';

const Dates = ( values ) => {
  for (const [key, date] of Object.entries(values)) {
    const newDate = new Date(date)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return +newDate.getDate() + " " + (month[newDate.getMonth()]) + " " + newDate.getFullYear().toString().substr()
  }
}

function HomePage(props) {

  const [data, setData] = useState(props.drinks);
  const [date, setDate] = useState("...")
  const [drinkTotal, setDrinkTotal] = useState("...")

  useEffect(() => {
    (async () => {
      setData(props.drinks)
      if(data) {
        setDate(moment((data.map((drinks) => drinks.date).reduce(function (a, b) { return a > b ? a : b; }))).format('dddd Do MMMM YYYY'))
        setDrinkTotal(data.length + 1)
      }
    })();
  }, [props, data]);

  const columns = useMemo(
    () => [
      {
        Header: `We've had ${drinkTotal} drinks as of our last session ending on ${date}`,
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Date",
            accessor: "date",
            width: "100",
            Cell: ({ cell: { value } }) => <Dates values={value} />
          },
          {
            Header: "Drink",
            id: "mainDrinkColumn",
            accessor: d =>
              (
                d.mixerSeven ?
                  `${d.drinkMain} WITH ${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour}, ${d.mixerFive}, ${d.mixerSix} and ${d.mixerSeven}`:
                d.mixerSix ?
                  `${d.drinkMain} WITH ${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour}, ${d.mixerFive} and ${d.mixerSix}`:
                d.mixerFive ?
                  `${d.drinkMain} WITH ${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour} and ${d.mixerFive}`:
                d.mixerFour ?
                  `${d.drinkMain} WITH ${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree} and ${d.mixerFour}`:
                d.mixerThree ?
                  `${d.drinkMain} WITH ${d.mixerOne}, ${d.mixerTwo} and ${d.mixerThree}`:
                d.mixerTwo ?
                  `${d.drinkMain} WITH ${d.mixerOne} and ${d.mixerTwo}`:
                d.mixerOne ?
                  `${d.drinkMain} WITH ${d.mixerOne}` : `${d.drinkMain}`
              ),
            minWidth: "385"
          },
          {
            Header: "Type",
            accessor: "drinkType",
            width: "70"
          },
          {
            Header: "ABV%",
            accessor: "abv",
            width: "50",
            sortType: "sortAvg",
            Cell: ({ cell: { value } }) => parseFloat((value * 100).toFixed(1)) + '%'
          },
          {
            Header: "Rating Words",
            accessor: d => `${d.ratingWordOne}, ${d.ratingWordTwo}`,
            width: "150"
          },
          {
            Header: "Score",
            accessor: "score",
            width: "60",
          },
          {
            Header: "Company(s)",
            accessor: d =>
              (d.secondCollabCompany ?
                `${d.company} X ${d.firstCollabCompany} X ${d.secondCollabCompany}`:
              d.firstCollabCompany ?
                `${d.company} X ${d.firstCollabCompany}` : `${d.company}`
              ),
            width: "165"
          },
          {
            Header: "Notes",
            accessor: "notes",
            minWidth: "310"
          },
        ]
      }
    ],
    [date, drinkTotal]
  );
  if(!data) {
    return <div className="mainPageLoadingDiv"><LoadingSpin /></div>
  } else {
  return (
    <div className="homepageContainer">
      <div>
        <h1 className="mainTitle">
          <div className="dnrTitle">Welcome to Drink And Rate!!!</div>
          <Link className="theBoardLink" to="/theboard">The Board</Link>
        </h1>
        <Navbar />
      </div>
      <div className="App">
        <Table columns={columns} data={data} drinkers={props.drinkers} />
      </div>
    </div>
    )
  }
}

  export default HomePage;

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../MyUtilitiesFolder/Navbar';
import '../Stylesheets/MainPageSS/HomePage.css';
import Table from './Table';
import moment from 'moment';
import AddDrinkForm from './AddDrinkForm';
import LoadingSpin from '../MyUtilitiesFolder/LoadingSpin';

const Dates = ( values ) => {
  for (const [key, date] of Object.entries(values)) {
    const newDate = new Date(date)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return +newDate.getDate() + " " + (month[newDate.getMonth()]) + " " + newDate.getFullYear().toString().substr(-2)
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
        setDate(moment((data.map((drinks) => drinks.date)
        .reduce(function (a, b) { return a > b ? a : b; }))).format('dddd Do MMMM YYYY'))
        setDrinkTotal(data.length)
      }
    })();
  }, [props, data]);

  const columns = useMemo(
    () => [
      {
        Header: `We've had ${drinkTotal} drinks as of our last session on ${date}`,
        columns: [
          {
            Header: "Name",
            accessor: "name",
            width: "120",
          },
          {
            Header: "Date",
            accessor: "date",
            width: "70",
            Cell: ({ cell: { value } }) => <Dates values={value} />
          },
          {
            Header: "Drink",
            id: "mainDrinkColumn",
            accessor: d =>
              (
                d.mixerSix ?
                  `${d.drinkMain} with ${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour}, ${d.mixerFive} and ${d.mixerSix}`:
                d.mixerFive ?
                  `${d.drinkMain} with ${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour} and ${d.mixerFive}`:
                d.mixerFour ?
                  `${d.drinkMain} with ${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree} and ${d.mixerFour}`:
                d.mixerThree ?
                  `${d.drinkMain} with ${d.mixerOne}, ${d.mixerTwo} and ${d.mixerThree}`:
                d.mixerTwo ?
                  `${d.drinkMain} with ${d.mixerOne} and ${d.mixerTwo}`:
                d.mixerOne ?
                  `${d.drinkMain} with ${d.mixerOne}` : `${d.drinkMain}`
              ),
            width: "300"
          },
          {
            Header: "Drink Type",
            accessor: "drinkType",
            width: "70"
          },
          {
            Header: "ABV%",
            accessor: "abv",
            width: "50",
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
            width: "130"
          },
          {
            Header: "Notes",
            accessor: "notes",
            width: "250"
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
    <div>
      <div>
        <h1 className="mainTitle">Welcome to Drink And Rate!!!</h1>
        <Navbar />
        {/* <AddDrinkForm options={data}/> */}
      </div>
      <div className="App">
        <Table columns={columns} data={data} />
      </div>
    </div>
    )
  }
}

  export default HomePage;

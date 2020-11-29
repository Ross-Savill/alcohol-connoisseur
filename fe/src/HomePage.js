import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './Navbar';
import './Stylesheets/HomePage.css';
import Table from './Table';
import AddDrinkForm from './AddDrinkForm';

const Dates = ( values ) => {
  for (const [key, date] of Object.entries(values)) {
    const newDate = new Date(date)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return +newDate.getDate() + " " + (month[newDate.getMonth()]) + " " + newDate.getFullYear().toString().substr(-2)
  }
}

function HomePage(props) {

  const [data, setData] = useState(props.drinks);

  useEffect(() => {
    (async () => {
      setData(props.drinks)
    })();
  }, [props]);


  const columns = useMemo(
    () => [
      {
        Header: "All Drinks",
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
            Header: "Main Component",
            accessor: "drinkMain",
            width: "250"
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
            Header: "Brand or Brewery",
            accessor: "brand",
            width: "120"
          },
          {
            Header: "Other Component(s) and/or Mixer(s)",
            accessor: d => (d.mixerSix ?
                           `${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour}, ${d.mixerFive}, ${d.mixerSix}`:
                            d.mixerFive ?
                           `${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour}, ${d.mixerFive}`:
                            d.mixerFour ?
                           `${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}, ${d.mixerFour}`:
                            d.mixerThree ?
                           `${d.mixerOne}, ${d.mixerTwo}, ${d.mixerThree}`:
                            d.mixerTwo ?
                           `${d.mixerOne}, ${d.mixerTwo}`:
                            d.mixerOne ?
                           `${d.mixerOne}` : "")
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
            Header: "Collaborator(s)",
            width: "120",
            accessor: d => (d.secondCollabCompany ?
              `${d.firstCollabCompany}, ${d.secondCollabCompany}`:
               d.firstCollabCompany ?
              `${d.firstCollabCompany}`: "")
          },
          {
            Header: "Company",
            accessor: "company",
            width: "130"
          },
          {
            Header: "Notes",
            accessor: "notes"
          },
        ]
      }
    ],
    []
  );
  if(!data) {
    return <h1>Hold Your Horses One Sec...</h1>
  } else {
  return (
    <div>
      <div>
        <h1 className="mainTitle">Welcome to Drink And Rate!!!</h1>
        <Navbar />
        <AddDrinkForm options={data}/>
      </div>
      <div className="App">
        <Table columns={columns} data={data} />
      </div>
    </div>
    )
  }
}

  export default HomePage;

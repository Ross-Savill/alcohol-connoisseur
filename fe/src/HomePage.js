import React, { useState, useEffect, useMemo } from 'react';
import './HomePage.css';
import Table from './Table';
import axios from 'axios';
import AddDrinkForm from './AddDrinkForm';


const Dates = ({ date }) => {
  const fixedDate = new Date(date);
  return fixedDate.getUTCDate
}

const Scores = ({ values }) => {
  if(values > 7.5) {
    return (
      <span className="goodBadge">
        {values}
      </span>
    )
  } else if (values <= 7.5 && values >= 4) {
    return (
      <span className="averageBadge">
        {values}
      </span>
    )
  } else {
    return (
      <span className="badBadge">
        {values}
      </span>
    )
  }
}

function HomePage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const allDrinks = await axios("http://localhost:5000/drinks");
      setData(allDrinks.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "All Drinks",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Date",
            accessor: "date",
            Cell: ({ cell: { date } }) => <Dates values={date} />
          },
          {
            Header: "Main Component",
            accessor: "drinkMain"
          },
          {
            Header: "Drink Type",
            accessor: "drinkType"
          },
          {
            Header: "Brand or Brewery",
            accessor: "brand"
          },
          {
            Header: "Other Component(s) and/or Mixer(s)",
            accessor: d => (d.mixerTwo ?
                           `${d.mixerOne}, ${d.mixerTwo}`:
                            d.mixerOne ?
                           `${d.mixerOne}` : "")
          },
          {
            Header: "Rating Word One",
            accessor: "ratingWordOne"
          },
          {
            Header: "Rating Word Two",
            accessor: "ratingWordTwo"
          },
          {
            Header: "Score",
            accessor: "score",
            Cell: ({ cell: { value } }) => <Scores values={value} />
          },
          {
            Header: "Collaborator",
            accessor: "collabOne"
          },
          {
            Header: "Additional Collaborator",
            accessor: "collabTwo"
          },
          {
            Header: "Company",
            accessor: "company"
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

  return (
    <div>
      <div>
        <h1 className="mainTitle">Welcome to Drink And Rate!!!</h1>
        <AddDrinkForm />
      </div>
      <div className="App">
        <Table columns={columns} data={data} />
      </div>
    </div>
    )
  }

  export default HomePage;

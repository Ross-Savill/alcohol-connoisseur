import React, { useState } from 'react';
import '../Stylesheets/BoardFolder/TheBoard.css';
import { useAuth0 } from '@auth0/auth0-react';
import AddDrinkForm from './AddDrinkForm';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TheBoard =({ drinks, drinkers, drinkTypes }) => {

  const [ displayAddForm, setDisplayAddForm ] = useState(false)
  const { user, getAccessTokenSilently } = useAuth0();

  const addDrinkToBoard = async (drink) => {
  const token = await getAccessTokenSilently();
  const config = {
    headers: { 'Authorization': `Bearer ${token}` }
  }
  axios.post(`https://drinkandrate.herokuapp.com/postdrinktoboard`, drink, config)
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
  }

  return(
    <div className="theBoardContainer">
      {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
      <button className="addDrinkButton" onClick={() => setDisplayAddForm(true)}>Add a Drink</button>
      : null }
      <Link className="mainTableButton" to="/">
        <button>Back to Main Table</button>
      </Link>
      <div className="theBoardTableDiv">
        <table className="theBoardTable">
          <thead className="theBoardTHead">
            <tr>
              <th className="theBoardMainHeader" colSpan="8">🍺🍺🍺THE BOARD🍺🍺🍺</th>
            </tr>
            <tr>
              <th>Drinker</th>
              <th>Time</th>
              <th>Drink</th>
              <th>ABV(%)</th>
              <th>Company(s)</th>
              <th>Rating Words</th>
              <th>Score</th>
              <th>Complete?</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
      {displayAddForm && <AddDrinkForm drinks={drinks}
                                       drinkers={drinkers}
                                       setDisplayAddForm={setDisplayAddForm}
                                       drinkTypes={drinkTypes}
                                       addDrinkToBoard={addDrinkToBoard}
                         />}
    </div>
  )
}

export default TheBoard;
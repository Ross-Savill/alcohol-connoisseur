import React, { useEffect, useState } from 'react';
import '../Stylesheets/BoardFolder/TheBoard.css';
import { useAuth0 } from '@auth0/auth0-react';
import AddDrinkForm from './AddDrinkForm';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import greentick from './green-checkmark.png';

const TheBoard =({ drinks, drinkers, drinkTypes }) => {

  const [ displayAddForm, setDisplayAddForm ] = useState(false)
  const [ boardDrinks, setBoardDrinks ] = useState([])
  const [ drinkToEdit, setDrinkToEdit ] = useState(null)

  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if(drinks){
      let drinksForTheBoard = [];
      drinks.map((drink) => {
        if(drink.confirmed === false) {
          drinksForTheBoard.unshift(drink)
        }
      })
      setBoardDrinks(drinksForTheBoard)
    }
  },[drinks])

  const callAddForm = () => {
    setDrinkToEdit(null)
    setDisplayAddForm(true)
  }

  const callEditForm = (drink) => {
    setDrinkToEdit(drink)
    setDisplayAddForm(true)
  }

  const addDrinkToBoard = async (drink) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.post(`https://drinkandrate.herokuapp.com/postdrinktoboard`, drink, config)
      .then(resp => console.log(resp))
      .catch(error => console.log(error))
  }

  const editDrinkOnBoard = async (drink) => {
    const drinkId = drink.id
    console.log(drinkId)
    const token = await getAccessTokenSilently();
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.patch(`https://drinkandrate.herokuapp.com/editdrinkonboard/${drinkId}`, drink, config)
      .then(resp => console.log(resp))
      .catch(error => console.log(error))
  }

  const sessionDrinkData = () => {
    if(boardDrinks.length === 0) {
      return(
        <tr>
          <td className="noDrinksOnBoardTd"colSpan="8">Nothing On The Board!</td>
        </tr>
      )
    } else {
      return boardDrinks.map((drink, index) => {
        let missingPieces = [];
        if(!drink.abv) missingPieces.push("ABV ")
        if(!drink.ratingWordOne || !drink.ratingWordTwo || !drink.score) missingPieces.push("Full Verdict")
        return (
            <tr key={index}>
              <td>{drink.name}</td>
              <td>{!drink.date ? "Awaiting Verdict" : moment(drink.date).format('h:mma')}</td>
              <td>{drink.drinkMain} {drink.abv ? `(${drink.abv*100}%)` : `(???)`}</td>
              <td> {drink.ukUsa ? `${drink.company} (${drink.ukUsa})`
                                      : drink.country ? `${drink.company} (${drink.country})`
                                      : `${drink.company} (???)`}
              {drink.firstUkUsa ? ` X ${drink.firstCollabCompany} (${drink.firstUkUsa})`
                                      : drink.firstCollabCountry ? ` X ${drink.firstCollabCompany} (${drink.firstCollabCountry})`
                                      : drink.firstCollabCompany ? `X ${drink.firstCollabCompany} (???)`
                                      : ""}
             {drink.secondUkUsa ? ` X ${drink.secondCollabCompany} (${drink.secondUkUsa})`
                                      : drink.secondCollabCountry ? ` X ${drink.secondCollabCompany} (${drink.secondCollabCountry})`
                                      : drink.secondCollabCompany ? `X ${drink.secondCollabCompany} (???)`
                                      : ""}
              </td>
              <td> {!drink.ratingWordOne && !drink.ratingWordTwo ? "-" : `${drink.ratingWordOne}, ${drink.ratingWordTwo}`}</td>
              <td>{drink.score}</td>
              <td>{missingPieces.length ? "Need: " + missingPieces.map((piece) => piece) : <img src={greentick} alt="DONE" height="20px" width="20px"></img>}</td>
              {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
                <td><button className="editDrinkButton" onClick={() => callEditForm({drink})}>Edit Drink</button></td>
              : null }
            </tr>
        )
      })
    }
  }

  return(
    <div className="theBoardContainer">
      {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
      <button className="addDrinkButton" onClick={() => callAddForm()}>Add a Drink</button>
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
              <th>Company(s)</th>
              <th>Rating Words</th>
              <th>Score</th>
              <th>Complete?</th>
            </tr>
          </thead>
          <tbody>
            {sessionDrinkData()}
          </tbody>
        </table>
      </div>
      {displayAddForm && <AddDrinkForm drinks={drinks}
                                       drinkers={drinkers}
                                       setDisplayAddForm={setDisplayAddForm}
                                       drinkTypes={drinkTypes}
                                       addDrinkToBoard={addDrinkToBoard}
                                       drinkToEdit={drinkToEdit}
                                       editDrinkOnBoard={editDrinkOnBoard}
                         />}
    </div>
  )
}

export default TheBoard;
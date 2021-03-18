import React, { useEffect, useState } from 'react';
import '../Stylesheets/BoardFolder/TheBoard.css';
import { useAuth0 } from '@auth0/auth0-react';
import AddDrinkForm from './AddDrinkForm';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import greentick from './green-checkmark.png';

const TheBoard =({ drinkers, drinkTypes }) => {

  const [ drinks, setDrinks ] = useState (null)
  const [ displayAddForm, setDisplayAddForm ] = useState(false)
  const [ boardDrinks, setBoardDrinks ] = useState([])
  const [ drinkToEdit, setDrinkToEdit ] = useState(null)
  const [ sessionId, setSessionId ] = useState(null)

  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      if(drinks === null) {
        const token = await getAccessTokenSilently();
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        }
        axios.get("https://drinkandrate.herokuapp.com/drinks", config)
        .then(resp => setDrinks(resp.data))
        .catch(error => console.log(error))
      }
    }

    if(drinks){
      let drinksForTheBoard = [];
      drinks.map((drink) => {
        if(drink.confirmed === false) {
          drinksForTheBoard.unshift(drink)
        }
      })
      setBoardDrinks(drinksForTheBoard)
    }
    fetchData()
  },[drinks])

  if(sessionId === null && drinks) {
    const uniqueSessionIds = new Set()
    drinks.forEach((drink) => {
      if(drink.confirmed === true) {
        uniqueSessionIds.add(drink.sessionId)
      }
    })
    setSessionId(uniqueSessionIds.size + 1)
  }

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

    axios.get("https://drinkandrate.herokuapp.com/drinks", config)
    .then(resp => setDrinks(resp.data))
    .catch(error => console.log(error))
  }

  const editDrinkOnBoard = async (drink) => {
    const drinkId = drink.id
    const token = await getAccessTokenSilently();
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.patch(`https://drinkandrate.herokuapp.com/editdrinkonboard/${drinkId}`, drink, config)
      .then(resp => console.log(resp))
      .catch(error => console.log(error))

    axios.get("https://drinkandrate.herokuapp.com/drinks", config)
    .then(resp => setDrinks(resp.data))
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
        const namesArray = drink.name.split(" ");
        const firstName = namesArray[0]
        let missingPieces = [];
        if(!drink.abv) missingPieces.push("ABV ")
        if(!drink.ratingWordOne || !drink.ratingWordTwo || !drink.score) missingPieces.push("Verdict")
        let displayedAbv;
        if(drink.abv) { displayedAbv = (((drink.abv * 10000)/100).toFixed(2)) % 1 === 0 ? `(${(drink.abv*100).toFixed(0)}%)` : `(${(drink.abv*100).toFixed(1)}%)`} else { displayedAbv = `(???)` }
        return (
          <tr key={index}>
            <td>{firstName}</td>
            <td>{!drink.date ? "Awaiting Verdict" : moment(drink.date).format('h:mma')}</td>
            <td>{drink.mixerSix ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive} and ${drink.mixerSix}`
              : drink.mixerFive ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour} and ${drink.mixerFive}`
              : drink.mixerFour ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree} and ${drink.mixerFour}`
              : drink.mixerThree ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo} and ${drink.mixerThree}`
              : drink.mixerTwo ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne} and ${drink.mixerTwo}`
              : drink.mixerOne ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}`
              : `${drink.drinkMain} ${displayedAbv}`
            }</td>
            <td> {!drink.ratingWordOne && !drink.ratingWordTwo ? "-" : `${drink.ratingWordOne}, ${drink.ratingWordTwo}`}</td>
            <td>{drink.score}</td>
            <td>{drink.notes}</td>
            <td>{missingPieces.length ? "Need: " + missingPieces.map((piece) => piece) : <img src={greentick} alt="DONE" height="20px" width="20px"></img>}</td>
            {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
              <td><button className="editDrinkButton" onClick={() => callEditForm({drink})}>Edit Drink</button></td>
            : null }
          </tr>
        )
      })
    }
  }

  const submitCheck = () => {
    let drinksToCheck = [];
    boardDrinks.map((drink) => {
      if(drink.ratingWordOne === "" || drink.ratingWordTwo === "" || drink.score === "" ||
         drink.abv === "" || drink.company === "" || drink.country === "") {
           drinksToCheck.push(drink.drinkMain)
         }
      if(drinksToCheck.length > 0) {
        const imperfectDrinks = drinksToCheck.map((impDrink) => {
          return <li>{impDrink}</li>
        })
        return alert(`Check the following drinks: ${<ul>{imperfectDrinks}</ul>}`)
      } else {
        finalSubmit()
      }
    })
  }

  const finalSubmit = async () => {
    if(window.confirm('All drinks ready to go - Confirm All Drinks?')) {
      const token = await getAccessTokenSilently();
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
      axios.patch(`https://drinkandrate.herokuapp.com/confirmdrinks`, null, config)
      .then(resp => console.log(resp))
      .catch(error => console.log(error))

      axios.get("https://drinkandrate.herokuapp.com/drinks", config)
      .then(resp => setDrinks(resp.data))
      .catch(error => console.log(error))
    } else {
      return;
    }
  }

  return(
    <div className="theBoardContainer">
      {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
        <button className="addDrinkButton" onClick={() => callAddForm()}>Add a Drink</button>
      : null}
      <Link className="mainTableButton" to="/">
        <button>Back to Main Table</button>
      </Link>
      <div className="theBoardTableDiv">
        <table className="theBoardTable">
          <thead className="theBoardTHead">
            <tr className="theBoardMainHeaderRow">
              <th className="theBoardMainHeader" colSpan="8">
                <div className="theBoardMainHeaderContainer">
                  <div>{moment(new Date()).format('ddd Do MMMM')}</div>
                  <div>🍻🍻🍻 THE BOARD 🍻🍻🍻</div>
                  <div>Session #: {sessionId}</div>
                </div>
              </th>
            </tr>
            <tr className="theBoardHeadersRow">
              <th className="theBoardTh">Drinker</th>
              <th className="theBoardTh">Time</th>
              <th className="theBoardTh">Drink</th>
              <th className="theBoardTh">Description</th>
              <th className="theBoardTh">Score</th>
              <th className="theBoardTh">Notes</th>
              <th className="theBoardTh">Done?</th>
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
                                       sessionId={sessionId}
                         />
      }
        {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
          <button className="databaseSubmit" onClick={() => submitCheck()}>Submit All Drinks to Database</button>
      : null }
    </div>
  )
}

export default TheBoard;
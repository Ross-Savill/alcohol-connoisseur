import React, { useEffect, useState } from 'react';
import '../Stylesheets/BoardFolder/TheBoard.css';
import { useAuth0 } from '@auth0/auth0-react';
import AddDrinkForm from './AddDrinkForm';
import DrinksBreakdownTable from './DrinksBreakdownTable';
import Soundboard from './Soundboard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import LoadingSpin from '../MyUtilitiesFolder/LoadingSpin';
import greentick from '../MyUtilitiesFolder/Images/green-checkmark.png';

const TheBoard = ({ drinkTypes }) => {

  const [ drinks, setDrinks ] = useState (null)
  const [ drinkers, setDrinkers ] = useState (null)
  const [ admin, setAdmin ] = useState(false)
  const [ userId, setUserId ] = useState(null)
  const [ displayAddForm, setDisplayAddForm ] = useState(false)
  const [ displaySoundboard, setDisplaySoundboard ] = useState(false)
  const [ boardDrinks, setBoardDrinks ] = useState([])
  const [ totalDrinksNum, setTotalDrinksNum ] = useState()
  const [ drinkToEdit, setDrinkToEdit ] = useState(null)
  const [ sessionData, setSessionData ] = useState({
          sessionStatus: null,
          sessionId: null
  })

  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      if(drinks === null) {
        const token = await getAccessTokenSilently();
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        }
        axios.get("https://drinkandrate.herokuapp.com/sessions", config)
          .then(resp => setSessionData({
            sessionStatus: resp.data.sessionActive,
            sessionId: resp.data.sessionNum
          }))
          .catch(error => console.log(error))

        axios.get("https://drinkandrate.herokuapp.com/drinks", config)
          .then(resp => setDrinks(resp.data))
          .catch(error => console.log(error))

        axios.get("https://drinkandrate.herokuapp.com/users", config)
          .then(resp => setDrinkers(resp.data))
          .catch(error => console.log(error))
      }
    }

    if(drinks){
      let drinkCount = 0;
      drinks.map((drink) => {
        if(drink.confirmed === true) {
          drinkCount = drinkCount + 1
        }
      })
      setTotalDrinksNum(drinkCount + 1)

      let drinksForTheBoard = [];
      drinks.map((drink) => {
        if(drink.sessionId === sessionData.sessionId) {
          drinksForTheBoard.unshift(drink)
        }
      })
      setBoardDrinks(drinksForTheBoard)
      if(user['https://drinkandrate.netlify.app/roles'][0] === "admin"){
        setAdmin(true)
      }
      setUserId(user.sub.substr(6))
    }
    fetchData()
  },[drinks])

  const beginDnR = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.patch(`https://drinkandrate.herokuapp.com/startsession`, null, config)
      .then(resp => console.log(resp))
      .catch(error => console.log(error))

    axios.get("https://drinkandrate.herokuapp.com/drinks", config)
    .then(resp => setDrinks(resp.data))
    .catch(error => console.log(error))
  }

  const callAddForm = () => {
    setDrinkToEdit(null)
    setDisplayAddForm(true)
  }

  const callEditForm = (drink) => {
    setDrinkToEdit(drink)
    setDisplayAddForm(true)
  }

  const callSoundboard = () => {
    setDisplaySoundboard(true)
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

  const confirmDrink = async (drink) => {
    const drinkId = drink._id
    const token = await getAccessTokenSilently();
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.patch(`https://drinkandrate.herokuapp.com/confirmSoloDrink/${drinkId}`, drink, config)
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
          <td className="noDrinksOnBoardTd"colSpan="9">Nothing On The Board!</td>
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
        if(drink.abv) { displayedAbv = (((drink.abv * 10000)/100).toFixed(2)) % 1 === 0 ?
          `(${(drink.abv*100).toFixed(0)}%)` :
          `(${(drink.abv*100).toFixed(1)}%)`
        } else { displayedAbv = `(???)` }

        let sameDrinks = [];
        let sameDrinkEntry = "";
        drinks.map((totalDrink) => {
          if(drink.mixerOne) {
            sameDrinkEntry = "❌ (Has Mixer)"
          } else if(!totalDrink.mixerOne && drink._id !== totalDrink._id && drink.drinkMain === totalDrink.drinkMain && (drink.company === totalDrink.company ||
             drink.firstCollabCompany === totalDrink.company || drink.secondCollabCompany === totalDrink.company)) {
                sameDrinks.push(totalDrink)
             }
        })

        if(!drink.mixerOne) {
          sameDrinks.length === 0 ? sameDrinkEntry = "First Time Drink!" :
          user.sub.substr(6) === drink.drinkerId && (drink.ratingWordOne === "" || drink.ratingWordTwo === "" || (drink.score === null || "")) ?
          sameDrinkEntry = "'Rate' and See!" :
          sameDrinkEntry = sameDrinks.map(sameDrink => `${sameDrink.name}, (${sameDrink.ratingWordOne} ${sameDrink.ratingWordTwo} - ${sameDrink.score}) `)
        }

        const drinkRowClass = drink.ratingWordOne === "" || drink.ratingWordTwo === "" || (drink.score === null || "") ? "stillToRate"
        : drink.ratingWordOne !== "" && drink.ratingWordTwo !== "" && drink.score !== "" && drink.confirmed !== true ? "toBeAnnounced"
        : "confirmed";

        return (
          <tr key={index}
              className={drinkRowClass} >
            <td>{firstName}</td>
            <td>{!drink.date ? "Awaiting Verdict" : moment(drink.date).format('h:mma')}</td>
            <td>{ drink.mixerEight ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive}, ${drink.mixerSix}, ${drink.mixerSeven} and ${drink.mixerEight}`
              : drink.mixerSeven ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive}, ${drink.mixerSix} and ${drink.mixerSeven}`
              : drink.mixerSix ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive} and ${drink.mixerSix}`
              : drink.mixerFive ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour} and ${drink.mixerFive}`
              : drink.mixerFour ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree} and ${drink.mixerFour}`
              : drink.mixerThree ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo} and ${drink.mixerThree}`
              : drink.mixerTwo ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne} and ${drink.mixerTwo}`
              : drink.mixerOne ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}`
              : `${drink.drinkMain} ${displayedAbv}`
            }</td>
            <td> {drinkRowClass === "toBeAnnounced" ? "*To Be Declared*" : !drink.ratingWordOne && !drink.ratingWordTwo ? "-" : `${drink.ratingWordOne}, ${drink.ratingWordTwo}`}</td>
            <td>{drinkRowClass === "toBeAnnounced" ? "*To Be Declared*" : drink.score}</td>
            <td>{sameDrinkEntry}</td>
            <td>{missingPieces.length ? "Need: " + missingPieces.map((piece) => piece) :
                                        drinkRowClass === "toBeAnnounced" ? "-" :
                                        <img src={greentick} alt="DONE" height="20px" width="20px"></img>}
            </td>
            { admin || (userId === drink.drinkerId && (drink.ratingWordOne === "" || drink.ratingWordTwo === "" || drink.score === "")) ?
              <td><button className="editDrinkButton" onClick={() => callEditForm({drink})}>Edit Drink</button></td>
            : <td>-</td> }
            { admin && drink.confirmed === false ?
                <td><button className="confirmDrinkButton" onClick={() => confirmDrink(drink)}>Confirm Drink</button></td> : null
          }
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
      })
      if(drinksToCheck.length > 0) {
        return alert(`Check the following drinks: ${drinksToCheck.join("\n")}`)
      } else {
        finalSubmit()
      }
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
    }
    else {
      return;
    }
  }

  if(sessionData.sessionStatus === null) {
    return <LoadingSpin />
  } else if(sessionData.sessionStatus === false) {
    return(
      <div className="noSessionScreen">
        <div className="noSessionContainer">
          <div className="noSessionMessage">
              Drink And Rate is currently not in session - come back later!
          </div>
          <div className="noSessionButton">
            {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
              <button onClick={() => beginDnR()}>Start Session</button>
            : null}
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <div className={!displayAddForm ? "allBoardsContainer" : "fixedBoardBackground"}>
        <div className="soloPaperBoardContainer">
          <button className="addDrinkButton" onClick={() => callAddForm()}>Add a Drink</button>
          <Link className="mainTableButton" to="/">
            <button>Back to Main Table</button>
          </Link>
          <button className="soundboardButton" onClick={() => callSoundboard()}></button>
          <div className="theBoardTableDiv">
            <table className="theBoardTable">
              <thead className="theBoardTHead">
                <tr className="theBoardMainHeaderRow">
                  <th className="theBoardMainHeader" colSpan="9">
                    <div className="theBoardMainHeaderContainer">
                      <div>Drink#: <span className={totalDrinksNum % 1000 === 0 ? "thousanthDrink" : null}>{totalDrinksNum}</span></div>
                      <div>🍻🍻🍻 THE BOARD 🍻🍻🍻</div>
                      <div>Session#: {sessionData.sessionId}</div>
                    </div>
                  </th>
                </tr>
                <tr className="theBoardHeadersRow">
                  <th className="theBoardTh">Drinker</th>
                  <th className="theBoardTh">Time</th>
                  <th className="theBoardTh">Drink</th>
                  <th className="theBoardTh">Description</th>
                  <th className="theBoardTh">Score</th>
                  <th className="theBoardTh">Previous?</th>
                  <th className="theBoardTh">Done?</th>
                  <th className="theBoardTh">Edit</th>
                  {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
                    <th className="theBoardTh">Confirm</th> : "" }
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
                                          sessionId={sessionData.sessionId}
                                          admin={admin}
                                          userId={userId}
                            />
          }
          {displaySoundboard && <Soundboard setDisplaySoundboard={setDisplaySoundboard} />}
            {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
              <button className="databaseSubmit" onClick={() => submitCheck()}>Submit All Drinks to Database</button>
            : null }
        </div>
        <div className="drinksBreakdownContainer">
          <DrinksBreakdownTable drinkers={drinkers}
                                drinks={drinks}
          />
        </div>
      </div>
    )
  }
}

export default TheBoard;
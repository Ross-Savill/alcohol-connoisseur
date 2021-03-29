import React, { useEffect, useState } from 'react';
import '../Stylesheets/BoardFolder/TheBoard.css';
import { useAuth0 } from '@auth0/auth0-react';
import AddDrinkForm from './AddDrinkForm';
import DrinksBreakdownTable from './DrinksBreakdownTable';
import Soundboard from './Soundboard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import greentick from '../MyUtilitiesFolder/Images/green-checkmark.png';

const TheBoard = ({ drinkTypes }) => {

  const [ drinks, setDrinks ] = useState (null)
  const [ drinkers, setDrinkers ] = useState (null)
  const [ displayAddForm, setDisplayAddForm ] = useState(false)
  const [ displaySoundboard, setDisplaySoundboard ] = useState(false)
  const [ boardDrinks, setBoardDrinks ] = useState([])
  const [ totalDrinksNum, setTotalDrinksNum ] = useState()
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

        axios.get("https://drinkandrate.herokuapp.com/users", config)
        .then(resp => setDrinkers(resp.data))
        .catch(error => console.log(error))
      }
    }

    if(drinks){
      let drinkCount = 0;
      drinks.map((drink) => {
        if(drink.confirmed === true || (drink.ratingWordOne && drink.ratingWordTwo && drink.score)) {
          drinkCount = drinkCount + 1
        }
      })
      setTotalDrinksNum(drinkCount + 1)

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
        if(drink.abv) { displayedAbv = (((drink.abv * 10000)/100).toFixed(2)) % 1 === 0 ?
          `(${(drink.abv*100).toFixed(0)}%)` :
          `(${(drink.abv*100).toFixed(1)}%)`
        } else { displayedAbv = `(???)` }

        let sameDrinks = [];
        let sameDrinkEntry = "";
        drinks.map((totalDrink) => {
          if(drink.mixerOne) {
            sameDrinkEntry = "❌ (Has Mixer)"
          } else if(!drink.mixerOne && drink.drinkMain === totalDrink.drinkMain && totalDrink.confirmed === true && (drink.company === totalDrink.company ||
             drink.firstCollabCompany === totalDrink.company || drink.secondCollabCompany === totalDrink.company)) {
                sameDrinks.push(totalDrink)
             }
        })

        if(!drink.mixerOne) {
          sameDrinks.length === 0 ? sameDrinkEntry = "First Time Drink!" :
          user.sub.substr(6) === drink.drinkerId && (drink.ratingWordOne === "" || drink.ratingWordTwo === "" || drink.score === "") ?
          sameDrinkEntry = "'Rate' and See!" :
          sameDrinkEntry = sameDrinks.map(sameDrink => `${sameDrink.name}, (${sameDrink.ratingWordOne} ${sameDrink.ratingWordTwo} - ${sameDrink.score}) `)
        }

        return (
          <tr key={index}>
            <td>{firstName}</td>
            <td>{!drink.date ? "Awaiting Verdict" : moment(drink.date).format('h:mma')}</td>
            <td>{drink.mixerSeven ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive}, ${drink.mixerSix}, ${drink.mixerSeven}`
              : drink.mixerSix ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour}, ${drink.mixerFive} and ${drink.mixerSix}`
              : drink.mixerFive ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree}, ${drink.mixerFour} and ${drink.mixerFive}`
              : drink.mixerFour ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo}, ${drink.mixerThree} and ${drink.mixerFour}`
              : drink.mixerThree ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}, ${drink.mixerTwo} and ${drink.mixerThree}`
              : drink.mixerTwo ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne} and ${drink.mixerTwo}`
              : drink.mixerOne ? `${drink.drinkMain} ${displayedAbv} with ${drink.mixerOne}`
              : `${drink.drinkMain} ${displayedAbv}`
            }</td>
            <td> {!drink.ratingWordOne && !drink.ratingWordTwo ? "-" : `${drink.ratingWordOne}, ${drink.ratingWordTwo}`}</td>
            <td>{drink.score}</td>
            <td>{sameDrinkEntry}</td>
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

  return(
    <div className="allBoardsContainer">
      <div className="soloPaperBoardContainer">
        {user['https://drinkandrate.netlify.app/roles'][0] === "admin" ?
          <button className="addDrinkButton" onClick={() => callAddForm()}>Add a Drink</button>
        : null}
        <Link className="mainTableButton" to="/">
          <button>Back to Main Table</button>
        </Link>
        <button className="soundboardButton" onClick={() => callSoundboard()}></button>
        <div className="theBoardTableDiv">
          <table className="theBoardTable">
            <thead className="theBoardTHead">
              <tr className="theBoardMainHeaderRow">
                <th className="theBoardMainHeader" colSpan="8">
                  <div className="theBoardMainHeaderContainer">
                    <div>Drink#: <span className={totalDrinksNum % 1000 === 0 ? "thousanthDrink" : null}>{totalDrinksNum}</span></div>
                    <div>🍻🍻🍻 THE BOARD 🍻🍻🍻</div>
                    <div>Session#: {sessionId}</div>
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

export default TheBoard;
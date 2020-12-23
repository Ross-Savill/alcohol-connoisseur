import React, { Component } from 'react';
import './Stylesheets/ClickedRatingTable.css';

class ClickedRatingTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        clickedWord: '',
        clickedName: '',
        clickedWordDrinks: '',
      }
  }

  componentDidMount() {
    const { clickedWord, clickedName, clickedWordDrinks } = this.props
    this.setState({ clickedWord, clickedName, clickedWordDrinks })
  }

  componentDidUpdate(prevProps, prevState) {
    const { clickedWord, clickedName, clickedWordDrinks } = this.props
    if(prevState.clickedWord !== clickedWord || prevState.clickedName !== clickedName) {
      this.setState({ clickedWord, clickedName, clickedWordDrinks })
      console.log("triggered")
    }
  }

  renderClickedWordsDrinksHeader() {
    const { clickedWordDrinks, clickedWord, clickedName } = this.state
    if(!clickedName) {
      return(
        <tr>
          <th>{clickedWordDrinks.length} Drink(s) called "{clickedWord}"</th>
        </tr>
      )
    } else {
      let numOfDrinks = 0;
      clickedWordDrinks.map((drink) => {
        if(drink.name === clickedName) {
          numOfDrinks = numOfDrinks + 1
        }
      })
      return (
      <tr>
        <th>{clickedName} has used "{clickedWord}" for {numOfDrinks} drink(s).</th>
      </tr>
      )
    }
  }

  resetDrinkerName() {
    this.setState({ clickedName: '' })
    this.renderClickedWordDrinks()
  }

  renderClickedWordDrinks() {
    const { clickedWordDrinks, clickedName } = this.state
    if(!clickedName) {
        return clickedWordDrinks.map((drink, index) => {
          if(drink.mixerTwo) {
            return(
              <tr key={drink._id}>
                <td>
                {index + 1}) <span className="drinkerNameClickedWordTable">{drink.name}'s</span>
                <span className="drinkNameInTable"> {drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo}</span> -
                <span className="ratingWordsInTable">{drink.ratingWordOne}, {drink.ratingWordTwo}</span> -
                <span className="scoreInTable">{drink.score}/10</span>.
                </td>
              </tr>
            )
          } else if(drink.mixerOne) {
              return(
                <tr key={drink._id}>
                  <td>
                  {index + 1}) <span className="drinkerNameClickedWordTable">{drink.name}'s</span>
                  <span className="drinkNameInTable"> {drink.drinkMain} with {drink.mixerOne}</span> -
                  <span className="ratingWordsInTable">{drink.ratingWordOne}, {drink.ratingWordTwo}</span> -
                  <span className="scoreInTable"> {drink.score}/10</span>.
                  </td>
                </tr>
              )
          } else {
              return(
                <tr key={drink._id}>
                  <td>
                    {index + 1}) <span className="drinkerNameClickedWordTable">{drink.name}'s</span>
                    <span className="drinkNameInTable"> {drink.drinkMain}</span> -
                    <span className="ratingWordsInTable">{drink.ratingWordOne}, {drink.ratingWordTwo}</span> -
                    <span className="scoreInTable"> {drink.score}/10</span>.
                  </td>
                </tr>
              )
          }
        })
    } else {
        return clickedWordDrinks.map((drink, index) => {
          if(drink.mixerTwo && drink.name === clickedName) {
            return(
              <tr key={drink._id}>
                <td>
                  {index + 1}) <span className="drinkNameInTable">{drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo}</span> -
                  <span className="ratingWordsInTable"> {drink.ratingWordOne}, {drink.ratingWordTwo}</span> -
                  <span className="scoreInTable"> {drink.score}/10</span>.
                </td>
              </tr>
            )
          } else if(drink.mixerOne && drink.name === clickedName) {
              return(
                <tr key={drink._id}>
                  <td>
                    {index + 1}) <span className="drinkNameInTable">{drink.drinkMain} with {drink.mixerOne}</span> -
                    <span className="ratingWordsInTable"> {drink.ratingWordOne}, {drink.ratingWordTwo}</span> -
                    <span className="scoreInTable"> {drink.score}/10</span>.
                  </td>
                </tr>
              )
          } else if(drink.name === clickedName) {
              return(
                <tr key={drink._id}>
                  <td>
                    {index + 1}) <span className="drinkNameInTable">{drink.drinkMain}</span> -
                    <span className="ratingWordsInTable"> {drink.ratingWordOne}, {drink.ratingWordTwo}</span> -
                    <span className="scoreInTable"> {drink.score}/10</span>.
                  </td>
                </tr>
              )
          }
        })
    }
  }

  render() {
    if(!this.state.clickedWordDrinks) {
      return <h1>Click a Name!</h1>
    } else {
      return (
        <div className="clickedWordDrinksTable">
          <table className="clickedWordTable">
            <thead>
              {this.renderClickedWordsDrinksHeader()}
            </thead>
            <tbody>
              {this.renderClickedWordDrinks()}
            </tbody>
            {(this.state.clickedName ?
              <button onClick={() => this.resetDrinkerName()}>Click to Reset Drinkers</button> :"")}
          </table>
        </div>
      )
    }
  }
}

export default ClickedRatingTable;
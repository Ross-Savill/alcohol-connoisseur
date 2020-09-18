import React, { Component } from 'react';
import './TotalData.css';
// import RatingWordsTable from './RatingWordsTable';
import axios from 'axios';

class TotalData extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: [],
        allRatingWords: []
      }
   }

  componentDidMount() {
    axios.get("http://localhost:5000/drinks")
      .then(resp => this.setState({ drinks: resp.data }))
      .catch(error => console.log(error))
    }

  componentDidUpdate() {

    // const setUpWordArray = () => {
      let wordOne = this.state.drinks.map(drink => drink.ratingWordOne)
      let wordTwo = this.state.drinks.map(drink => drink.ratingWordTwo)
      let allWords = [...wordOne, ...wordTwo]
      this.setState({ allRatingWords: allWords })
    // }
    // setUpWordArray()
  }

  render () {
    if(this.state.firstRatingWords === []) {
      return <h1>Please Wait</h1>
    } else {
      const firstWords = this.state.allRatingWords.map((word, i) => <li key={i}>{word}</li>)
      return (
          <ol>
            {firstWords}
          </ol>
    // <RatingWordsTable />
    )}
  }
}

export default TotalData;
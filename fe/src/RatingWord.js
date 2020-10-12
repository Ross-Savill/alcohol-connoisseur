import React, { Component } from 'react';
import './RatingWord.css';
// import RatingWordsTable from './RatingWordsTable';
import axios from 'axios';

class RatingWord extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: [],
        ratingWordOne: [],
        ratingWordTwo: [],
        allRatingWords: [],
      }
   }

  componentDidMount() {
    axios.get("http://localhost:5000/drinks")
      .then(resp => this.setState({ drinks: resp.data }))
      .catch(error => console.log(error))
    }

  async componentDidUpdate(prevProps, prevState) {

    let allWords = []
    let merged = []

    const setUpWordArray = () => {
      const { ratingWordOne, ratingWordTwo } = this.state.drinks
      allWords.push(ratingWordOne, ratingWordTwo)
      allWords = [].concat.apply([], allWords)
      console.log(allWords)
      setAllWordsState()
    }

    const setAllWordsState = () => {
      if(prevState.drinks !== this.state.drinks) {
      this.setState({ allRatingWords: allWords })
      }
    }
    setUpWordArray()
  }

  render () {
    return(
    <div>
      <h1>React Dynamic Table</h1>
    </div>
    )
  }
}

export default RatingWord;


// if(this.state.firstRatingWords === []) {
//   return <h1>Please Wait</h1>
// } else {
//   {console.log(this.state.allRatingWords)}
//   const firstWords = this.state.allRatingWords.map((word, i) => <li key={i}>{i}.{word}</li>)

//   const map = this.state.allRatingWords.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
//   const entriesMap = ([...map.entries()].sort((a,b) => a[1] - b[1]))
//   const mapDisplay = entriesMap.map((word, i) => <li key={i}>{word}</li>)
//   console.log(entriesMap)
//   return (
//       <p>
//         {mapDisplay}
//       </p>
// )}
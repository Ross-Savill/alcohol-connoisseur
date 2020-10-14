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
        countedUniqueWords: []
        // uniqueRatingWords: []
      }
   }

  componentDidMount() {
    axios.get("http://localhost:5000/drinks")
      .then(resp => this.setState({ drinks: resp.data }))
      .catch(error => console.log(error))
    }

  async componentDidUpdate(prevProps, prevState) {

    let allWords = []

    const setUpWordArray = () => {
      this.state.drinks.map((drink, index) => {
        allWords.push(drink.ratingWordOne)
        allWords.push(drink.ratingWordTwo)
      })
      // allWords = [].concat.apply([], allWords)
      setAllWordsState()
    }

    const setAllWordsState = () => {
      if(prevState.drinks !== this.state.drinks) {
        this.setState({ allRatingWords: allWords })
        // let uniqueRatingWords = [...new Set(allWords)]
        // this.setState({ uniqueRatingWords: uniqueRatingWords })
        // console.log(allWords)
        const countedUniqueWords = allWords.reduce(function(occ, word) {
          occ[word] = (occ[word] || 0) + 1;
          return occ;
        }, {});
        this.setState({ countedUniqueWords: countedUniqueWords })
      }
    }
    setUpWordArray()
  }

  renderWordData() {
    return Object.entries(this.state.countedUniqueWords).map((word, index) => {
      return (
        <tr key={index}>
          <td>{word[0]}</td>
          <td>{word[1]}</td>
        </tr>
      )
    })
  }

  render () {
      return (
        <div>
          <h1 id='title'>React Dynamic Table</h1>
          <table id='drinks'>
            <tbody>
              <tr>
                <th>Rating Word</th>
                <th>Times Used</th>
              </tr>
            {/* {Object.entries(this.state.countedUniqueWords).map((word, index) => {
              return (
                <tr key={index}>
                  <td>{word[0]}</td>
                  <td>{word[1]}</td>
                </tr>
              )
            })} */}
              {this.renderWordData()}
            </tbody>
          </table>
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
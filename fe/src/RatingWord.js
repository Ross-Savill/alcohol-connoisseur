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
        sortedUniqueWords: null,
        wordSearch: null
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
      setAllWordsState()
    }

    const setAllWordsState = () => {
      if(prevState.drinks !== this.state.drinks) {
        this.setState({ allRatingWords: allWords })
        const countedUniqueWords = allWords.reduce(function(occ, word) {
          occ[word] = (occ[word] || 0) + 1;
          return occ;
        }, {});
        const sortedUniqueWords = [];
        for (const word in countedUniqueWords) {
          sortedUniqueWords.push([word, countedUniqueWords[word]]);
        }
        sortedUniqueWords.sort(function(a, b) {
          return b[1] - a[1];
        });
        this.setState({ sortedUniqueWords: sortedUniqueWords })
      }
    }
    setUpWordArray()
  }

  searchWord=(event)=>{
    let enteredLetters = event.target.value;
    this.setState({ wordSearch: enteredLetters})
  }

  renderWordHeader() {
    return (
    <tr>
      <th>Rating Word</th>
      <th>Times Used</th>
    </tr>
    )
  }

  renderWordData() {
    if(!this.state.sortedUniqueWords) {
      return (
        <tr>
          <td>LOADING...</td>
        </tr>
      )
    } else {
      return this.state.sortedUniqueWords
      .filter((word) => {
        if(this.state.wordSearch === null)
            return word
        else if(word[0].toLowerCase().includes(this.state.wordSearch.toLowerCase())){
          console.log(this.state.wordSearch)
            return word
        }})
      .map((word, index) => {
        return (
          <tr key={index}>
            <td>{word[0]}</td>
            <td>{word[1]}</td>
          </tr>
        )
      })
    }
  }

  render () {
    // console.log(this.state.sortedUniqueWords)
      return (
        <div>
          <h1 id='title'>Rating Word Data</h1>
          <input type="text" placeholder="Enter item to be searched" onChange={(e)=>this.searchWord(e)} />
          <table id='drinks'>
            <tbody>
              {this.renderWordHeader()}
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
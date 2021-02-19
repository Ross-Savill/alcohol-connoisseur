import React, { Component } from 'react';
import '../Stylesheets/DrinkersPageSS/DrinkersTopRatings.css';

class DrinkersTopRatings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drinks: null,
      selectedDrinker: null
    }
  }

  componentDidMount() {
    const { drinks, selectedDrinker } = this.props
    if(this.props.drinks !== this.state.drinks) {
      this.setState({ drinks, selectedDrinker})
    }
  }

  componentDidUpdate() {
    const { drinks, selectedDrinker } = this.props
    if(this.props.drinks !== this.state.drinks) {
      this.setState({ drinks, selectedDrinker})
    }
  }

  renderTopRatingHeaders() {
    return(
      <tr className="topRatingHeaderRow">
        <th>Rank</th>
        <th>Rating Word</th>
        <th>Times Used</th>
      </tr>
    )
  }

  renderTopRatingData() {
    const { drinks, selectedDrinker } = this.state

    // GET ALL RATING WORDS
    let allRatingWords = [];
    drinks.map((drink) => {
      if(drink.name === selectedDrinker) {
        allRatingWords.push(drink.ratingWordOne, drink.ratingWordTwo)
      }
    })

    // GET WORD - TIMES USED KEY VALUE PAIR
    const countedUniqueWords = allRatingWords.reduce(function(occ, word) {
      occ[word] = (occ[word] || 0) + 1;
      return occ;
    }, {});

    // MOVE FROM OBJECT CONTAINING OBJECTS TO ARRAY OF ARRAYS
    const sortedUniqueWords = [];
    let numbersUsed = [];
    for(const word in countedUniqueWords) {
      sortedUniqueWords.push([word, countedUniqueWords[word]]);
      numbersUsed.push(countedUniqueWords[word])
    }

    // PULL OUT JUST THE WORDS AND NUMBERS FOR RANKING
    let topWords = [];
    let topNumsOnly = [];
    sortedUniqueWords.map((wordArray, i) => {
      topWords.push(wordArray)
      topNumsOnly.push(wordArray[1])
    })

    // SORT THEM FOR DISPLAY!
    topWords.sort(function(a, b) {
      return b[1] - a[1];
    });

    // SET RANKINGS FOR DISPLAY!
    const sortedNums = topNumsOnly.slice().sort(function(a,b){return b-a})
    const ranks = sortedNums.slice().map(function(v){ return sortedNums.indexOf(v) + 1});

    // ADD RANKINGS TO WORDS
    topWords.map((wordArray, i) => {
      wordArray.push(ranks[i])
    })

    // SEND WORDS TO TABLE
    return topWords.map((wordArray, i) => {
      return (
        <tr className="drinkerRatingTR" onClick={() => this.props.handleSelectedRatingWord(wordArray[0])} key={i}>
          <td>{wordArray[2]})</td>
          <td>{wordArray[0]}</td>
          <td>{wordArray[1]}</td>
        </tr>
      )
    })
  }

  render() {
    const { drinks } = this.state
    if(!drinks) {
      return <p>Please Wait</p>
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th className="topRatingHeaderTitle" colSpan="3">Rating Word Usage (Click for Info)</th>
            </tr>
            {this.renderTopRatingHeaders()}
          </thead>
          <tbody>
            {this.renderTopRatingData()}
          </tbody>
        </table>
      )
    }
  }
}

export default DrinkersTopRatings;

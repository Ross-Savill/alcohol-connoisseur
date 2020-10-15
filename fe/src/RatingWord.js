import React, { Component } from 'react';
import './RatingWord.css';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

class RatingWord extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: [],
        ratingWordOne: [],
        ratingWordTwo: [],
        allRatingWords: [],
        sortedUniqueWords: null,
        wordSearch: null,
        clickedWord: '',
        wordPieChartData: null,
        whoSaidIt: null
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
        for(const word in countedUniqueWords) {
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
            <td onClick={() => this.setChartData(word[0])}>{word[0]}</td>
            <td>{word[1]}</td>
          </tr>
        )
      })
    }
  }

  searchWord=(event)=>{
    let enteredLetters = event.target.value;
    this.setState({ wordSearch: enteredLetters})
  }

  setChartData(clickedWord) {
    this.setState({ clickedWord })
    const whoSaidIt = [];
    this.state.drinks.map((drinkInfo, index) => {
      if(drinkInfo.ratingWordOne == clickedWord ||
        drinkInfo.ratingWordTwo == clickedWord) {
          whoSaidIt.push(drinkInfo.name)
      }
    })
    const countedUniqueDrinkers = whoSaidIt.reduce(function(occ, name) {
      occ[name] = (occ[name] || 0) + 1;
      return occ;
    }, {});
    const useableDrinkerData = [];
    for(const name in countedUniqueDrinkers) {
      useableDrinkerData.push([name, countedUniqueDrinkers[name]]);
    }
    const drinkerNames = []
    const datacopy = []
    useableDrinkerData.map((drinkInfo) => {
      drinkerNames.push(drinkInfo[0])
      datacopy.push(drinkInfo[1])
    })

    const chartData = {
      labels: drinkerNames,
      datasets: [{
        label: `Who Said ${clickedWord}?`,
        data: [],
        backgroundColor: [
        'rgba(255, 99, 132, 0.6',
        'rgba(54, 162, 235, 0.6',
        'rgba(255, 206, 86, 0.6',
        'rgba(75, 192, 192, 0.6',
        'rgba(153, 102, 255, 0.6',
        'rgba(255, 159, 64, 0.6',
        'rgba(255, 99, 132, 0.6'
        ],
        hoverBackgroundColor: [
        '#36A2EB',
        '#36A2EB',
        '#36A2EB',
        '#36A2EB',
        '#36A2EB',
        '#36A2EB',
        '#36A2EB'
        ]
      }]
    };
    chartData.datasets[0].data.push(datacopy)
    this.setState({ wordPieChartData: chartData})
  }

  renderClickedWordData() {
    if(!this.state.clickedWord) {
      return(
        <p>No Word Clicked</p>
      )
    } else {
      return(
        <Pie
          data={this.state.wordPieChartData}
          // width={100}
          // height={50}
          options={{ maintainAspectRatio: false }}
        />
      )
    }
  }

  render() {
    console.log(this.state.wordPieChartData)
    return (
        <div className="container">
          <h1 className='title'>Rating Word Data</h1>
          <input className="wordSearchInput" type="text" placeholder="Enter item to be searched" onChange={(e)=>this.searchWord(e)} />
          <table className='drinksTable'>
            <tbody>
              {this.renderWordHeader()}
              {this.renderWordData()}
            </tbody>
          </table>
          <div className="selectedWordData">
          {this.renderClickedWordData()}
          </div>
        </div>
    )
  }
}

export default RatingWord
import React, { Component } from 'react';
import './RatingWord.css';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels'

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
        clickedName: '',
        clickedWordDrinks: '',
        wordPieChartData: null,
        whoSaidIt: null,
        chartTypePie: true,
        chartTypeBar: false
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
            return word
        }})
      .map((word, index) => {
        return (
          <tr key={index}>
            <td className="ratingWord" onClick={() => this.setChartData(word[0])}>{word[0]}</td>
            <td>{word[1]}</td>
          </tr>
        )
      })
    }
  }

  searchWord=(event) => {
    let enteredLetters = event.target.value;
    this.setState({ wordSearch: enteredLetters})
  }

  handleChartChange = () => {
    const currentStatePie = this.state.chartTypePie;
    const currentStateBar = this.state.chartTypeBar;
    this.setState({ chartTypePie: !currentStatePie,
                    chartTypeBar: !currentStateBar });
  }

  setChartData(clickedWord) {
    this.setState({ clickedWord, clickedName: '' })
    const whoSaidIt = [];
    const clickedWordDrinks = [];
    this.state.drinks.map((drinkInfo, index) => {
      if(drinkInfo.ratingWordOne == clickedWord ||
        drinkInfo.ratingWordTwo == clickedWord) {
          whoSaidIt.push(drinkInfo.name)
          clickedWordDrinks.push(drinkInfo)
        }
      })
    this.setState({ clickedWordDrinks })
    const countedUniqueDrinkers = whoSaidIt.reduce(function(occ, name) {
      occ[name] = (occ[name] || 0) + 1;
      return occ;
    }, {});
    const useableDrinkerData = [];
    for(const name in countedUniqueDrinkers) {
      useableDrinkerData.push([name, countedUniqueDrinkers[name]]);
    }

    function sortByWordFrequency(a, b) {
      if (a[1] < b[1]) return 1;
      if (a[1] > b[1]) return -1;
      return 0;
    }

    const sortedDrinkerData = useableDrinkerData.sort(sortByWordFrequency)

    const drinkerNames = []
    sortedDrinkerData.map((drinkInfo) => {
      drinkerNames.push(drinkInfo[0])
    })

    const chartData = {
      labels: drinkerNames,
      datasets: [{
        label: `Which drinkers have used ${clickedWord} as a rating word?`,
        data: [],
        backgroundColor: [
          '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4',
          '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff',
          '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
          '#000075', '#808080', '#ffffff'
        ],
        borderWidth: 1,
        borderColor: [
          '#008080', '#008080', '#008080', '#008080', '#008080', '#008080',
          '#008080', '#008080', '#008080', '#008080', '#008080', '#008080',
          '#008080', '#008080', '#008080', '#008080', '#008080', '#008080',
          '#008080', '#008080', '#008080'
        ],
        hoverBorderWidth: 4,
        hoverBackgroundColor: [
          '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB',
          '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB',
          '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB',
          '#36A2EB', '#36A2EB', '#36A2EB'
        ]
      }]
    };

    sortedDrinkerData.map((drinkInfo) => {
      chartData.datasets[0].data.push(drinkInfo[1])
    })
    this.setState({ wordPieChartData: chartData })
  }

  renderClickedWordsDrinksHeader() {
    const { clickedWordDrinks, clickedWord, clickedName } = this.state
    if(!clickedName) {
      return(
        <tr>
          <th>{clickedWordDrinks.length} Drinks called "{clickedWord}"</th>
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

  renderClickedWordDrinks() {
    const { clickedWord, clickedWordDrinks, clickedName } = this.state
    if(!clickedWord) {
      return("No Data")
    } else if(!clickedName) {
        return clickedWordDrinks.map((drink, index) => {
          if(drink.mixerTwo) {
            return(
              <tr key={drink._id}>
                <td>
                {index + 1}) {drink.name}'s {drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo} - {drink.ratingWordOne}, {drink.ratingWordTwo} - {drink.score}/10.
                </td>
              </tr>
            )
          } else if(drink.mixerOne) {
              return(
                <tr key={drink._id}>
                  <td>
                  {index + 1}) {drink.name}'s {drink.drinkMain} with {drink.mixerOne} - {drink.ratingWordOne}, {drink.ratingWordTwo} - {drink.score}/10.
                  </td>
                </tr>
              )
          } else {
              return(
                <tr key={drink._id}>
                  <td>
                    {index + 1}) {drink.name}'s {drink.drinkMain} - {drink.ratingWordOne}, {drink.ratingWordTwo} - {drink.score}/10.
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
                  {index + 1}) {drink.name}'s {drink.drinkMain} with {drink.mixerOne} and {drink.mixerTwo} - {drink.ratingWordOne}, {drink.ratingWordTwo} - {drink.score}/10.
                </td>
              </tr>
            )
          } else if(drink.mixerOne && drink.name === clickedName) {
              return(
                <tr key={drink._id}>
                  <td>
                    {index + 1}) {drink.name}'s {drink.drinkMain} with {drink.mixerOne} - {drink.ratingWordOne}, {drink.ratingWordTwo} - {drink.score}/10.
                  </td>
                </tr>
              )
          } else if(drink.name === clickedName) {
              return(
                <tr key={drink._id}>
                  <td>
                    {index + 1}) {drink.name}'s {drink.drinkMain} - {drink.ratingWordOne}, {drink.ratingWordTwo} - {drink.score}/10.
                  </td>
                </tr>
              )
          }
        })
    }
  }

  renderClickedWordData() {
    if(!this.state.clickedWord) {
      return(
        <p>No Word Clicked</p>
      )
    } else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return(
        <div>
          <select
            className="chartTypeSelect"
            value={this.chartTypePie}
            onChange={this.handleChartChange}
            >
            <option>Pie Chart</option>
            <option>Bar Chart</option>
          </select>
          <div className={this.state.chartTypePie ?
              'showPieChart': 'hidePieChart'}>
            <Pie
              data={this.state.wordPieChartData}
              width={150}
              height={100}
              onElementsClick={element => {
                this.setState({ clickedName: this.state.wordPieChartData.labels[element[0]._index] })
                this.renderClickedWordDrinks(this.state.wordPieChartData.labels[element[0]._index])
                }}
              options={{
                title: {
                  display: true,
                  text: `Who said ${this.state.clickedWord}?`,
                  fontSize: 25
                },
                legend: {
                  position: "right"
                },
                plugins: {
                  labels: {
                    display: "auto",
                    render: "label",
                    fontColor: "black",
                    position: "outside",
                  }
                }
              }}
            />
          </div>
          <div className={this.state.chartTypeBar ?
              'showBarChart': 'hideBarChart'}>
            <Bar
              data={this.state.wordPieChartData}
              width={120}
              height={70}
              onElementsClick={element => {
                this.setState({ clickedName: this.state.wordPieChartData.labels[element[0]._index] })
                this.renderClickedWordDrinks(this.state.wordPieChartData.labels[element[0]._index])
                }}
              options={{ maintainAspectRatio: false,
                title: {
                  display: true,
                  text: `Who said ${this.state.clickedWord}?`,
                  fontSize: 25
                },
                scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                          stepSize: 1
                      }
                  }]
                },
                plugins: {
                    labels: false
                }
              }}
            />
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="fullPage">
        <h1 className='title'>Rating Word Data</h1>
        <div className="underTitle">
          <div className ="searchAndTable">
            <input className="wordSearchInput" type="text" placeholder="Enter item to be searched" onChange={(e)=>this.searchWord(e)} />
            <table className='drinksTable'>
              <tbody>
                {this.renderWordHeader()}
                {this.renderWordData()}
              </tbody>
            </table>
          </div>
          <div className="chart">
            <div className="selectedWordData">
              {this.renderClickedWordData()}
            </div>
          </div>
          <div className="clickedWordDrinksTable">
              <table className='clickedWordTable'>
                <thead>
                  {this.renderClickedWordsDrinksHeader()}
                </thead>
                <tbody>
                  {this.renderClickedWordDrinks()}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    )
  }
}

export default RatingWord
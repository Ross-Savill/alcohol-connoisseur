import React from 'react';
import Navbar from '../MyUtilitiesFolder/Navbar'
import '../Stylesheets/RatingPageSS/RatingWord.css';
import ClickedRatingTable from './ClickedRatingTable';
import RatingPieChart from './RatingPieChart';
import RatingBarChart from './RatingBarChart';
import RatingWordCloud from './RatingWordCloud';
import InfiniteScroll from 'react-infinite-scroll-component';

const styleWord = {
  height: 30,
  width: "75%",
  border: "1px solid green",
  margin: 2,
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
};

const styleCount = {
  height: 30,
  width: "25%",
  border: "1px solid green",
  margin: 2,
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
}

class RatingWord extends React.Component {
  constructor(props) {
    super(props)
      this.handleChartNameClick = this.handleChartNameClick.bind(this)
      this.handleClickedWordChange = this.handleClickedWordChange.bind(this)
      this.state = {
        drinks: null,
        ratingWordOne: [],
        ratingWordTwo: [],
        allRatingWords: [],
        sortedUniqueWords: null,
        hasMore: true,
        wordSearch: null,
        searchWordCount: [],
        clickedWord: '',
        clickedName: '',
        clickedWordDrinks: '',
        chartData: null,
        whoSaidIt: null,
        chartForm: "pie",
    }
  }

  componentDidMount() {
    const { drinks } = this.props
    this.setState({ drinks })
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks } = this.state

    if(prevState.drinks !== this.props.drinks) {
      this.setState({ drinks: this.props.drinks })

      let allWords = []

      const setUpWordArray = () => {
        if(drinks){
          this.state.drinks.map((drink) => {
            allWords.push(drink.ratingWordOne)
            allWords.push(drink.ratingWordTwo)
          })
          setAllWordsState()
        }
      }

      const setAllWordsState = () => {
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
        this.setState({ sortedUniqueWords })
        }
      setUpWordArray()
    }
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
          <p>LOADING...</p>
      )
    } else {
      let finalWords = []
      this.state.sortedUniqueWords
      .filter((word) => {
        if(this.state.wordSearch === null)
            return word
        else if(word[0].toLowerCase().includes(this.state.wordSearch.toLowerCase())){
            return word
        }})
      .map((word, index) => {
        finalWords.push(word)
      })

      if(this.state.searchWordCount.length !== finalWords.length) {
        this.setState({ searchWordCount: finalWords })
      }

        if(finalWords) {
          return(
            <InfiniteScroll
              dataLength={finalWords.length}
              loader={<h4>Loading...</h4>}
              height={400}
              width={200}
            >
              {finalWords.map((word, index) => (
                <div className="scrollRowBoth" onClick={() => this.setChartData(word[0])} >
                  <div className="scrollWordOnly" style={styleWord}>
                    {word[0]}
                  </div>
                  <div className="scrollCountOnly" style={styleCount}>
                    {word[1]}
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )
        }
      }
    }


  searchWord=(event) => {
    let enteredLetters = event.target.value;
    this.setState({ wordSearch: enteredLetters})
  }

  handleChartChange = (chartType) => {
    if(chartType === "all") {
      this.setState({ clickedName: "", clickedWord: "",
                      clickedWordDrinks:"", chartData: null,
                      chartForm: "pie", wordSearch: null
                    })
      const searchField = document.getElementById("wordSearchInput")
      searchField.value = "";
    } else {
      this.setState({ chartForm: chartType })
    }
  }

  handleChartNameClick(clickedName) {
    this.setState({ clickedName })
  }

  handleClickedWordChange(clickedWord) {
    this.setState({ clickedWord, clickedName: '' })
    this.setChartData(clickedWord)
  }

  setChartData(clickedWord) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.setState({ clickedWord, clickedName: '' })
    const whoSaidIt = [];
    const clickedWordDrinks = [];
    this.state.drinks.map((drinkInfo, index) => {
      if(drinkInfo.ratingWordOne === clickedWord ||
        drinkInfo.ratingWordTwo === clickedWord) {
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
        label: `${clickedWord}`,
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
    this.setState({ chartData })
  }

  renderClickedWordData() {
    if(!this.state.clickedWord) {
      return(
        <div className="noWordDiv">
          <RatingWordCloud
            sortedUniqueWords={this.state.searchWordCount}
            handleClickedWordChange={this.handleClickedWordChange}
          />
        </div>
      )
    } else if (this.state.chartForm === "pie" && this.state.chartData) {
      return(
        <div>
          <div className="buttonDiv">
            <button onClick={() => this.handleChartChange("bar")}>Bar Chart</button>
            <button onClick={() => this.handleChartChange("all")}>All Words</button>
          </div>
          <RatingPieChart
            clickedWord={this.state.clickedWord}
            clickedName={this.state.clickedName}
            clickedWordDrinks={this.state.clickedWordDrinks}
            chartData={this.state.chartData}
            handleChartNameClick={this.handleChartNameClick}
          />
        </div>
      )
    } else if (this.state.chartForm === "bar" && this.state.chartData) {
      return(
        <div>
          <div className="buttonDiv">
            <button onClick={() => this.handleChartChange("pie")}>Pie Chart</button>
            <button onClick={() => this.handleChartChange("all")}>All Words</button>
          </div>
          <RatingBarChart
            clickedWord={this.state.clickedWord}
            clickedName={this.state.clickedName}
            clickedWordDrinks={this.state.clickedWordDrinks}
            chartData={this.state.chartData}
            handleChartNameClick={this.handleChartNameClick}
          />
        </div>
      )
    }
  }

  render() {
    if(!this.state.drinks) {
      return <h1>One Moment Please</h1>
    } else {
      return (
        <div className="fullPage">
          <div className="titleDiv">
            {(!this.state.clickedWord ?
              <h1 className='title'>Rating Word Data Page</h1> :
              <h1 className='title'
              >Info on "<span className="titleClickedWord">{this.state.clickedWord}</span>"</h1>
            )}
          </div>
          <Navbar />
          <div className="underTitle">
            <div className ="searchAndTable">
              <p className="searchLabel">Search for a Rating Word below!</p>
              <p className="searchLabel">↓↓↓↓↓</p>
              <input className="wordSearchInput"
                     id="wordSearchInput"
                     value={this.state.wordSearch}
                     type="text"
                     placeholder="Enter item to be searched"
                     onChange={(e)=>this.searchWord(e)}
              />
              <div className="drinksTable">
                {this.renderWordHeader()}
                {this.renderWordData()}
              </div>
            </div>
            <div className="chart">
              <div className="selectedWordData">
                {this.renderClickedWordData()}
              </div>
            </div>
              <ClickedRatingTable
                clickedWord={this.state.clickedWord}
                clickedName={this.state.clickedName}
                clickedWordDrinks={this.state.clickedWordDrinks}
              />
          </div>
        </div>
      )
    }
  }
}

export default RatingWord;
import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels'
import '../Stylesheets/DrinkersPageSS/DrinkersRatingPieChart.css';

class DrinkersRatingPieChart extends Component {
  constructor(props) {
  super(props)
    this.state = {
      drinks: null,
      selectedDrinker: null,
      chartData: null
    }
  }

  componentDidMount() {
    const { drinks, selectedDrinker } = this.props
    if(this.props.drinks !== this.state.drinks) {
      this.setState({ drinks, selectedDrinker })
    }
  }

  componentDidUpdate() {
    const { drinks, selectedDrinker } = this.props
    if(this.props.drinks !== this.state.drinks) {
      this.setState({ drinks, selectedDrinker})
    }
  }

  assembleChartData() {
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

    // GET ARRAY OF NUMBERS OF TIMES WORDS USED
    let numbersUsed = [];
    for(const word in countedUniqueWords) {
      numbersUsed.push(countedUniqueWords[word])
    }

    // ESTABLISH PIE CHART DATA
    let usedOnce = [];
    let usedTwice = [];
    let usedThrice = [];
    let usedFourSix = [];
    let usedSevenNine = [];
    let usedTenMore = [];

    numbersUsed.map((num) => {
      if( num === 1) usedOnce.push(num)
      else if(num === 2) usedTwice.push(num)
      else if (num === 3) usedThrice.push(num)
      else if (num > 3 && num < 7) usedFourSix.push(num)
      else if (num > 6 && num < 10) usedSevenNine.push(num)
      else if (num >= 10) usedTenMore.push(num)
    })

    let pieLabels = [];
    let pieFigures = [];

    if(usedOnce.length) {
      pieLabels.push("Once")
      pieFigures.push(usedOnce.length)
    }
    if(usedTwice.length) {
      pieLabels.push("Twice")
      pieFigures.push(usedTwice.length)
    }
    if(usedThrice.length) {
      pieLabels.push("3")
      pieFigures.push(usedThrice.length)
    }
    if(usedFourSix.length) {
      pieLabels.push("4-6")
      pieFigures.push(usedFourSix.length)
    }
    if(usedSevenNine.length) {
      pieLabels.push("7-9")
      pieFigures.push(usedSevenNine.length)
    }
    if(usedTenMore.length) {
      pieLabels.push("10+")
      pieFigures.push(usedTenMore.length)
    }

    const chartData = {
      labels: pieLabels,
      datasets: [{
        label: "How often are their rating words used?",
        data: pieFigures,
        backgroundColor: [
          'green', 'lightgreen', 'blue', 'yellow', 'orange', 'red'],
        borderWidth: 1,
        borderColor: [
          '#008080', '#008080', '#008080', '#008080', '#008080', '#008080'],
        hoverBorderWidth: 4,
        hoverBackgroundColor: [
          '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB']
      }]
    };

    if(this.state.chartData === null) {
      this.setState({ chartData })
    }
  }

  render() {
    if(!this.state.drinks) {
      return <p>Please Wait</p>
    } else {
      this.assembleChartData()
      return (
        <div className="showPieChart">
          <Pie
            data={this.state.chartData}
            width={150}
            height={100}
            options={{
              events: ['mousemove'],
              title: {
                display: true,
                text: "How many times are ratings repeated?",
                fontSize: 18
              },
              legend: {
                position: "left",
                display: true
              },
              plugins: {
                labels: {
                  render: function (args) {
                    return `${args.label} ` + `(${args.percentage}%)`
                  },
                  fontColor: "black",
                  fontSize: 14,
                  overlap: false,
                  textMargin: 6
                }
              }
            }}
          />
        </div>
      )
    }
  }
}

export default DrinkersRatingPieChart;


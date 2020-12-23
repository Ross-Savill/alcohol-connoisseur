import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels'
import './Stylesheets/RatingBarChart.css';


class RatingBarChart extends Component {
  constructor(props) {
    super(props)
      this.state = {
        clickedWord: '',
        clickedName: '',
        clickedWordDrinks: '',
        wordPieChartData: null
      }
  }

  componentDidMount() {
    const { wordPieChartData, clickedName, clickedWordDrinks } = this.props
    this.setState({ clickedWordDrinks, clickedName, wordPieChartData })
  }

  componentDidUpdate(prevProps, prevState) {
    const { clickedWord, wordPieChartData, clickedName, clickedWordDrinks } = this.props
    if(prevState.clickedWord !== clickedWord) {
      this.setState({ clickedWord, clickedWordDrinks, clickedName, wordPieChartData })
    }
  }

  render() {
    return(
      <div className="showBarChart">
                  <Bar
                    data={this.state.wordPieChartData}
                    width={120}
                    height={70}
                    onElementsClick={element => {
                      this.setState({ clickedName: this.state.wordPieChartData.labels[element[0]._index] })
                    }}
                    options={{
                      events: ['mousemove'],
                      onHover: (event, chartElement) => {
                        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
                      },
                      title: {
                        display: true,
                        text: `Who said ${this.state.clickedWord}? (Total - ${this.state.clickedWordDrinks.length})`,
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
    )
  }
}

export default RatingBarChart;
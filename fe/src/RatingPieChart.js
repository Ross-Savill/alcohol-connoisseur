import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-labels'
import './Stylesheets/RatingPieChart.css';

class RatingPieChart extends Component {
  constructor(props) {
    super(props)
      this.state = {
        clickedWord:'',
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
      <div className="showPieChart">
                  <Pie
                    data={this.state.wordPieChartData}
                    width={150}
                    height={100}
                    onElementsClick={element => {
                      // this.setState({ clickedName: this.state.wordPieChartData.labels[element[0]._index] })
                      this.props.handleChartNameClick(this.state.wordPieChartData.labels[element[0]._index])
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
                      legend: {
                        position: "bottom"
                      },
                      plugins: {
                        labels: {
                          render: function (args) {
                            return `${args.label} ` + `(${args.value})`
                          },
                          fontColor: "black",
                          fontSize: 16,
                          position: "outside",
                          textMargin: 6
                        }
                      }
                    }}
                  />
                </div>
    )
  }
}

export default RatingPieChart;
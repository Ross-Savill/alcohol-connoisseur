import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';
import '../Stylesheets/LineChart.css'

class LineChart extends PureComponent {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        drinkerLineChartData: null
      }
  }

  componentDidMount() {
    const { drinks, drinkers, drinkTypes } = this.props
    if(drinks) {
      this.haveDrinks()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks } = this.state
    if(this.props.drinks !== drinks) {
      this.haveDrinks()
    }
  }

  haveDrinks = () => {
    const { drinks, drinkers, drinkTypes } = this.props
    this.setState({ drinks, drinkers, drinkTypes })

    const allDates = [...new Set(drinks.map(drink => drink.date))]
    let numOfDrinksOnDates = []

    allDates.map((date) => {
      let drinksOnThisDate = 0
      drinks.map((drink) => {
        if(drink.date === date) {
          drinksOnThisDate = drinksOnThisDate + 1
        }
      })
      numOfDrinksOnDates.push(drinksOnThisDate)
    })

    const drinkerLineChartData = {
      labels: allDates,
        datasets: [{
          label: "Number of Drinks",
          data: numOfDrinksOnDates,
          borderColor: 'rgb(238, 97, 131)'
        }]
    }
    this.setState({ drinkerLineChartData })
  }

  renderLineChart() {
    if(this.state.drinkerLineChartData){
      return(
        <div className="lineChartDiv">
          <Line
            data={this.state.drinkerLineChartData}
            width={100}
            height={50}
            options={{
              title: {
                display: true,
                text: `All Sessions`,
                fontSize: 25
              },
              legend: {
                position: "bottom",
                labels: {
                  fontSize: 15
                }
              }
            }}
          />
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderLineChart()}
      </div>
    )
  }
}

export default LineChart;
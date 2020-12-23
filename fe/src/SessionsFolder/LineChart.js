import React, { PureComponent } from 'react';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import '../Stylesheets/LineChart.css'

class LineChart extends PureComponent {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        drinkerLineChartData: null,
        selectOptions:[],
        drinkerSelection: [{ "value": "allDrinks", "label": "All Drinkers" }]
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    if(drinks) {
      this.haveDrinks()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, drinkerSelection } = this.state
    if(this.props.drinks !== drinks) {
      this.haveDrinks()
    }
    if(this.state.drinkerSelection !== prevState.drinkerSelection) {
      this.haveDrinks()
    }
  }

  haveDrinks = () => {
    const { drinks, drinkers, drinkTypes } = this.props
    this.setState({ drinks, drinkers, drinkTypes })

    const allDates = [...new Set(drinks.map(drink => drink.date))].sort()
    const presentableDates = allDates.map((date) => {
      return moment(date).format("MMM-DD")
    })

    const { drinkerSelection } = this.state

    let datasets = []
    if(drinkerSelection) {
      const backgroundColours = ["rgba(228,26,28,0.3)", "rgba(55,126,184,0.3)", "rgba(77,175,74,0.3)",
      "rgba(152,78,163,0.3)", "rgba(255,127,0, 0.3)","rgba(255,255,51,0.3)", "rgba(166,86,40,0.3)",
      "rgba(247,129,191,0.3)", "rgba(153,153,153,0.3)"]

      const borderColours = ["rgba(228,26,28,1)", "rgba(55,126,184,1)", "rgba(77,175,74,1)",
      "rgba(152,78,163,1)", "rgba(255,127,0,1)","rgba(255,255,51,1)", "rgba(166,86,40,1)",
      "rgba(247,129,191,1)", "rgba(153,153,153,1)"]

      let colourPick = 0
      drinkerSelection.map((selection) => {
        let selectionAllDrinksOnDates = []
        allDates.map((date) => {
          let drinksOnThisDate = 0
          drinks.map((drink) => {
            if(selection.label === "All Drinkers") {
              if(drink.date === date) {
                drinksOnThisDate = drinksOnThisDate + 1
              }
            } else if (drink.date === date && drink.name === selection.label) {
              drinksOnThisDate = drinksOnThisDate + 1
            }
          })
          selectionAllDrinksOnDates.push(drinksOnThisDate)
        })
        const label = selection.label
        const backgroundColourOptions = backgroundColours[colourPick];
        const borderColourOptions =  borderColours[colourPick]

        colourPick = colourPick + 1

        datasets.push({"label":label,
                       "data": selectionAllDrinksOnDates,
                       borderColor: borderColourOptions,
                       backgroundColor: backgroundColourOptions,
        })
      })
    }

    const options = [
      {
        label: "Regular Drinkers",
        options:[]
      },
      {
        label: "Irregular Drinkers",
        options:[]
      }
    ]

    drinkers.map((drinker) => {
      let drinkerCount = 0
      drinks.map((drink) => {
        if(drinker.drinker === drink.name) {
          drinkerCount = drinkerCount + 1
        }
      })
      if(drinkerCount >= 20) {
        options[0].options.push({"value": drinker._id, "label": drinker.drinker })
      } else {
        options[1].options.push({"value": drinker._id, "label": drinker.drinker })
      }
    })

    options.unshift({ "value": "allDrinks", "label": "All Drinkers" })
    this.setState({ selectOptions: options })

    const drinkerLineChartData = {
      labels: presentableDates,
      datasets: datasets,
    }
    this.setState({ drinkerLineChartData })
  }

  handleSelecton(e) {
    this.setState({drinkerSelection: e})
    this.haveDrinks()
  }

  renderLineChart() {
    if(this.state.drinkerLineChartData){
      return(
        <div className="lineChartDiv">
          <Line
            data={this.state.drinkerLineChartData}
            width={80}
            height={35}
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
    const { selectOptions, drinkerSelection } = this.state
    console.log(drinkerSelection)
    if(drinkerSelection === null || drinkerSelection.length === 0) {
      return (
        <div className="noLineChartScreen">
          <h2>Select a Drinker or All Drinkers for Data</h2>
          <div className="justSelectFields">
            <Select
            isMulti
            value={drinkerSelection}
            options={selectOptions}
            onChange={this.handleSelecton.bind(this)}
            />
          </div>
        </div>
      )
    } else {
      return(
        <div className="lineChartPlusFields">
          <div className="justLineChart">
            {this.renderLineChart()}
          </div>
          <div className="justSelectFields">
              <Select
                isMulti
                value={drinkerSelection}
                options={selectOptions}
                onChange={this.handleSelecton.bind(this)}
              />
          </div>
        </div>
      )
    }
  }
}

export default LineChart;
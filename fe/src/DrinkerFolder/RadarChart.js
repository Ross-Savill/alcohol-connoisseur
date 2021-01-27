import React, { Component } from 'react';
import { Radar, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels'
import '../Stylesheets/DrinkersPageSS/RadarChart.css'

class RadarChart extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkTypes: null,
        selectedDrinker: 'All Drinkers',
        drinkerRadarData: null,
        showRadar: false,
        showBar: true,
        radarColor: ["rgb(250, 222, 229)"],
        barColor: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4',
        '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    if(drinks) {
      this.haveDrinks()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPropDrinks = this.props.drinks
    const currentPropDrinkTypes = this.props.drinkTypes
    const currentSelectedDrinker = this.props.selectedDrinker
    if(currentPropDrinks !== this.state.drinks) {
      this.setState({ drinks: currentPropDrinks,
                      drinkTypes: currentPropDrinkTypes,
                      selectedDrinker: currentSelectedDrinker
                    })
    }

    if(prevState.selectedDrinker !== currentSelectedDrinker ||
       prevState.showRadar !== this.state.showRadar) {
       this.haveDrinks()
    }
  }

  haveDrinks = () => {
    // SET STATE WITH DRINKS AND DRINKERS
    const { drinks, drinkTypes, selectedDrinker } = this.props
    this.setState({ drinks, drinkTypes, selectedDrinker })
    const { radarColor, barColor } = this.state

    // PREP DRINK TYPE LABELS AND DRINK TYPE DRINK ARRAY
    let allDrinkTypes = []
    let drinkTypeCount = []

    drinkTypes.map((typeObj) => {
      allDrinkTypes.push(typeObj.drinkType)
      let drinksFromDrinkType = []
      drinks.map((drinkObj) => {
        if(selectedDrinker === "All Drinkers" && drinkObj.drinkType === typeObj.drinkType) {
          drinksFromDrinkType.push(drinkObj)
        } else if(drinkObj.drinkType === typeObj.drinkType && selectedDrinker === drinkObj.name) {
          drinksFromDrinkType.push(drinkObj)
        }
      })
      drinkTypeCount.push(drinksFromDrinkType)
    })

    // GET NUMBER OF DRINKS PER TYPE
    let drinkCountPerType = []
    drinkTypeCount.map((array) => {
      drinkCountPerType.push(array.length)
    })

    // CREATE OBJECTS LINKING TYPE TO NUMBER
    const arrayOfDrinkObjects = drinkCountPerType.map((num, i) => {
      return {
        drinkType: allDrinkTypes[i],
        numberOfDrinksHad: num
      }
    })
    // SORT THE DRINKS OBJECTS
    const sortedArrayOfDrinksObjects = arrayOfDrinkObjects.sort(function(a, b) {
      return b.numberOfDrinksHad - a.numberOfDrinksHad;
    });

    // PUSH THE SORTED OBJECT DATA INTO SORTED ARRAYS
    let sortedDrinkTypes = [];
    let sortedDrinkNumbers = [];
    sortedArrayOfDrinksObjects.forEach(function(drink){
      sortedDrinkTypes.push(drink.drinkType);
      sortedDrinkNumbers.push(drink.numberOfDrinksHad);
    });

    // SET RADAR DATA
    const drinkerRadarData = {
      labels: sortedDrinkTypes,
        datasets: [{
          label: this.state.selectedDrinker,
          data: sortedDrinkNumbers,
          backgroundColor: this.state.showRadar ? radarColor: barColor,
          borderColor: 'rgb(238, 97, 131)'
        }],
    }
    this.setState({ drinkerRadarData })

  }

  handleChartChange = () => {
    const currentStateRadar = this.state.showRadar;
    const currentStateBar = this.state.showBar;
    this.setState({ showRadar: !currentStateRadar,
                    showBar: !currentStateBar });
  }

  renderDrinkerChart() {
    if(!this.state.drinks) {
      return <p>Wait for Data</p>
    } else {
      return(
        <div>
          <select
            className="chartTypeSelect"
            value={this.showRadar}
            onChange={this.handleChartChange}
            >
            <option>Bar Chart</option>
            <option>Radar Chart</option>
          </select>

          <div className={this.state.showRadar ?
            'shownRadarChart': 'hiddenRadarChart'}>
            <Radar
              data={this.state.drinkerRadarData}
              width={75}
              height={75}
              options={{
                title: {
                  display: true,
                  text: `${this.state.selectedDrinker}`,
                  fontSize: 25
                },
                scale: {
                  ticks: {
                    z: 1,
                    callback: function (value) { if (Number.isInteger(value)) { return value; } else { return ""} }
                  },
                  pointLabels: {
                    fontSize: 15
                  }
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
            <div className={this.state.showBar ?
              'shownBarChart': 'hiddenBarChart'}>
              <Bar
                data={this.state.drinkerRadarData}
                width={120}
                height={85}
                options={{
                  plugins: {
                    labels: {
                      render: function (args) {
                        return `${args.value}`
                      }
                    }
                  },
                  layout: {
                    padding: {
                      top: 15
                    }
                  },
                  legend: {
                    position: "bottom"
                  }
                }}
              />
          </div>
        </div>
      )
    }
  }

  render(){
    return(
      <div>
        {this.renderDrinkerChart()}
      </div>
    )
  }
}

export default RadarChart;
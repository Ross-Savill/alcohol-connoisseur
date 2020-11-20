import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import 'chartjs-plugin-labels'
import './RadarChart.css'

class RadarChart extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        drinkTypes: null,
        selectedDrinker: 'All Drinkers',
        drinkerRadarData: null
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
    const currentPropDrinkers = this.props.drinkers
    const currentPropDrinkTypes = this.props.drinkTypes
    const currentSelectedDrinker = this.props.selectedDrinker
    if(currentPropDrinks !== this.state.drinks) {
      this.setState({ drinks: currentPropDrinks,
                      drinkers: currentPropDrinkers,
                      drinkTypes: currentPropDrinkTypes,
                      selectedDrinker: currentSelectedDrinker
                    })
    }
  }

  haveDrinks = () => {
    // SET STATE WITH DRINKS AND DRINKERS
    const { drinks, drinkers, drinkTypes, selectedDrinker } = this.props
    this.setState({ drinks, drinkers, drinkTypes, selectedDrinker })

    // PREP DRINK TYPE LABELS AND DRINK TYPE DRINK ARRAY
    let allDrinkTypes = []
    let drinkTypeCount = []

    drinkTypes.map((typeObj) => {
      allDrinkTypes.push(typeObj.drinkType)
      let drinksFromDrinkType = []
      drinks.map((drinkObj) => {
        if(drinkObj.drinkType === typeObj.drinkType) {
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
    console.log(drinkCountPerType)

    // SET RADAR DATA
    const drinkerRadarData = {
      labels: allDrinkTypes,
        datasets: [{
          data: drinkCountPerType,
          backgroundColor: 'rgb(250, 222, 229)',
          borderColor: 'rgb(238, 97, 131)'
        }],
    }
    this.setState({ drinkerRadarData })

  }

  renderDrinkerChart() {
    if(!this.state.drinks) {
      return <p>Wait for Data</p>
    } else {
      console.log(this.state.drinkerRadarData)
      return(
        <div className="radarDiv">
          <Radar
            data={this.state.drinkerRadarData}
            width={50}
            height={50}
            options={{
              title: {
                display: true,
                text: `${this.state.selectedDrinker}`,
                fontSize: 25
              },
              legend: {
                position: "bottom"
              }
            }}
          />
        </div>
      )
    }
  }

  render(){
    return(
      <div>
        <div>
          <h1>RadarData Here</h1>
        </div>
        <div>
          {this.renderDrinkerChart()}
        </div>
      </div>
    )
  }
}

export default RadarChart;
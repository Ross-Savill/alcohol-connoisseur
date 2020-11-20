import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import 'chartjs-plugin-labels'

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

    // PREP DRINK TYPE LABELS
    let allDrinkTypes = []
    drinkTypes.map((object) => {
      allDrinkTypes.push(object.drinkType)
    })

    // SET RADAR DATA
    const drinkerRadarData = {
      labels: allDrinkTypes,
        datasets: [{
          data: [20, 10, 4, 2]
        }]
    }
    this.setState({ drinkerRadarData })

  }

  renderDrinkerChart() {
    if(!this.state.drinks) {
      return <p>Wait for Data</p>
    } else {
      console.log(this.state.drinkerRadarData)
      return(
        <Radar
          data={this.state.drinkerRadarData}
          width={150}
          height={100}
          options={{
            title: {
              display: true,
              text: "Drinker Name",
              fontSize: 25
            },
            legend: {
              position: "bottom"
            }
          }}
        />
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
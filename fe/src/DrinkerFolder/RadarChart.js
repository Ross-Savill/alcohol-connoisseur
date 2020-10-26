import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import 'chartjs-plugin-labels'

class RadarChart extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null
      }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPropDrinks = this.props.drinks
    const currentPropDrinkers = this.props.drinkers
    if(currentPropDrinks !== this.state.drinks) {
      this.setState({ drinks: currentPropDrinks,
                      drinkers: currentPropDrinkers })
    }
  }

  // renderRadar() {
  //   <Radar
  //     data={this.state.wordPieChartData}
  //     width={150}
  //     height={100}
  //     options={{
  //       title: {
  //         display: true,
  //         text: "Drinker Name",
  //         // fontSize: 25
  //       },
  //       // legend: {
  //       //   position: "bottom"
  //       // }
  //     }}
  //   />
  // }

  render(){
    return(
      <div>
        <h1>RadarData Here</h1>
      </div>
    )
  }
}

export default RadarChart;
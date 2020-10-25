import React, { Component } from 'react';

class RadarChart extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null
      }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPropDrinks = this.props.drinks
    if(currentPropDrinks !== this.state.drinks) {
      this.setState({ drinks: currentPropDrinks })
    }
  }


  showDrinks() {
    const { drinks } = this.state
    if(!drinks) {
      return(<p>Loading Drinks...</p>)
    } else {
      return drinks.map((drink) => {
        return <li>{drink.name}</li>
      })
    }
  }

  render(){
    return(
      <div>
        <h1>RadarData Here</h1>
        <ul>
          {this.showDrinks()}
        </ul>
      </div>
    )
  }
}

export default RadarChart;
import React, { Component } from 'react';
import BreweryScroll from './BreweryScroll';
import '../Stylesheets/Breweries.css';
import Navbar from '../Navbar';

class Breweries extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null
      }
  }

  componentDidMount() {
    const { drinks, drinkers } = this.props
    this.setState({ drinks, drinkers })
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, drinkers } = this.props
    if(prevState.drinks !== drinks) {
      this.setState({ drinks, drinkers })
    }
  }

    render(){
      return(
        <div className="entirePage">
          <div className="titleDiv">
            <h1 className='title'>Breweries Page</h1>
          </div>
          <Navbar />
          <BreweryScroll
            drinks={this.state.drinks}
            drinkers={this.state.drinkers}
          />
        </div>
      )
    }
}

export default Breweries;
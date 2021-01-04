import React, { Component } from 'react';
import BreweryScroll from './BreweryScroll';
import '../Stylesheets/Breweries.css';
import Navbar from '../Navbar';

class Breweries extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    this.setState({ drinks})
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks } = this.props
    if(prevState.drinks !== drinks) {
      this.setState({ drinks })
    }
  }
  render(){
      return(
        <div className="entirePage">
          <div className="titleDiv">
            <h1 className='title'>Breweries Page</h1>
          </div>
          <Navbar />
          <div className="breweryScrollComponent">
            <BreweryScroll drinks={this.state.drinks}/>
          </div>
        </div>
      )
    }
}

export default Breweries;
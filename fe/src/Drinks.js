import React, { Component } from 'react';
import axios from 'axios';
import './Drink.css';

const drinksImport = axios.create({
  baseURL: 'http://localhost:5000/drinks',
})

class Drinks extends Component {
  constructor(props) {
    super(props)
      this.state = { drinks: null }
  }

  componentDidMount() {
    drinksImport.get()
      .then(drinks => this.setState({ drinks: drinks }))
      .then(console.log('component did mount here'))
      .then(console.log(this.state.drinks))
      .catch(error => console.log(error))
  }

  componentDidUpdate(prevProps, prevState) {

    }

    renderTableHeader = () => {
      return (
        <tr>
          <td className="mainTableDataLeftmost">Name</td>
          <td className="mainTableData">Date</td>
          <td className="mainTableData">Main Drink Component</td>
          <td className="mainTableData">Drink Type</td>
          <td className="mainTableData">Mixer One</td>
          <td className="mainTableData">Mixer Two</td>
          <td className="mainTableData">Garnish</td>
          <td className="mainTableData">Rating Word One</td>
          <td className="mainTableData">Rating Word Two</td>
          <td className="mainTableData">Score</td>
          <td className="mainTableData">Brand</td>
          <td className="mainTableData">Collaboration One</td>
          <td className="mainTableData">Collaboration Two</td>
          <td className="mainTableDataRightmost">Company</td>
        </tr>
      )
    }

    renderTableData = () => {
      return this.state.drinks.data.map((drink, index) => {
          const { name, date, drinkMain, drinkType, mixerOne, mixerTwo, garnish, ratingWordOne, ratingWordTwo, score, brand, collabOne, collabTwo, company} = drink
          return (
              <tr key={index}>
                <td className="mainTableDataLeftmost">{name}</td>
                <td className="mainTableData">{date}</td>
                <td className="mainTableData">{drinkMain}</td>
                <td className="mainTableData">{drinkType}</td>
                <td className="mainTableData">{mixerOne}</td>
                <td className="mainTableData">{mixerTwo}</td>
                <td className="mainTableData">{garnish}</td>
                <td className="mainTableData">{ratingWordOne}</td>
                <td className="mainTableData">{ratingWordTwo}</td>
                <td className="mainTableData">{score}</td>
                <td className="mainTableData">{brand}</td>
                <td className="mainTableData">{collabOne}</td>
                <td className="mainTableData">{collabTwo}</td>
                <td className="mainTableDataRightmost">{company}</td>
              </tr>
          )
      })
    }


  render() {
    {console.log(this.state.drinks)}
    if(!this.state.drinks) {
      return <h1>Please Wait</h1>
    } else {
      { console.log(this.state.drinks.data) }
      return (
        <div className="container">
          <h1 className="mainTitle">Drinks Table</h1>
          <table className="mainTable">
            <tbody className="mainTableBody">
              <tr className="mainTableHeader">{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Drinks;
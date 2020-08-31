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

    renderTableHeader() {
      const headers = ["Drinker","Date","Main Component","Drink Type","Mixer One","Mixer Two","Garnish","Rating Word One","Rating Word Two","Score","Brewery / Brand","Collab Brewery One","Collab Brewery Two","Company"]
        return headers.map((header, index) => {
          return <th className="mainTableHeader" key={index}>{header}</th>
        })
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
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Drinks;
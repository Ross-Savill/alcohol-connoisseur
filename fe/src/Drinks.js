import React, { Component } from 'react';
import axios from 'axios';

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
      let header = Object.keys(this.state.drinks.data[0])
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
      })
    }

     renderTableData = () => {
      {console.log(this.state.drinks)}
       if(this.state.drinks.data === [] || undefined) {
         return <h1>Please Wait</h1>
       } else {
        return this.state.drinks.data.map((drink, index) => {
           const { name, date, drinkMain, drinkType, mixerOne, mixerTwo, garnish, ratingWordOne, ratingWordTwo, score, brand, collabOne, collabTwo, company} = drink
           return (
              <tr key={index}>
                 <td>{name}</td>
                 <td>{date}</td>
                 <td>{drinkMain}</td>
                 <td>{drinkType}</td>
                 <td>{mixerOne}</td>
                 <td>{mixerTwo}</td>
                 <td>{garnish}</td>
                 <td>{ratingWordOne}</td>
                 <td>{ratingWordTwo}</td>
                 <td>{score}</td>
                 <td>{brand}</td>
                 <td>{collabOne}</td>
                 <td>{collabTwo}</td>
                 <td>{company}</td>
              </tr>
           )
        })
     }}

  render() {
    {console.log(this.state.drinks)}
    if(!this.state.drinks) {
      return <h1>Please Wait</h1>
    } else {
      { console.log(this.state.drinks.data) }
      return (
        <div className="container">
          <h1>Drinks Table</h1>
          <table className="mainTable">
            <tbody>
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
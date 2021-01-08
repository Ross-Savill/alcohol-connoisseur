import React, { Component } from 'react';

class BreweryDrinksTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breweryObjectsArray: null,
      expandedBreweryName: null
    }
  }

  componentDidMount() {
    const { breweryObjectsArray, expandedBreweryName } = this.props
      this.setState({ breweryObjectsArray, expandedBreweryName })
  }

  componentDidUpdate(prevProps, prevState) {
    const { breweryObjectsArray, expandedBreweryName } = this.props
    if(prevState.expandedBreweryName !== expandedBreweryName) {
      this.setState({ breweryObjectsArray, expandedBreweryName })
    }
  }

  render() {
    const { expandedBreweryName } = this.state
    if(!expandedBreweryName) {
      return(
        <div className="NoBrewerySelected">
          <h2></h2>
        </div>
      )
    } else {
      return(
        <table>
          <thead>
            <tr>
              <th>
              {`${expandedBreweryName}`}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>

              </td>
            </tr>
          </tbody>
        </table>

      )
    }
  }
}

export default BreweryDrinksTable;

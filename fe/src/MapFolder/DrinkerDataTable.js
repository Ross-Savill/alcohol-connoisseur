import React, { Component } from 'react';

class DrinkerDataTable extends Component {
  constructor(props) {
    super(props)
      this.state = {
        regionCode: null,
        regionName: null,
        chosenMap: null,
        drinks: null
      }
  }
  componentDidUpdate(prevProps, prevState) {
    const { drinks, chosenMap, regionCode, regionName } = this.props
    if(regionCode !== this.state.regionCode) {
      this.setState({ regionCode, regionName, drinks, chosenMap })
    }
  }
  render() {
    return(
      <p>Text here</p>
    )
  }
}

export default DrinkerDataTable;
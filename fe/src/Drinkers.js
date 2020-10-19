import React, { Component } from 'react';

class Drinkers extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: []
      }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/drinks")
      .then(resp => this.setState({ drinks: resp.data }))
      .catch(error => console.log(error))
    }

  async componentDidUpdate(prevProps, prevState) {

  }

  render() {
    return(
      <p>Drinkers Page</p>
    )
  }
}

  export default Drinkers
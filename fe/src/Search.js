import React, { Component } from 'react';
import './Search.css';

class Search extends Component {

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]:value })
  }

  render() {
    return(
      <form>
        <input type="text" id="mainComponentName" onChange={this.handleInputChange} />
      </form>
    )
  }

}

export default Search;

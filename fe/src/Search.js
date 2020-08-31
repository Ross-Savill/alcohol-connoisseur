import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Search.css';

const drinksImport = axios.create({
  baseURL: 'http://localhost:5000/drinks',
})

class Search extends Component {

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  componentDidMount() {
    drinksImport.get()
      .then(drinks => this.setState({ drinks: drinks }))
      .catch(error => console.log(error))
  }

  onChange = e => {
    const { drinks } = this.state;
    const userInput = e.currentTarget.value;

    if(!drinks) {
      return <h1>Please Wait</h1>
    } else {
    const filteredSuggestions = drinks.data.filter(drink =>
        drink.drinkMain.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  }
  };

  render() {
    const {
      onChange,
      state: {
        drinks,
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
    {console.log(this.state.drinks.data)}

    if (showSuggestions && userInput && drinks) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion}>
                  {JSON.stringify(suggestion)}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <input
          type="text"
          onChange={onChange}
          value={userInput}
        />
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default Search;

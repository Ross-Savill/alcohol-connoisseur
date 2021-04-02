import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainComponentQ extends React.Component {render() {

  const {
    props: {
      activeSuggestion,
      filteredMainDrinkSuggestions,
      filteredMainDrinkMixerSuggestions,
      showSuggestions,
      drinkAutocomplete,
      removeDropdown,
      drinkMain,
      mainComponentSuggestionClick,
      mixerSuggestionClick,
      onKeyDown
    }
  } = this;

  let mainDrinkSuggestionsComponent;
  let mixerSuggestionsComponent;

  if (showSuggestions && drinkMain) {
    if (filteredMainDrinkSuggestions.length) {
      mainDrinkSuggestionsComponent = (
        <ul className="suggestions main-suggestions">
          {filteredMainDrinkSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mainComponentSuggestionClick(suggestion)}>
                {suggestion.drinkMain} ({(suggestion.abv*100).toFixed(1)}%)
              </li>
            );
          })}
        </ul>
      );
    } else {
      mainDrinkSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  if (showSuggestions && drinkMain) {
    if (filteredMainDrinkMixerSuggestions.length) {
      mixerSuggestionsComponent = (
        <ul className="suggestions mixer-suggestions">
          {filteredMainDrinkMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "drinkMain")}>
                {suggestion} (PREVIOUS MIXER)
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No mixers available.</em>
        </div>
      );
    }
  }

  return(
    <div className="drinkMainQuestionContainer">
      <FormGroup className="formGroupQuestion">
        <Label className={this.props.drinkMain === "" ? "dataNeededLabel" : "questionLabel"}>Main Component</Label>
        <Input
          type="text"
          name="drinkMain"
          id="mainDrinkComponentInput"
          placeholder="Main Drink Component"
          value={drinkMain}
          onKeyDown={onKeyDown}
          onChange={drinkAutocomplete}
          onClick={removeDropdown}
          className={this.props.drinkMain === "" ? "dataNeeded" : "inputField"}
        />
      </FormGroup>
      <div className="mainAndMixerSuggestions">
        {mainDrinkSuggestionsComponent}
        {mixerSuggestionsComponent}
      </div>
    </div>
  )
}}

export default MainComponentQ;
import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class RatingTwoQ extends React.Component {render() {

  const {
    props: {
      ratingWordTwo,
      showSuggestions,
      filteredRtTwoSuggestions,
      activeSuggestion,
      removeDropdown,
      rtTwoAutocomplete,
      rtWordTwoSuggestionClick
    }
  } = this;

  let rtWordTwoSuggestionsComponent;

    if (showSuggestions && ratingWordTwo) {
      if (filteredRtTwoSuggestions.length) {
        rtWordTwoSuggestionsComponent = (
          <ul className="suggestions">
            {filteredRtTwoSuggestions.map((suggestedWord, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={() => rtWordTwoSuggestionClick(suggestedWord)}>
                  {suggestedWord}
                </li>
              );
            })}
          </ul>
        );
      } else {
        rtWordTwoSuggestionsComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

  return (
    <Col>
      <Label className={ratingWordTwo === "" ? "dataNeededLabel" : "questionLabel"}>Rating Word Two</Label>
      <FormGroup className="formGroupQuestion">
        <Input
          type="text"
          name="ratingWordTwo"
          id="ratingWordTwoInput"
          placeholder="Rating Word Two"
          value={ratingWordTwo}
          onChange={rtTwoAutocomplete}
          onClick={removeDropdown}
          className={ratingWordTwo === "" ? "dataNeeded" : "inputField"}
        />
      </FormGroup>
      <div className="additionalSugs">
        {rtWordTwoSuggestionsComponent}
      </div>
    </Col>
  )
}}

export default RatingTwoQ;
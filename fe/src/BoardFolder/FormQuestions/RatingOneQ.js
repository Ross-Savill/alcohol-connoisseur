import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class RatingOneQ extends React.Component {render() {

  const {
    props: {
      ratingWordOne,
      rtWordOneSuggestions,
      filteredRtOneSuggestions,
      activeSuggestion,
      removeDropdown,
      rtOneAutocomplete,
      rtWordOneSuggestionClick
    }
  } = this;

  let rtWordOneSuggestionsComponent;

  if (rtWordOneSuggestions && ratingWordOne) {
    if (filteredRtOneSuggestions.length) {
      rtWordOneSuggestionsComponent = (
        <ul className="suggestions">
          {filteredRtOneSuggestions.map((suggestedWord, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => rtWordOneSuggestionClick(suggestedWord)}>
                {suggestedWord}
              </li>
            );
          })}
        </ul>
      );
    } else {
      rtWordOneSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No suggestions available.</em>
        </div>
      );
    }
  }

  return (
    <Col>
      <Label className={ratingWordOne === "" ? "dataNeededLabel" : "questionLabel"}>Rating Word One</Label>
      <FormGroup className="formGroupQuestion">
        <Input
          type="text"
          name="ratingWordOne"
          id="ratingWordOneInput"
          placeholder="Rating Word One"
          value={ratingWordOne}
          onClick={removeDropdown}
          onChange={rtOneAutocomplete}
          className={ratingWordOne === "" ? "dataNeeded" : "inputField"}
        />
      </FormGroup>
      <div className="additionalSugs">
        {rtWordOneSuggestionsComponent}
      </div>
    </Col>
  )
}}

export default RatingOneQ

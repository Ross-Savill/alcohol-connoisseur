import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerFourQ extends React.Component {render() {

  let mixerFourSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerFourSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
      removeDropdown,
      mixerFour,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerFourSuggestions && mixerFour) {
    if (filteredMixerSuggestions.length) {
      mixerFourSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerFour")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerFourSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  return (
    <Col xs="3">
      <FormGroup>
        <Label className={mixerFour === "" ? "dataNeededLabel" : "questionLabel"}>Mixer Four</Label>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerFour"
            id="mixerFourInput"
            placeholder="Mixer Four"
            value={mixerFour}
            onKeyDown={onKeyDown}
            onClick={removeDropdown}
            onChange={mixerAutocomplete}
            className={mixerFour === "" ? "dataNeeded" : "inputField"}
          />
          <div className="mixerSuggestions">
            {mixerFourSuggestionsComponent}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerFourQ;
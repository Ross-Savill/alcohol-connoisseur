import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerEightQ extends React.Component {render() {

  let mixerEightSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerEightSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
      mixerEight,
      removeDropdown,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerEightSuggestions && mixerEight) {
    if (filteredMixerSuggestions.length) {
      mixerEightSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerEight")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerEightSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  return (
    <Col xs="3">
      <FormGroup>
        <Label className={mixerEight === "" ? "dataNeededLabel" : "questionLabel"}>Mixer Eight</Label>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerEight"
            id="mixerEightInput"
            placeholder="Mixer Eight"
            value={mixerEight}
            onKeyDown={onKeyDown}
            onClick={removeDropdown}
            onChange={mixerAutocomplete}
            className={mixerEight === "" ? "dataNeeded" : "inputField"}
          />
          <div className="mixerSuggestions">
            {mixerEightSuggestionsComponent}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerEightQ;
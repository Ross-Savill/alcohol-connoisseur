import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerThreeQ extends React.Component {render() {

  let mixerThreeSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerThreeSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
      removeDropdown,
      mixerThree,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerThreeSuggestions && mixerThree) {
    if (filteredMixerSuggestions.length) {
      mixerThreeSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerThree")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerThreeSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  return (
    <Col xs="3">
      <FormGroup>
        <Label className={mixerThree === "" ? "dataNeededLabel" : "questionLabel"}>Mixer Three</Label>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerThree"
            id="mixerThreeInput"
            placeholder="Mixer Three"
            value={mixerThree}
            onKeyDown={onKeyDown}
            onClick={removeDropdown}
            onChange={mixerAutocomplete}
            className={mixerThree === "" ? "dataNeeded" : "inputField"}
          />
          <div className="mixerSuggestions">
            {mixerThreeSuggestionsComponent}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerThreeQ;
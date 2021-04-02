

import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerFiveQ extends React.Component {render() {

  let mixerFiveSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerFiveSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
      removeDropdown,
      mixerFive,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerFiveSuggestions && mixerFive) {
    if (filteredMixerSuggestions.length) {
      mixerFiveSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerFive")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerFiveSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  return (
  <Col xs="3">
    <FormGroup>
      <Label className={mixerFive === "" ? "dataNeededLabel" : "questionLabel"}>Mixer Five</Label>
      <div className="mixerQuestion">
        <Input
          type="text"
          name="mixerFive"
          id="mixerFiveInput"
          placeholder="Mixer Five"
          value={mixerFive}
          onClick={removeDropdown}
          onKeyDown={onKeyDown}
          onChange={mixerAutocomplete}
          className={this.props.mixerFive === "" ? "dataNeeded" : "inputField"}
        />
        <div className="mixerSuggestions">
          {mixerFiveSuggestionsComponent}
        </div>
      </div>
    </FormGroup>
  </Col>
  )
}}

export default MixerFiveQ
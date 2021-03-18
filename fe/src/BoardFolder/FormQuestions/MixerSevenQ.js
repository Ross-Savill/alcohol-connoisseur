import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerSevenQ extends React.Component {render() {

  let mixerSevenSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerSevenSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
      mixerSeven,
      removeDropdown,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerSevenSuggestions && mixerSeven) {
    if (filteredMixerSuggestions.length) {
      mixerSevenSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerSeven")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerSevenSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  return (
    <Col xs="3">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerSeven"
            id="mixerSevenInput"
            placeholder="Mixer Seven"
            value={mixerSeven}
            onKeyDown={onKeyDown}
            onClick={removeDropdown}
            onChange={mixerAutocomplete}
            className={mixerSeven === "" ? "dataNeeded" : "inputField"}
          />
          {mixerSevenSuggestionsComponent}
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerSevenQ;
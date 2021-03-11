import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerSixQ extends React.Component {render() {

  let mixerSixSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerSixSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
      mixerSix,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerSixSuggestions && mixerSix) {
    if (filteredMixerSuggestions.length) {
      mixerSixSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerSix")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerSixSuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  return (
    <Col xs="4">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerSix"
            id="mixerSixInput"
            placeholder="Mixer Six"
            value={mixerSix}
            onKeyDown={onKeyDown}
            onChange={mixerAutocomplete}
            className={mixerSix === "" ? "dataNeeded" : "inputField"}
          />
          {mixerSixSuggestionsComponent}
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerSixQ;
import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerTwoQ extends React.Component {render() {

  let mixerTwoSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerTwoSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
      mixerTwo,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerTwoSuggestions && mixerTwo) {
    if (filteredMixerSuggestions.length) {
      mixerTwoSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerTwo")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerTwoSuggestionsComponent = (
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
            name="mixerTwo"
            id="mixerTwoInput"
            placeholder="Mixer Two"
            onKeyDown={onKeyDown}
            value={mixerTwo}
            onChange={mixerAutocomplete}
            className={mixerTwo === "" ? "dataNeeded" : "inputField"}
          />
          {mixerTwoSuggestionsComponent}
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerTwoQ;
import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerFourQ extends React.Component {render() {

  let mixerFourSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerFourSuggestions,
      mixerAutocomplete,
      mixerSuggestionClick,
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
    <Col xs="4">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerFour"
            id="mixerFourInput"
            placeholder="Mixer Four"
            value={mixerFour}
            onKeyDown={onKeyDown}
            onChange={mixerAutocomplete}
            className={mixerFour === "" ? "dataNeeded" : "inputField"}
          />
          {mixerFourSuggestionsComponent}
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerFourQ;
import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerOneQ extends React.Component {render() {

  let mixerOneSuggestionsComponent;

  const {
    props: {
      filteredMixerSuggestions,
      mixerOneSuggestions,
      mixerAutocomplete,
      removeDropdown,
      mixerSuggestionClick,
      mixerOne,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (mixerOneSuggestions && mixerOne) {
    if (filteredMixerSuggestions.length) {
      mixerOneSuggestionsComponent = (
        <ul className="suggestions">
          {filteredMixerSuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion, "mixerOne")}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      mixerOneSuggestionsComponent = (
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
            name="mixerOne"
            id="mixerOneInput"
            placeholder="Mixer One"
            value={mixerOne}
            onKeyDown={onKeyDown}
            onClick={this.removeDropdown}
            onChange={mixerAutocomplete}
            className={mixerOne === "" ? "dataNeeded" : "inputField"}
          />
          {mixerOneSuggestionsComponent}
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerOneQ;
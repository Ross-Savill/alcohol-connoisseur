import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
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
    <Col xs="3">
      <FormGroup>
        <Label className={this.props.mixerOne === "" ? "dataNeededLabel" : "questionLabel"}>Mixer One</Label>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerOne"
            id="mixerOneInput"
            placeholder="Mixer One"
            value={mixerOne}
            onKeyDown={onKeyDown}
            onClick={removeDropdown}
            onChange={mixerAutocomplete}
            className={mixerOne === "" ? "dataNeeded" : "inputField"}
          />
          <div className="mixerSuggestions">
            {mixerOneSuggestionsComponent}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerOneQ;
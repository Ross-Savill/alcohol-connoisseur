import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
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
        <Label className={mixerSeven === "" ? "dataNeededLabel" : "questionLabel"}>Mixer Seven</Label>
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
          <div className="mixerSuggestions">
            {mixerSevenSuggestionsComponent}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerSevenQ;
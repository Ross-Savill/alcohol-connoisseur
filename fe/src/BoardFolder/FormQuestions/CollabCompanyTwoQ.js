import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCompanyTwoQ extends React.Component {render() {

  let companySuggestionsComponent;

  const {
    props: {
      filteredCompanySuggestions,
      secondCollabCompanySuggestions,
      companyAutocomplete,
      companySuggestionClick,
      removeDropdown,
      secondCollabCompany,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (secondCollabCompanySuggestions && secondCollabCompany) {
    if (filteredCompanySuggestions.length) {
      companySuggestionsComponent = (
        <ul className="suggestions companySuggestions">
          {filteredCompanySuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => companySuggestionClick(suggestion, "secondCollabCompany", "secondCollabCountry", "secondUkUsa")}>
                {suggestion.sugCompany}
              </li>
            );
          })}
        </ul>
      );
    } else {
      companySuggestionsComponent = (
        <div className="no-suggestions">
          <em>No main drinks available.</em>
        </div>
      );
    }
  }

  return (
    <Col>
      <FormGroup>
      <Label className={secondCollabCompany === "" ? "dataNeededLabel" : "questionLabel"}>Second Collab Company</Label>
        <div>
          <Input
            type="text"
            name="secondCollabCompany"
            id="collabTwoInput"
            placeholder="Second Collab Company (Optional)"
            value={secondCollabCompany}
            onKeyDown={onKeyDown}
            onClick={removeDropdown}
            onChange={companyAutocomplete}
            className="inputField"
          />
          <div className="mixerSuggestions">
            {companySuggestionsComponent}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default CollabCompanyTwoQ;
import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainCompanyQ extends React.Component {render() {

  let companySuggestionsComponent;

  const {
    props: {
      filteredCompanySuggestions,
      companySuggestions,
      companyAutocomplete,
      companySuggestionClick,
      company,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (companySuggestions && company) {
    if (filteredCompanySuggestions.length) {
      companySuggestionsComponent = (
        <ul className="suggestions companySuggestions">
          {filteredCompanySuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => companySuggestionClick(suggestion, "company", "country", "ukUsa")}>
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
      <FormGroup className="formGroupQuestion">
        <div className="companyInputAndSugs">
          <Input
            type="text"
            name="company"
            id="companyInput"
            placeholder="Main Component Company"
            value={company}
            onKeyDown={onKeyDown}
            onChange={companyAutocomplete}
            className={company === "" ? "dataNeeded" : "inputField"}
            />
            <div className="companySugs">
              {companySuggestionsComponent}
            </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MainCompanyQ;
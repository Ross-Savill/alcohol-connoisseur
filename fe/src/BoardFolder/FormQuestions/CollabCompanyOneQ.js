import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCompanyOneQ extends React.Component {render() {

  let companySuggestionsComponent;

  const {
    props: {
      filteredCompanySuggestions,
      firstCollabCompanySuggestions,
      companyAutocomplete,
      companySuggestionClick,
      firstCollabCompany,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (firstCollabCompanySuggestions && firstCollabCompany) {
    if (filteredCompanySuggestions.length) {
      companySuggestionsComponent = (
        <ul className="suggestions companySuggestions">
          {filteredCompanySuggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => companySuggestionClick(suggestion, "firstCollabCompany", "firstCollabCountry", "firstUkUsa")}>
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
        <Input
          type="text"
          name="firstCollabCompany"
          id="collabOneInput"
          placeholder="First Collab Company"
          value={this.props.firstCollabCompany}
          onKeyDown={onKeyDown}
          onChange={companyAutocomplete}
          className={this.props.firstCollabCompany === "" ? "dataNeeded" : "inputField"}
        />
        {/* <div ref={this.props.setWrapperRef}> */}
          {companySuggestionsComponent}
        {/* </div> */}
      </FormGroup>
    </Col>
  )
}}

export default CollabCompanyOneQ;
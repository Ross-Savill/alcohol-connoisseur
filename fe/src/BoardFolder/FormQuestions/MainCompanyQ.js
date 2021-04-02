import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainCompanyQ extends React.Component {render() {

  let companySuggestionsComponent;

  const {
    props: {
      filteredCompanySuggestions,
      companySuggestions,
      companyAutocomplete,
      companySuggestionClick,
      removeDropdown,
      company,
      onKeyDown,
      activeSuggestion
    }
  } = this;

  if (companySuggestions && company) {
    if (filteredCompanySuggestions.length) {
      companySuggestionsComponent = (
        <ul className="suggestions">
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
      <FormGroup>
        <Label className={company === "" ? "dataNeededLabel" : "questionLabel"}>Company</Label>
        <div>
          <Input
            type="text"
            name="company"
            id="companyInput"
            placeholder="Main Component Company"
            value={company}
            onKeyDown={onKeyDown}
            onClick={removeDropdown}
            onChange={companyAutocomplete}
            className={company === "" ? "dataNeeded" : "inputField"}
          />
          <div className="additionalSugs">
            {companySuggestionsComponent}
          </div>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MainCompanyQ;
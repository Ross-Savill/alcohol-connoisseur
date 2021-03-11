import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class RatingTwoQ extends React.Component {render() {

  const {
    props: {
      ratingWordTwo,
      showSuggestions,
      filteredRtTwoSuggestions,
      activeSuggestion,
      rtTwoAutocomplete,
      rtWordTwoSuggestionClick
    }
  } = this;

  let rtWordTwoSuggestionsComponent;

    if (showSuggestions && ratingWordTwo) {
      if (filteredRtTwoSuggestions.length) {
        rtWordTwoSuggestionsComponent = (
          <ul className="suggestions">
            {filteredRtTwoSuggestions.map((suggestedWord, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={() => rtWordTwoSuggestionClick(suggestedWord)}>
                  {suggestedWord}
                </li>
              );
            })}
          </ul>
        );
      } else {
        rtWordTwoSuggestionsComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

  return (
    <Col>
      <FormGroup className="formGroupQuestion">
        <Input
          type="text"
          name="ratingWordTwo"
          id="ratingWordTwoInput"
          placeholder="Rating Word Two"
          value={ratingWordTwo}
          onChange={rtTwoAutocomplete}
          className={ratingWordTwo === "" ? "dataNeeded" : "inputField"}
        />
      </FormGroup>
      {rtWordTwoSuggestionsComponent}
    </Col>
  )
}}

export default RatingTwoQ;
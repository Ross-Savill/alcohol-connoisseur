import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class RatingOneQ extends React.Component {render() {

  const {
    props: {
      ratingWordOne,
      showSuggestions,
      filteredRtOneSuggestions,
      activeSuggestion,
      rtOneAutocomplete,
      rtWordOneSuggestionClick
    }
  } = this;

  let rtWordOneSuggestionsComponent;

  if (showSuggestions && ratingWordOne) {
    if (filteredRtOneSuggestions.length) {
      rtWordOneSuggestionsComponent = (
        <ul className="suggestions">
          {filteredRtOneSuggestions.map((suggestedWord, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={() => rtWordOneSuggestionClick(suggestedWord)}>
                {suggestedWord}
              </li>
            );
          })}
        </ul>
      );
    } else {
      rtWordOneSuggestionsComponent = (
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
        name="ratingWordOne"
        id="ratingWordOneInput"
        placeholder="Rating Word One"
        value={ratingWordOne}
        onChange={rtOneAutocomplete}
        className={ratingWordOne === "" ? "dataNeeded" : "inputField"}
      />
    </FormGroup>
    {rtWordOneSuggestionsComponent}
    </Col>
  )
}}

export default RatingOneQ

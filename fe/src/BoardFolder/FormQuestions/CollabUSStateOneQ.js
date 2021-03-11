import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabGBCountryOneQ extends React.Component {render() {

  return (
    <Col xs="4">
      <FormGroup className="formGroupQuestion">
        <Input
          type="select"
          name="firstUkUsa"
          id="collabOneUSStateInput"
          value={this.props.firstUkUsa}
          onChange={this.props.handleFormChange}
          className={this.props.firstUkUsa === "" ? "dataNeeded" : "inputField"}
        >
          {this.props.usStateOptionsSelect}
        </Input>
      </FormGroup>
    </Col>
  )
}}

export default CollabGBCountryOneQ;
import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabGBCountryTwoQ extends React.Component {render() {

  return (
    <Col>
      <Label className={this.props.secondUkUsa === "" ? "dataNeededLabel" : "questionLabel"}>US State</Label>
      <FormGroup className="formGroupQuestion">
        <Input
          type="select"
          name="secondUkUsa"
          id="collabTwoUSStateInput"
          value={this.props.secondUkUsa}
          onChange={this.props.handleFormChange}
          className="inputField"
        >
          {this.props.usStateOptionsSelect}
        </Input>
      </FormGroup>
    </Col>)
}}

export default CollabGBCountryTwoQ;
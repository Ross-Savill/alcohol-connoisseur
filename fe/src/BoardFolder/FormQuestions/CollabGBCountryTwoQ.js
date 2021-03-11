import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabGBCountryTwoQ extends React.Component {render() {

  return (
    <Col>
    <FormGroup>
      <div>
        <Input
          type="select"
          name="secondUkUsa"
          id="collabTwoGBCountryInput"
          value={this.props.secondUkUsa}
          onChange={this.props.handleFormChange}
          className="inputField"
        >
        {this.props.britishCountrySelect}
        </Input>
      </div>
    </FormGroup>
    </Col>
  )
}}

export default CollabGBCountryTwoQ;
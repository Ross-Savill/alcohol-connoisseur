import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class DrinkTypeQuestion extends React.Component {render() {

  const drinkTypeSelect = this.props.drinkTypes.map((drinkType) =>
    <option key={drinkType.drinkType} value={drinkType.drinkType}>{drinkType.drinkType}</option>
  )

  return (
    <Col xs="4">
      <FormGroup className="formGroupQuestion">
        <Input
          type="select"
          name="drinkType"
          id="drinkTypeInput"
          value={this.props.drinkType}
          onChange={this.props.handleFormChange}
          className={this.props.drinkType === "" ? "dataNeeded" : "inputField"}
        >
          <option className="placeholder" value="">Select Drink Type:</option>
          {drinkTypeSelect}
        </Input>
      </FormGroup>
    </Col>
  )

}}

export default DrinkTypeQuestion;
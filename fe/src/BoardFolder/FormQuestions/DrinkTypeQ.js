import React, { Component } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class DrinkTypeQ extends React.Component {render() {

  const drinkTypeSelect = (this.props.drinkTypes.map((drinkType) =>
    <option key={drinkType.drinkType} value={drinkType.drinkType}>{drinkType.drinkType}</option>
  )).sort(function(a,b) { return a.key > b.key })

  return (
    <Col xs="12">
      <FormGroup className="formGroupQuestion">
      <Label className={this.props.drinkType === "" ? "dataNeededLabel" : "questionLabel"}>Drink Type</Label>
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

export default DrinkTypeQ;
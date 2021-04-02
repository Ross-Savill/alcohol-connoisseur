import React, { Component } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class ABVQuestion extends React.Component {render() {

  return (
    <Col xs="4">
      <FormGroup className="formGroupQuestion">
        <Label className={this.props.abv === "" ? "dataNeededLabel" : "questionLabel"}>ABV(%)</Label>
        <Input
          type="number"
          name="abv"
          id="abvInput"
          placeholder="Drink ABV(%)"
          value={this.props.abv || ""}
          onChange={this.props.handleFormChange}
          className={this.props.abv === "" ? "dataNeeded" : "inputField"}
        />
      </FormGroup>
    </Col>
  )
}}

export default ABVQuestion;
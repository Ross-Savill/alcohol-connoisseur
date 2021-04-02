import React, { Component } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainUSStateQ extends React.Component {render() {

  return (
  <Col>
    <FormGroup className="formGroupQuestion">
      <Label className={this.props.ukUsa === "" ? "dataNeededLabel" : "questionLabel"}>US State</Label>
      <Input
        type="select"
        name="ukUsa"
        id="ukUsaInput"
        value={this.props.ukUsa}
        onChange={this.props.handleFormChange}
        className={this.props.ukUsa === "" ? "dataNeeded" : "inputField"}
      >
        {this.props.usStateOptionsSelect}
      </Input>
    </FormGroup>
  </Col>
  )
}}

export default MainUSStateQ;
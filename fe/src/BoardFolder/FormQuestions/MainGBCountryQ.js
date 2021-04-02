import React, { Component } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainGBCountryQ extends React.Component {render() {

  return (
    <Col>
      <FormGroup className="formGroupQuestion">
        <Label className={this.props.ukUsa === "" ? "dataNeededLabel" : "questionLabel"}>UK Country</Label>
        <Input
          type="select"
          name="ukUsa"
          id="ukUsaInput"
          value={this.props.ukUsa}
          onChange={this.props.handleFormChange}
          className={this.props.ukUsa === "" ? "dataNeeded" : "inputField"}
        >
          {this.props.britishCountrySelect}
        </Input>
      </FormGroup>
    </Col>
  )
}}

export default MainGBCountryQ;
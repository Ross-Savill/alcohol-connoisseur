import React, { Component } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabGBCountryOneQ extends React.Component {render() {

  return (
    <Col>
      <Label className={this.props.firstUkUsa === "" ? "dataNeededLabel" : "questionLabel"}>UK Country</Label>
      <FormGroup>
        <div>
          <Input
            type="select"
            name="firstUkUsa"
            id="collabOneGBCountryInput"
            value={this.props.firstUkUsa}
            onChange={this.props.handleFormChange}
            className={this.props.firstUkUsa === "" ? "dataNeeded" : "inputField"}
          >
            {this.props.britishCountrySelect}
          </Input>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default CollabGBCountryOneQ;
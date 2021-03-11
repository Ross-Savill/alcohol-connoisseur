import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabGBCountryOneQ extends React.Component {render() {

  return (
    <Col>
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
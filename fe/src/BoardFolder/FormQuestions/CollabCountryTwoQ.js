import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCountryTwoQ extends React.Component {render() {

  return (
    <Col>
    <FormGroup>
      <div>
        <Input
          type="select"
          name="secondCollabCountry"
          id="collabTwoCountryInput"
          value={this.props.secondCollabCountry}
          onChange={this.props.handleFormChangeCountryUpdate}
          className="inputField"
        >
          <option value="">Select Country:</option>
          {this.props.countryOptionsSelect}
        </Input>
      </div>
    </FormGroup>
    </Col>
  )
}}

export default CollabCountryTwoQ;
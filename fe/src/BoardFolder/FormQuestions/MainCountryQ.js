import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainCountryQ extends React.Component {render() {

  return(
    <Col>
      <FormGroup className="formGroupQuestion">
        <Input
          type="select"
          name="country"
          id="countryInput"
          value={this.props.country}
          onChange={this.props.handleFormChangeCountryUpdate}
          className={this.props.country === "" ? "dataNeeded" : "inputField"}
        >
        <option value="">Select Country:</option>
          {this.props.countryOptionsSelect}
        </Input>
      </FormGroup>
    </Col>
  )
}}

export default MainCountryQ;
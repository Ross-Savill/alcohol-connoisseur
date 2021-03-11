import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainGBCountryQ extends React.Component {render() {

  return (
    <Col>
      <FormGroup className="formGroupQuestion">
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
import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainUSStateQ extends React.Component {render() {

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
        {this.props.usStateOptionsSelect}
      </Input>
    </FormGroup>
  </Col>
  )
}}

export default MainUSStateQ;
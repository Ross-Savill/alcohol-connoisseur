import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class DrinkerQ extends React.Component {render() {

  const drinkerNameSelect = this.props.drinkerNames.map((name) =>
    <option key={name._id} value={[name.personName, name._id]}>{name.personName}</option>
  );

  return (
    <Col xs="12">
      <FormGroup className="formGroupQuestion">
        <Input
          type="select"
          name="personName"
          id="personNameInput"
          value={[this.props.personName, this.props.drinkerId]}
          onChange={this.props.handleNameChange}
          className={this.props.personName === "" ? "dataNeeded" : "inputField"}
        >
        <option className="placeholder" value="">Select Drinker:</option>
        {drinkerNameSelect}
        </Input>
      </FormGroup>
    </Col>
  )
}}

export default DrinkerQ;
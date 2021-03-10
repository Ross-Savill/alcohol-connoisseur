import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class DrinkerQuestion extends React.Component {render() {

  const drinkerNameSelect = this.props.drinkerNames.map((name) =>
    <option key={name.personName} value={name.personName}>{name.personName}</option>
  );

  return (
    <FormGroup className="formGroupQuestion">
      <Input
        type="select"
        name="personName"
        id="personNameInput"
        value={this.props.personName}
        onChange={this.props.handleFormChange}
        className={this.props.personName === "" ? "dataNeeded" : "inputField"}
      >
      <option className="placeholder" value="">Select Drinker:</option>
      {drinkerNameSelect}
      </Input>
    </FormGroup>
  )
}}

export default DrinkerQuestion;
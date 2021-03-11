import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerTwoQ extends React.Component {render() {

  return (
    <Col xs="4">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerTwo"
            id="mixerTwoInput"
            placeholder="Mixer Two"
            value={this.props.mixerTwo}
            onChange={this.props.handleFormChange}
            className={this.props.mixerTwo === "" ? "dataNeeded" : "inputField"}
          />
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerTwoQ;
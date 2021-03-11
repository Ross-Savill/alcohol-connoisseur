

import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerFiveQ extends React.Component {render() {

  return (
  <Col xs="4">
    <FormGroup>
      <div className="mixerQuestion">
        <Input
          type="text"
          name="mixerFive"
          id="mixerFiveInput"
          placeholder="Mixer Five"
          value={this.props.mixerFive}
          onChange={this.props.handleFormChange}
          className={this.props.mixerFive === "" ? "dataNeeded" : "inputField"}
        />
      </div>
    </FormGroup>
  </Col>
  )
}}

export default MixerFiveQ
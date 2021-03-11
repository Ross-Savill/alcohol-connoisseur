import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerSixQ extends React.Component {render() {

  return (
    <Col xs="4">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerSix"
            id="mixerSixInput"
            placeholder="Mixer Six"
            value={this.props.mixerSix}
            onChange={this.props.handleFormChange}
            className={this.props.mixerSix === "" ? "dataNeeded" : "inputField"}
          />
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerSixQ;
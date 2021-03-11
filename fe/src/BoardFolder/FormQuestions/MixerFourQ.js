import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerFourQ extends React.Component {render() {

  return (
    <Col xs="4">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerFour"
            id="mixerFourInput"
            placeholder="Mixer Four"
            value={this.props.mixerFour}
            onChange={this.props.handleFormChange}
            className={this.props.mixerFour === "" ? "dataNeeded" : "inputField"}
          />
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerFourQ;
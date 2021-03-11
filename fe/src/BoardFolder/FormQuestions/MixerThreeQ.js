import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerThreeQ extends React.Component {render() {

  return (
    <Col xs="4">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerThree"
            id="mixerThreeInput"
            placeholder="Mixer Three"
            value={this.props.mixerThree}
            onChange={this.props.handleFormChange}
            className={this.props.mixerThree === "" ? "dataNeeded" : "inputField"}
          />
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerThreeQ;
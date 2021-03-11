import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerOneQ extends React.Component {render() {

  return (
    <Col xs="4">
      <FormGroup>
        <div className="mixerQuestion">
          <Input
            type="text"
            name="mixerOne"
            id="mixerOneInput"
            placeholder="Mixer One"
            value={this.props.mixerOne}
            onChange={this.props.handleFormChange}
            className={this.props.mixerOne === "" ? "dataNeeded" : "inputField"}
          />
        </div>
      </FormGroup>
    </Col>
  )
}}

export default MixerOneQ;
import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MixerSelect extends React.Component {render() {

  return(
    <Col xs="2" className="mixerSelectQuestion">
      <FormGroup className="mixerSelect">
        <Input type="select"
               name="hasMixer"
               value={this.props.hasMixer}
               onChange={this.props.toggleHasMixer}
               className="inputField"
        >
          <option key={0} value={0}>Mixer(s)?</option>
          <option key={1} value={1}>One Mixer</option>
          <option key={2} value={2}>Two Mixers</option>
          <option key={3} value={3}>Three Mixers</option>
          <option key={4} value={4}>Four Mixers</option>
          <option key={5} value={5}>Five Mixers</option>
          <option key={6} value={6}>Six Mixers</option>
        </Input>
      </FormGroup>
    </Col>
  )
}}

export default MixerSelect;
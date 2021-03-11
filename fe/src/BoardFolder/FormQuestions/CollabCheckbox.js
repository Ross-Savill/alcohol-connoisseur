import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCheckbox extends React.Component {render() {

  return (
    <Col>
      <FormGroup check className="collabCheck">
        <Label check>
        <Input type="checkbox"
               name="hasCollab"
               onChange={this.props.toggleHasCollab}
               className="inputField"
               checked={this.props.hasCollab}
        />
        Collabaratory Brewery(s)?
        </Label>
      </FormGroup>
    </Col>
  )
}}

export default CollabCheckbox;
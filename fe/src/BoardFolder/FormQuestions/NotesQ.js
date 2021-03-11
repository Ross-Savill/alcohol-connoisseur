import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class NotesQ extends React.Component {render() {

  return (
    <Col>
      <FormGroup className="formGroupQuestion">
        <Input
          type="textarea"
          name="notes"
          id="notesInput"
          placeholder="Drink notes here"
          value={this.props.notes}
          onChange={this.props.handleFormChange}
          className="inputField"
        />
      </FormGroup>
    </Col>
  )
}}

export default NotesQ;
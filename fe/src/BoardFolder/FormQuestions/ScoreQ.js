import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class ScoreQ extends React.Component {render() {

  return (
    <Col xs="2">
      <FormGroup className="formGroupQuestion">
        <Input
          type="number"
          name="score"
          id="scoreInput"
          placeholder="Score"
          value={this.props.score || null}
          onChange={this.props.handleFormChange}
          className={this.props.score === null ? "dataNeeded" : "inputField"}
        />
      </FormGroup>
    </Col>
  )
}}

export default ScoreQ;
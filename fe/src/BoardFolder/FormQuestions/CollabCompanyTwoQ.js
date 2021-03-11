import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCompanyTwoQ extends React.Component {render() {

  return (
    <Col>
      <FormGroup>
        <div>
          <Input
            type="text"
            name="secondCollabCompany"
            id="collabTwoInput"
            placeholder="Second Collab Company (Optional)"
            value={this.props.secondCollabCompany}
            onChange={this.props.handleFormChange}
            className="inputField"
          />
        </div>
      </FormGroup>
    </Col>
  )
}}

export default CollabCompanyTwoQ;
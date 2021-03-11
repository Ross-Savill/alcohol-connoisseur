import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCompanyOneQ extends React.Component {render() {

  return (
    <Col>
      <FormGroup>
        <div>
          <Input
            type="text"
            name="firstCollabCompany"
            id="collabOneInput"
            placeholder="First Collab Company"
            value={this.props.firstCollabCompany}
            onChange={this.props.handleFormChange}
            className={this.props.firstCollabCompany === "" ? "dataNeeded" : "inputField"}
          />
        </div>
      </FormGroup>
    </Col>
  )
}}

export default CollabCompanyOneQ;
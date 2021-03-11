import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class MainCompanyQ extends React.Component {render() {

  return (
    <Col>
      <FormGroup className="formGroupQuestion">
        <Input
          type="text"
          name="company"
          id="companyInput"
          placeholder="Main Component Company"
          value={this.props.company}
          onChange={this.props.handleFormChange}
          className={this.props.company === "" ? "dataNeeded" : "inputField"}
        />
      </FormGroup>
    </Col>
  )
}}

export default MainCompanyQ;
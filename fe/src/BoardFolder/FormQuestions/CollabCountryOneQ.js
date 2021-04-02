import React from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCountryOneQ extends React.Component {render() {

  return (
    <Col>
      <Label className={this.props.firstCollabCountry === "" ? "dataNeededLabel" : "questionLabel"}>First Collab Country</Label>
      <FormGroup>
        <div>
          <Input
            type="select"
            name="firstCollabCountry"
            id="collabOneCountryInput"
            value={this.props.firstCollabCountry}
            onChange={this.props.handleFormChangeCountryUpdate}
            className={this.props.firstCollabCountry === "" ? "dataNeeded" : "inputField"}
          >
            <option value="">Select Country:</option>
            {this.props.countryOptionsSelect}
          </Input>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default CollabCountryOneQ;
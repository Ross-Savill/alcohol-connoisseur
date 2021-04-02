import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCountryTwoQ extends React.Component {render() {

  return (
    <Col>
      <Label className={this.props.secondCollabCountry === "" ? "dataNeededLabel" : "questionLabel"}>Second Collab Country</Label>
      <FormGroup>
        <div>
          <Input
            type="select"
            name="secondCollabCountry"
            id="collabTwoCountryInput"
            value={this.props.secondCollabCountry}
            onChange={this.props.handleFormChangeCountryUpdate}
            className="inputField"
          >
            <option value="">Select Country:</option>
            {this.props.countryOptionsSelect}
          </Input>
        </div>
      </FormGroup>
    </Col>
  )
}}

export default CollabCountryTwoQ;
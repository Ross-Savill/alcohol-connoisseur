import React from 'react';
import { Col, FormGroup, Label, Input, } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class CollabCheckbox extends React.Component {render() {

  return (
    <Col xs="3">
      <FormGroup className="collabCheck">
        <Label className="questionLabel">Collaboratory Brewery?</Label>
        <Input type="select"
               name="hasCollab"
               onChange={this.props.toggleHasCollab}
               value={this.props.hasCollab}
        >
          <option key={0} value={0}>Collab Breweries?</option>
          <option key={1} value={1}>One Collab</option>
          <option key={2} value={2}>Two Collabs</option>
        </Input>
      </FormGroup>
    </Col>
  )
}}

export default CollabCheckbox;
import React from 'react';
import { Col, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class DrinkerQ extends React.Component { render() {

  let users = [];

  if(this.props.admin) {
    this.props.userObjects.map((name) =>
      users.push({ "value": name._id, "label": name.personName })
    );
  } else {
    this.props.userObjects.map((name) => {
      if(name._id === this.props.userId) {
        users.push({ "value": name._id, "label": name.personName })
      }
    });
  }

  return (
    <Col xs="12">
      <FormGroup className="formGroupDrinkerQuestion">
        <Label className={this.props.personName === "" ? "dataNeededLabel" : "questionLabel"}>Drinker</Label>
        <Select value={this.props.drinkerId ? { "value": this.props.drinkerId, "label": this.props.personName } : null}
                onChange={this.props.handleNameChange}
                options={users}
                className={this.props.personName === "" ? "dataNeededSelect" : "inputField"}
        >
        </Select>
      </FormGroup>
    </Col>
  )
}}

export default DrinkerQ;
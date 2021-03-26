import React from 'react';
import { Col, Form, FormGroup } from 'reactstrap';
import Select from 'react-select';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class DrinkerQ extends React.Component { render() {

  let users = [];

  this.props.userObjects.map((name) =>
    users.push({ "value": name._id, "label": name.personName })
  );

  return (
    <Col xs="12">
      <FormGroup className="formGroupQuestion">
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
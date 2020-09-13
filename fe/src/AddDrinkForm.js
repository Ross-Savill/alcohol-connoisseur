import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './AddDrinkForm.css';

const initialState = {
  isActive: false,
  peopleNames: []
}

class AddDrinkForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  };

  componentDidMount() {
    let drinkersArray = []
    axios("http://localhost:5000/peoplenames")
      .then(data => {
        drinkersArray = data.data.map((drinker) => {
          return drinker
      });
      console.log(drinkersArray);
      this.setState({ peopleNames: drinkersArray })
      }).catch(error => {
        console.log(error);
      });
  }

  toggleAddFormClass = () => {
    const currentState = this.state.isActive;
    this.setState({ isActive: !currentState });
    console.log(this.state.isActive)
  };

  validate = () => {
    let blankError = '';
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state)
    }
  }

  render() {
    let drinkerNames = this.state.peopleNames;
    let drinkerNameSelect = drinkerNames.map((name) =>
            <option key={name.id}>{name.drinker}</option>
        );

    return (
      <>
        <h2 onClick={this.toggleAddFormClass} >Add Drink</h2>
        <Container className={this.state.isActive ?
          'shownAddDrinkForm': 'hiddenAddDrinkForm'}>
          <Form inline className="addDrinkForm" onSubmit={this.handleSubmit}>
            {console.log("render")}
            <Col>
              <FormGroup>
                <Label for="personNameInput">Person Name</Label>
                <Input
                  type="select"
                  name="personNameEntry"
                  id="personNameInput"
                >
                <option className="placeholder" value="">Select Drinker:</option>
                {drinkerNameSelect}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="mainDrinkComponentInput">Main Drink Component</Label>
                <Input
                  type="text"
                  name="mainDrinkComponentEntry"
                  id="mainDrinkComponentInput"
                  placeholder="Main Drink Component"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="drinkTypeInput">Drink Type</Label>
                <Input
                  type="select"
                  name="drinkTypeEntry"
                  id="drinkTypeInput"
                  placeholder="Select Drink Type"
                >
                  <option>Beer</option>
                  <option>Cider</option>
                  <option>Wine</option>
                  <option>Fortified Wine</option>
                  <option>Gin</option>
                  <option>Vodka</option>
                  <option>Whisky</option>
                  <option>Rum</option>
                  <option>Brandy</option>
                  <option>Liqueur</option>
                  <option>Soft Drink</option>
                  <option>Other</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="brandNameInput">Brand or Brewery</Label>
                <Input
                  type="text"
                  name="brandNameEntry"
                  id="brandNameInput"
                  placeholder="Brand or Brewery Name"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="abvInput">ABV(%)</Label>
                <Input
                  type="number"
                  name="abvEntry"
                  id="abvInput"
                  placeholder="Drink ABV(%)"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="mixerOneInput">Mixer One</Label>
                <Input
                  type="text"
                  name="mixerOneEntry"
                  id="mixerOneInput"
                  placeholder="Mixer One"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="mixerTwoInput">Mixer Two</Label>
                <Input
                  type="text"
                  name="mixerTwoEntry"
                  id="mixerTwoInput"
                  placeholder="Mixer Two"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="garnishInput">Garnish</Label>
                <Input
                  type="text"
                  name="garnishEntry"
                  id="garnishInput"
                  placeholder="Garnish"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="ratingWordOneInput">Rating Word One</Label>
                <Input
                  type="text"
                  name="ratingWordOneEntry"
                  id="ratingWordOneInput"
                  placeholder="Rating Word One"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="ratingWordTwoInput">Rating Word Two</Label>
                <Input
                  type="text"
                  name="ratingWordTwoEntry"
                  id="ratingWordTwoInput"
                  placeholder="Rating Word Two"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="scoreInput">Score</Label>
                <Input
                  type="number"
                  name="scoreEntry"
                  id="scoreInput"
                  placeholder="Score"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="notesInput">Notes</Label>
                <Input
                  type="textarea"
                  name="notesEntry"
                  id="notesInput"
                  placeholder="Drink notes here"
                />
              </FormGroup>
            </Col>
            <Button>Submit Drink</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default AddDrinkForm;
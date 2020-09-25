import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import './AddDrinkForm.css';

const initialState = {
  showForm: false,
  peopleNames: [],
  personName: '',
  mainDrink: '',
  drinkType: '',
  brandBrewery: '',
  abv: '',
  hasMixer: false,
  mixerOne: '',
  mixerTwo: '',
  ratingWordOne: '',
  ratingWordTwo: '',
  score: '',
  hasCollab: false,
  collabOne: '',
  collabTwo: '',
  company: '',
  notes: ''
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
      this.setState({ peopleNames: drinkersArray })
      }).catch(error => {
        console.log(error);
      });
  }

  handleFormChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
    console.log(this.state)
  }

  toggleAddFormClass = () => {
    const currentState = this.state.showForm;
    this.setState({ showForm: !currentState });
  };

  toggleHasMixer = () => {
    const currentState = this.state.hasMixer;
    this.setState({ hasMixer: !currentState,
                    mixerOne: '',
                    mixerTwo: ''  });
  };

  toggleHasCollab = () => {
    const currentState = this.state.hasCollab;
    this.setState({ hasCollab: !currentState,
                    collabOne: '',
                    collabTwo: '' });
  };

  validate = (event) => {
    let nam = event.target.name;
  }

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
    }
  }

  render() {
    let drinkerNames = this.state.peopleNames;
    let drinkerNameSelect = drinkerNames.map((name) =>
            <option key={name.drinker} value={name.drinker}>{name.drinker}</option>
        );
        {console.log(this.state)}
    return (
      <div className="addFormContainer">
        <button className="addButton" onClick={this.toggleAddFormClass} >Add Drink</button>
        <Container className={this.state.showForm ?
          'shownAddDrinkForm': 'hiddenAddDrinkForm'}>
          <Form className="addDrinkForm" onSubmit={this.handleSubmit}>
            <Row>
              <div>
                <p>Drink Details:</p>
              </div>
            </Row>
            <Row xs="3">
              <Col>
                <FormGroup className="formGroupQuestion">
                  <Label>Person Name</Label>
                  <Input
                    type="select"
                    name="personName"
                    id="personNameInput"
                    value={this.personName}
                    onChange={this.handleFormChange}
                  >
                  <option className="placeholder" value="">Select Drinker:</option>
                  {drinkerNameSelect}
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="formGroupQuestion">
                  <Label>Drink Type</Label>
                  <Input
                    type="select"
                    name="drinkType"
                    id="drinkTypeInput"
                    placeholder="Select Drink Type"
                    value={this.drinkType}
                    onChange={this.handleFormChange}
                    >
                    <option className="placeholder" value="">Select Drink Type:</option>
                    <option value="beer">Beer</option>
                    <option value="cider">Cider</option>
                    <option value="wine">Wine</option>
                    <option value="fortifiedWine">Fortified Wine</option>
                    <option value="gin">Gin</option>
                    <option value="vodka">Vodka</option>
                    <option value="whiskey">Whisky</option>
                    <option value="rum">Rum</option>
                    <option value="brandy">Brandy</option>
                    <option value="liqueur">Liqueur</option>
                    <option value="softDrink">Soft Drink</option>
                    <option value="other">Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="formGroupQuestion">
                  <Label>Brand or Brewery</Label>
                  <Input
                    type="text"
                    name="brandBrewery"
                    id="brandNameInput"
                    placeholder="Brand or Brewery Name"
                    value={this.state.brandBrewery}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row xs="2">
              <Col>
                <FormGroup className="formGroupQuestion">
                  <Label>Main Drink Component</Label>
                  <Input
                    type="text"
                    name="mainDrink"
                    id="mainDrinkComponentInput"
                    placeholder="Main Drink Component"
                    value={this.state.mainDrink}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
              <Col xs="2">
                <FormGroup className="formGroupQuestion">
                  <Label>ABV(%)</Label>
                  <Input
                    type="number"
                    name="abv"
                    id="abvInput"
                    placeholder="Drink ABV(%)"
                    value={this.state.abv}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row xs="4">
              <Col xs="1">
                <FormGroup check>
                  <Label check>
                  <Input type="checkbox"
                         name="hasMixer"
                         onChange={this.toggleHasMixer}/>
                  Mixer(s)?
                  </Label>
                </FormGroup>
              </Col>
              {this.state.hasMixer &&
              <>
                <Col xs="3">
                  <FormGroup>
                    <div className="mixerQuestion">
                    <Label>Mixer One</Label>
                    <Input
                      type="text"
                      name="mixerOne"
                      id="mixerOneInput"
                      placeholder="Mixer One"
                      value={this.state.mixerOne}
                      onChange={this.handleFormChange}/>
                      </div>
                  </FormGroup>
                </Col>
                <Col xs="3">
                  <FormGroup>
                  <div className="mixerQuestion">
                    <Label>Mixer Two</Label>
                    <Input
                      type="text"
                      name="mixerTwo"
                      id="mixerTwoInput"
                      placeholder="Mixer Two (optional)"
                      value={this.state.mixerTwo}
                      onChange={this.handleFormChange}/>
                      </div>
                  </FormGroup>
                </Col>
              </>
              }
            </Row>
            <Row xs="4">
              <Col xs="3">
                  <FormGroup check>
                    <Label check>
                    <Input type="checkbox"
                          onChange={this.toggleHasCollab} />
                    Collabaratory Brewery(s)?
                    </Label>
                  </FormGroup>
                </Col>
                {this.state.hasCollab &&
                <>
                <Col>
                  <FormGroup>
                    <Label>Collabaratory Brewery One</Label>
                    <Input
                      type="text"
                      name="collabOne"
                      id="collabOneInput"
                      placeholder="First Collab"
                      value={this.state.collabOne}
                      onChange={this.handleFormChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Collabaratory Brewery Two</Label>
                    <Input
                      type="text"
                      name="collabTwo"
                      id="collabTwoInput"
                      placeholder="Second Collab (optional)"
                      value={this.state.collabTwo}
                      onChange={this.handleFormChange}
                    />
                  </FormGroup>
                </Col>
                </>
                }
            </Row>
            <Row xs="3">
              <Col>
                <FormGroup className="formGroupQuestion">
                  <Label>Rating Word One</Label>
                  <Input
                    type="text"
                    name="ratingWordOne"
                    id="ratingWordOneInput"
                    placeholder="Rating Word One"
                    value={this.state.ratingWordOne}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="formGroupQuestion">
                  <Label>Rating Word Two</Label>
                  <Input
                    type="text"
                    name="ratingWordTwo"
                    id="ratingWordTwoInput"
                    placeholder="Rating Word Two"
                    value={this.state.ratingWordTwo}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="formGroupQuestion">
                  <Label>Score</Label>
                  <Input
                    type="number"
                    name="score"
                    id="scoreInput"
                    placeholder="Score"
                    value={this.state.score}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                <FormGroup className="formGroupQuestion">
                  <Label>Company</Label>
                  <Input
                    type="text"
                    name="company"
                    id="companyInput"
                    placeholder="Main Component Company"
                    value={this.state.company}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup className="formGroupQuestion">
                  <Label>Notes</Label>
                  <Input
                    type="textarea"
                    name="notes"
                    id="notesInput"
                    placeholder="Drink notes here"
                    value={this.state.notes}
                    onChange={this.handleFormChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="text-center">
              <Button className="submitButton">Submit Drink</Button>
            </div>
          </Form>
        </Container>
      </div>
    )
  }
}

export default AddDrinkForm;
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
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

  handlePersonName = (newPersonName) => {
    this.setState({ personName: newPersonName })
  }

  handleDrinkType = (newDrinkType) => {
    this.setState({ drinkType: newDrinkType })
  }

  toggleAddFormClass = () => {
    const currentState = this.state.showForm;
    this.setState({ showForm: !currentState });
  };

  toggleHasMixer = () => {
    const currentState = this.state.hasMixer;
    this.setState({ hasMixer: !currentState });
  };

  toggleHasCollab = () => {
    const currentState = this.state.hasCollab;
    this.setState({ hasCollab: !currentState });
  };

  validate = (event) => {
    let nam = event.target.name;
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
            <option key={name.drinker} value={name.drinker}>{name.drinker}</option>
        );

        console.log(drinkerNames)
    return (
      <>
        <h2 onClick={this.toggleAddFormClass} >Add Drink</h2>
        <Container className={this.state.showForm ?
          'shownAddDrinkForm': 'hiddenAddDrinkForm'}>
          <Form inline className="addDrinkForm" onSubmit={this.handleSubmit}>
            <Col>
              <FormGroup>
                <Label for="personNameInput">Person Name</Label>
                <Input
                  type="select"
                  name="personNameEntry"
                  id="personNameInput"
                  value={this.state.personName}
                  onChange={this.handlePersonName}
                >
                <option className="placeholder" value="">Select Drinker:</option>
                {drinkerNameSelect}
                </Input>
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
                  onChange={this.handleDrinkType}
                  value={this.drinkType}
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
              <FormGroup>
                <Label for="brandNameInput">Brand or Brewery</Label>
                <Input
                  type="text"
                  name="brandNameEntry"
                  id="brandNameInput"
                  placeholder="Brand or Brewery Name"
                  value={this.state.brandBrewery}
                />
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
                  value={this.state.mainDrink}
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
                  value={this.state.abv}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check>Mixer(s)?</Label>
                <Input type="checkbox"
                       onChange={this.toggleHasMixer}/>
              </FormGroup>
            </Col>
            <Col className={this.state.hasMixer ? 'showMixerQuestion': 'hideMixerQuestion'}>
              <FormGroup>
                <Label for="mixerOneInput">Mixer One</Label>
                <Input
                  type="text"
                  name="mixerOneEntry"
                  id="mixerOneInput"
                  placeholder="Mixer One"
                  value={this.state.mixerOne}
                />
              </FormGroup>
            </Col>
            <Col className={this.state.hasMixer ? 'showMixerQuestion': 'hideMixerQuestion'}>
              <FormGroup>
                <Label for="mixerTwoInput">Mixer Two</Label>
                <Input
                  type="text"
                  name="mixerTwoEntry"
                  id="mixerTwoInput"
                  placeholder="Mixer Two"
                  value={this.state.mixerTwo}
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
                  value={this.state.ratingWordOne}
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
                  value={this.state.ratingWordTwo}
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
                  value={this.state.score}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup check>
                <Label check>Collabaratory Brewery?</Label>
                <Input type="checkbox"
                       onChange={this.toggleHasCollab} />
              </FormGroup>
            </Col>
            <Col className={this.state.hasCollab ? 'showCollabQuestion': 'hideCollabQuestion'}>
              <FormGroup>
                <Label for="collabOneInput">Collabaratory Brewery One</Label>
                <Input
                  type="text"
                  name="collabOneEntry"
                  id="collabOneInput"
                  placeholder="First Collabaratory Brewery"
                  value={this.state.collabOne}
                />
              </FormGroup>
            </Col>
            <Col className={this.state.hasCollab ? 'showCollabQuestion': 'hideCollabQuestion'}>
              <FormGroup>
                <Label for="collabTwoInput">Collabaratory Brewery Two</Label>
                <Input
                  type="text"
                  name="collabTwoEntry"
                  id="collabTwoInput"
                  placeholder="Second Collabaratory Brewery"
                  value={this.state.collabTwo}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="companyInput">Company</Label>
                <Input
                  type="text"
                  name="companyEntry"
                  id="companyInput"
                  placeholder="Main Component Company"
                  value={this.state.company}
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
                  value={this.state.notes}
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
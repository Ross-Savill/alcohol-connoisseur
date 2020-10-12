import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import PropTypes from 'prop-types';
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
  notes: '',
  filteredOptions: [],
  showMainOptions: false,
  showBrandOptions: false,
  userInput: ''
}

class AddDrinkForm extends Component {

  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

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

  toggleAddFormClass = () => {
    const currentState = this.state.showForm;
    this.setState({ showForm: !currentState });
  };

  handleFormChangeandBrandAutocomplete = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
    const { options } = this.props;
    const userInput = event.currentTarget.value;
    const nonUniquefilteredOptions = options.filter(
      (option) => option.brand.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
    const filteredOptions = [...new Set(nonUniquefilteredOptions.map(
      (option) => (option.brand)))];
    this.setState({
      filteredOptions,
      showBrandOptions: true,
      userInput
    });
  }

  handleFormChangeandMainComponentAutocomplete = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
    const { options } = this.props;
    const userInput = event.currentTarget.value;
    const nonUniquefilteredOptions = options.filter(
      (option) => option.drinkMain.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
    const filteredOptions = [...new Set(nonUniquefilteredOptions.map(
      (option) => (option)
      ))];
    this.setState({
      filteredOptions,
      showMainOptions: true,
      userInput
    });
  }

  onAutocompleteMainClick = (e) => {
    this.setState({
      filteredOption: [],
      showMainOptions: false,
      userInput: e.drinkMain,
      mainDrink: e.drinkMain,
      brandBrewery: e.brand,
      abv: e.abv,
      company: e.company
    });
    if(e.mixerOne) {
      this.setState({ hasMixer: true, mixerOne: e.mixerOne, mixerTwo: e.mixerTwo })
    } else {
      this.setState({ hasMixer: false, mixerOne: '', mixerTwo: '' })
    }
    if(e.collabOne) {
      this.setState({ hasCollab: true, collabOne: e.collabOne, collabTwo: e.collabTwo })
    } else {
      this.setState({ hasCollab: false, collabOne: '', collabTwo: '' })
    }
  };

  onAutocompleteBrandClick = (e) => {
    this.setState({
      filteredOption: [],
      showBrandOptions: false,
      userInput: e.currentTarget.innerText,
      brandBrewery: e.currentTarget.innerText
    });
  };

  handleFormChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  toggleHasMixer = () => {
    const currentState = this.state.hasMixer;
    this.setState({ hasMixer: !currentState, mixerOne: '', mixerTwo: ''  });
  };

  toggleHasCollab = () => {
    const currentState = this.state.hasCollab;
    this.setState({ hasCollab: !currentState, collabOne: '', collabTwo: '' });
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
    const { state: { filteredOptions, showMainOptions, showBrandOptions, userInput }} = this;

    let brandOptionList;
    let mainOptionList;

    if (showMainOptions && userInput) {
      if (filteredOptions.length) {
        mainOptionList = (
          <ul className="options">
            {filteredOptions.map((optionChoice, index) => {
              let className;
              if(!optionChoice.mixerOne) {
                return (
                  <li className={className} key={index} onClick={() => this.onAutocompleteMainClick(optionChoice)}>
                    <p>{optionChoice.drinkMain}</p>
                  </li>
                )
              } else if(!optionChoice.mixerTwo) {
                return (
                  <li className={className} key={index} onClick={() => this.onAutocompleteMainClick(optionChoice)}>
                    <p>{optionChoice.drinkMain} WITH <span className="mixerOneAutocompleteLine">{optionChoice.mixerOne}</span></p>
                  </li>
                )
              } else {
                return (
                  <li className={className} key={index} onClick={() => this.onAutocompleteMainClick(optionChoice)}>
                    <p>{optionChoice.drinkMain} WITH {optionChoice.mixerOne} AND {optionChoice.mixerTwo}</p>
                  </li>
                )
              }
            })}
          </ul>
        );
      }
    }

    if (showBrandOptions && userInput) {
      if (filteredOptions.length) {
        brandOptionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              return (
                <li className={className} key={index} onClick={this.onAutocompleteBrandClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    console.log(this.state.drinkType)
    return (
      <div>
        <div className="buttonDiv">
          <button className="addButton" onClick={this.toggleAddFormClass} >Add Drink</button>
        </div>
          <div className="addFormContainer">
            <Container className={this.state.showForm ?
              'shownAddDrinkForm': 'hiddenAddDrinkForm'}>
              <Form className="addDrinkForm" onSubmit={this.handleSubmit}>
                <Row className="addDrinkTitle">
                  <div>
                    <p>Drink Details:</p>
                  </div>
                </Row>
                <Row xs="3">
                  <Col>
                    <FormGroup className="formGroupQuestion">
                      <Label className="questionLabel">Person Name</Label>
                      <Input
                        type="select"
                        name="personName"
                        id="personNameInput"
                        value={this.personName}
                        onChange={this.handleFormChange}
                        className="questionInputTopRow"
                      >
                      <option className="placeholder" value="">Select Drinker:</option>
                      {drinkerNameSelect}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup className="formGroupQuestion">
                      <Label className="questionLabel">Drink Type</Label>
                      <Input
                        type="select"
                        name="drinkType"
                        id="drinkTypeInput"
                        value={this.drinkType}
                        onChange={this.handleFormChange}
                        className="questionInputTopRow"
                        >
                        <option className="placeholder" value="">Select Drink Type:</option>
                        <option value="Beer">Beer</option>
                        <option value="Cider">Cider</option>
                        <option value="Wine">Wine</option>
                        <option value="Fortified Wine">Fortified Wine</option>
                        <option value="Gin">Gin</option>
                        <option value="Vodka">Vodka</option>
                        <option value="Whiskey">Whisky</option>
                        <option value="Rum">Rum</option>
                        <option value="Brandy">Brandy</option>
                        <option value="Liqueur">Liqueur</option>
                        <option value="Soft Drink">Soft Drink</option>
                        <option value="Other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Main Drink Component</Label>
                          <Input
                            type="text"
                            name="mainDrink"
                            id="mainDrinkComponentInput"
                            placeholder="Main Drink Component"
                            value={this.state.mainDrink}
                            onKeyDown={this.browseOrSelectOptions}
                            onChange={this.handleFormChangeandMainComponentAutocomplete}
                            className="questionInputSecondRow"
                          />
                        </FormGroup>
                  </Col>
                  {mainOptionList}
                </Row>
                {this.state.personName && this.state.drinkType && this.state.mainDrink &&
                  <>
                    <Row xs="3">
                      <Col>
                        <FormGroup className="formGroupQuestion">
                      <Label className="questionLabel">Brand or Brewery</Label>
                      <Input
                        type="text"
                        name="brandBrewery"
                        id="brandNameInput"
                        placeholder="Brand or Brewery Name"
                        value={this.state.brandBrewery}
                        onKeyDown={this.browseOrSelectOptions}
                        onChange={this.handleFormChangeandBrandAutocomplete}
                        className="questionInputTopRow"
                      />
                    </FormGroup>
                      </Col>
                      {brandOptionList}
                      <Col xs="2">
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">ABV(%)</Label>
                          <Input
                            type="number"
                            name="abv"
                            id="abvInput"
                            placeholder="Drink ABV(%)"
                            value={this.state.abv}
                            onChange={this.handleFormChange}
                            className="questionInputSecondRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="4.5" className="questionInputCheckboxes">
                        <FormGroup className="mixerCheck">
                          <Label check>
                          <Input type="checkbox"
                                 name="hasMixer"
                                 onChange={this.toggleHasMixer}
                                 checked={this.state.hasMixer}
                                />
                          Mixer(s)?
                          </Label>
                        </FormGroup>
                        <FormGroup check className="collabCheck">
                            <Label check>
                            <Input type="checkbox"
                                  onChange={this.toggleHasCollab}
                                  className="questionInput"
                                  checked={this.state.hasCollab}
                                  />
                            Collabaratory Brewery(s)?
                            </Label>
                          </FormGroup>
                      </Col>
                    </Row>
                    <Row xs="4">
                      {this.state.hasMixer &&
                      <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                            <Label className="questionLabel">Mixer One</Label>
                            <Input
                              type="text"
                              name="mixerOne"
                              id="mixerOneInput"
                              placeholder="Mixer One"
                              value={this.state.mixerOne}
                              onChange={this.handleFormChange}
                              className="questionInput"/>
                              </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Label className="questionLabel">Mixer Two</Label>
                              <Input
                                type="text"
                                name="mixerTwo"
                                id="mixerTwoInput"
                                placeholder="Mixer Two (optional)"
                                value={this.state.mixerTwo}
                                onChange={this.handleFormChange}
                                className="questionInput"/>
                            </div>
                          </FormGroup>
                        </Col>
                      </>
                      }
                    </Row>
                    <Row xs="4">
                        {this.state.hasCollab &&
                        <>
                        <Col>
                          <FormGroup>
                            <div className="collabQuestion">
                              <Label className="questionLabel">Collabaratory Brewery One</Label>
                              <Input
                                type="text"
                                name="collabOne"
                                id="collabOneInput"
                                placeholder="First Collab"
                                value={this.state.collabOne}
                                onChange={this.handleFormChange}
                                className="questionInput"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <div className="collabQuestion">
                              <Label className="questionLabel">Collabaratory Brewery Two</Label>
                              <Input
                                type="text"
                                name="collabTwo"
                                id="collabTwoInput"
                                placeholder="Second Collab (optional)"
                                value={this.state.collabTwo}
                                onChange={this.handleFormChange}
                                className="questionInput"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        </>
                        }
                    </Row>
                    <Row xs="3">
                      <Col>
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Rating Word One</Label>
                          <Input
                            type="text"
                            name="ratingWordOne"
                            id="ratingWordOneInput"
                            placeholder="Rating Word One"
                            value={this.state.ratingWordOne}
                            onChange={this.handleFormChange}
                            className="questionInputThirdRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Rating Word Two</Label>
                          <Input
                            type="text"
                            name="ratingWordTwo"
                            id="ratingWordTwoInput"
                            placeholder="Rating Word Two"
                            value={this.state.ratingWordTwo}
                            onChange={this.handleFormChange}
                            className="questionInputThirdRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Score</Label>
                          <Input
                            type="number"
                            name="score"
                            id="scoreInput"
                            placeholder="Score"
                            value={this.state.score}
                            onChange={this.handleFormChange}
                            className="questionInputThirdRow"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="4">
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Company</Label>
                          <Input
                            type="text"
                            name="company"
                            id="companyInput"
                            placeholder="Main Component Company"
                            value={this.state.company}
                            onChange={this.handleFormChange}
                            className="questionInputBottomRow"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup className="formGroupQuestion">
                          <Label className="questionLabel">Notes</Label>
                          <Input
                            type="textarea"
                            name="notes"
                            id="notesInput"
                            placeholder="Drink notes here"
                            value={this.state.notes}
                            onChange={this.handleFormChange}
                            className="questionInputBottomRow"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button className="submitButton">Submit Drink</Button>
                    </div>
                  </>
                }
              </Form>
            </Container>
          </div>
      </div>
    )
  }
}

export default AddDrinkForm;
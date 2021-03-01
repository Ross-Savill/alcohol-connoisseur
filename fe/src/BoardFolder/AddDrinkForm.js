import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import '../Stylesheets/BoardFolder/AddDrinkForm.css';

const initialState = {
  peopleNameObjs: [],
  drinkTypeObjs:[],
  personName: '',
  mainDrink: '',
  drinkType: '',
  abv: '',
  company: '',
  country: '',
  ukUsa: '',
  hasMixer: false,
  mixerOne: '',
  mixerOneBrand: '',
  mixerTwo: '',
  mixerTwoBrand: '',
  mixerThree: '',
  mixerThreeBrand: '',
  mixerFour: '',
  mixerFourBrand: '',
  mixerFive: '',
  mixerFiveBrand: '',
  mixerSix: '',
  mixerSixBrand: '',
  ratingWordOne: '',
  ratingWordTwo: '',
  score: '',
  hasCollab: false,
  firstCollabCompany: '',
  firstCollabCountry: '',
  firstUkUsa: '',
  secondCollabCompany: '',
  secondCollabCountry : '',
  secondUkUsa: '',
  notes: '',
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
}

class AddDrinkForm extends Component {

  constructor(props) {
    super(props)
    this.state = initialState;
  };

  componentDidMount() {
    let peopleNameObjs = [];
    let drinkTypeObjs = [];
    this.props.drinkers.map((drinkerObj) => {
      peopleNameObjs.push(drinkerObj)
    })
    this.props.drinkTypes.map((drinkTypeObj) => {
      drinkTypeObjs.push((drinkTypeObj))
    })
    const sortedDrinkTypes = drinkTypeObjs.sort()
    this.setState({ peopleNameObjs, drinkTypeObjs: sortedDrinkTypes })
  }

  // HANDLE THE MAIN COMPONENT SUGGESTIONS DROPDOWN
  handleFormChangeandMainComponentAutocomplete = (e) => {
    const { target: { name, value } } = e
    const userInput = e.currentTarget.value;
    const filteredSuggestions = this.props.drinks.filter(
      suggestion => suggestion.drinkMain.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      [name]: value
    });
  }

  // RESET SUGGESTIONS STATE WHEN CLICKED A SUGGESTION
  onSuggestionClick = e => {
    console.log(e)
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      mainDrink: e.currentTarget.innerText
    });
  };

  // HANDLE CYCLING THROUGH SUGGESTIONS
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // if clicked enter to select suggestion
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      // if clicking up, do nothing if at top of list
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index unless at end of list
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  onAutocompleteMainClick = (e) => {
    this.setState({
      filteredOption: [],
      showMainOptions: false,
      userInput: e.drinkMain,
      mainDrink: e.drinkMain,
      abv: e.abv*100,
      company: e.company
    });
    if(e.collabOne) {
      this.setState({ hasCollab: true, collabOne: e.collabOne, collabTwo: e.collabTwo })
    } else {
      this.setState({ hasCollab: false, collabOne: '', collabTwo: '' })
    }
  };

  handleFormChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  toggleHasMixer = () => {
    const currentState = this.state.hasMixer;
    this.setState({ hasMixer: !currentState,
                    mixerOne: '', mixerOneBrand: '',
                    mixerTwo: '', mixerTwoBrand: '',
                    mixerThree: '', mixerThreeBrand: '',
                    mixerFour: '', mixerFourBrand: '',
                    mixerFive: '', mixerFiveBrand: '',
                    mixerSix: '', mixerSixBrand: ''
                 });
  };

  toggleHasCollab = () => {
    const currentState = this.state.hasCollab;
    this.setState({ hasCollab: !currentState, collabOne: '', collabTwo: '' });
  };

  handleCancel = (e) => {
    this.state = initialState;
    if(e.target.classList.contains('addFormDiv') || e.target.classList.contains('addFormContainer')) {
      this.props.setDisplayAddForm(false)
    }
  }

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

    // START OF AUTOCOMPLETE CODE

    const {
      handleFormChangeandMainComponentAutocomplete,
      onSuggestionClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        mainDrink
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && mainDrink) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={onSuggestionClick}>
                  {suggestion.drinkMain}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    // END OF AUTO COMPLETE CODE

    const drinkerNames = this.state.peopleNameObjs;
    const drinkTypes = this.state.drinkTypeObjs
    const drinkerNameSelect = drinkerNames.map((name) =>
      <option key={name.personName} value={name.personName}>{name.personName}</option>
    );
    const drinkTypeSelect = drinkTypes.map((drinkType) =>
      <option key={drinkType.drinkType} value={drinkType.drinkType}>{drinkType.drinkType}</option>
    )

    return (
      <div className="addFormDiv" onClick={(e) => this.handleCancel(e) }>
        <Container className="addFormContainer">
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
                    {drinkTypeSelect}
                  </Input>
                </FormGroup>
              </Col>
              </Row>
              <Row xs="1">
                {/* <Col> */}
                  <FormGroup className="formGroupQuestion">
                    <Label className="questionLabel">Main Drink Component</Label>
                    <Input
                      type="text"
                      name="mainDrink"
                      id="mainDrinkComponentInput"
                      placeholder="Main Drink Component"
                      value={mainDrink}
                      onKeyDown={onKeyDown}
                      onChange={handleFormChangeandMainComponentAutocomplete}
                      className="questionInputSecondRow"
                    />
                  </FormGroup>
                {/* </Col> */}
              {suggestionsListComponent}
            </Row>
              <>
                <Row xs="3">
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
          </Form>
        </Container>
      </div>
    )
  }
}

export default AddDrinkForm;
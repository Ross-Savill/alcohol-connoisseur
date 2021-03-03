import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../Stylesheets/BoardFolder/AddDrinkForm.css';
import LoadingSpin from '../MyUtilitiesFolder/LoadingSpin';
import { USStateList } from '../MapFolder/USFolder/USStateList';
const  countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

class AddDrinkForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      peopleNameObjs: [],
      drinkTypeObjs:[],
      personName: '',
      mainDrink: '',
      drinkType: '',
      abv: '',
      company: '',
      country: '',
      ukUsa: '',
      hasMixer: "",
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
    this.setState({ peopleNameObjs, drinkTypeObjs })
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

  // RESET SUGGESTIONS STATE WHEN CLICKED A SUGGESTION AND ADD DRINK DETAILS TO STATE
  onSuggestionClick = chosenDrink => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      mainDrink: chosenDrink.drinkMain,
      drinkType: chosenDrink.drinkType,
      abv: (chosenDrink.abv*100).toFixed(1),
      company: chosenDrink.company,
      country: chosenDrink.country,
      ukUsa: chosenDrink.ukUsa,
    });
    if(chosenDrink.firstCollabCompany) {
      this.setState({
        hasCollab: true,
        firstCollabCompany: chosenDrink.firstCollabCompany,
        secondCollabCompany: chosenDrink.secondCollabCompany,
        firstCollabCountry: chosenDrink.firstCollabCountry,
        secondCollabCountry: chosenDrink.secondCollabCountry,
        firstUkUsa: chosenDrink.firstUkUsa,
        secondUkUsa: chosenDrink.secondUkUsa
      })
    }
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

  handleFormChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  handleFormChangeCountryUpdate = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })

    if(name === "country" && (value !== "GB" || value !== "US")) {
      this.setState({ ukUsa: "" })
    }
    if(name === "firstCollabCountry" && (value !== "GB" || value !== "US")) {
      this.setState({ firstUkUsa: "" })
    }
    if(name === "secondCollabCountry" && (value !== "GB" || value !== "US")) {
      this.setState({ secondUkUsa: "" })
    }
  }

  toggleHasMixer = (e) => {
    this.setState({ hasMixer: e.target.value,
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
    this.setState({ hasCollab: !currentState,
                    firstCollabCompany: '', secondCollabCompany: '',
                    firstCollabCountry: '', secondCollabCountry: '',
                    firstUkUsa: '', secondUkUsa: ''
                  });
  };

  handleCancel = (e) => {
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
    if(!this.state.peopleNameObjs) {
      return <LoadingSpin />
    }

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
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={() => onSuggestionClick(suggestion)}>
                  {suggestion.drinkMain} ({(suggestion.abv*100).toFixed(1)}%)
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
    const countryList = countries.getNames("en", {select: "official"})
    const countryOptionsSelect = [];
    for (let [code, countryName] of Object.entries(countryList)) {
      if(code === "GB" || code === "CA" || code === "US") {
        countryOptionsSelect.unshift(
          <option key={code} value={code}>{countryName}</option>
        )
      } else {
        countryOptionsSelect.push(
          <option key={code} value={code}>{countryName}</option>
        )
      }
    }

    const usStateOptionsSelect = [];
    usStateOptionsSelect.push(<option value="">Select State:</option>)
    for (const [regionCode, fullRegionName] of Object.entries(USStateList)) {
      usStateOptionsSelect.push(
        <option key={regionCode} value={regionCode}>{fullRegionName}</option>
      )
    }
    const britishCountrySelect = [
        <option value="">Select GB Country:</option>,
        <option value="ENG">England</option>,
        <option value="SCT">Scotland</option>,
        <option value="WLS">Wales</option>,
        <option value="NIR">Northern Ireland</option>
      ]

      console.log(this.state.firstUkUsa)
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
              <Col xs="4">
                <FormGroup className="formGroupQuestion">
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
              <Col xs="4">
                <FormGroup className="formGroupQuestion">
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
              <Col xs="4">
                <FormGroup className="formGroupQuestion">
                  <Input
                    type="number"
                    name="abv"
                    id="abvInput"
                    placeholder="Drink ABV(%)"
                    value={this.state.abv}
                    onChange={this.handleFormChange}
                    className="middleInputField"
                  />
                </FormGroup>
                </Col>
              </Row>
              <Row xs="2">
                <Col xs="9">
                  <FormGroup className="formGroupQuestion">
                    <Input
                      type="text"
                      name="mainDrink"
                      id="mainDrinkComponentInput"
                      placeholder="Main Drink Component"
                      value={mainDrink}
                      onKeyDown={onKeyDown}
                      onChange={handleFormChangeandMainComponentAutocomplete}
                      className="middleInputField"
                    />
                  </FormGroup>
                  {suggestionsListComponent}
                </Col>
                <Col xs="3" className="mixerSelectQuestion">
                  <FormGroup className="mixerSelect">
                    <Input type="select"
                          name="hasMixer"
                          onChange={this.toggleHasMixer}
                          className="middleInputField"
                    >
                      <option key={0} value={0}>Select Mixer Number</option>
                      <option key={1} value={1}>One Mixer</option>
                      <option key={2} value={2}>Two Mixers</option>
                      <option key={3} value={3}>Three Mixers</option>
                      <option key={4} value={4}>Four Mixers</option>
                      <option key={5} value={5}>Five Mixers</option>
                      <option key={6} value={6}>Six Mixers</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
                <>
                  <Row xs="4">
                  { this.state.hasMixer > 0 &&
                      <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerOneBrand"
                                id="mixerOneBrandInput"
                                placeholder="Mixer One Brand"
                                value={this.state.mixerOneBrand}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                              </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerOne"
                                id="mixerOneInput"
                                placeholder="Mixer One"
                                value={this.state.mixerOne}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                              </div>
                          </FormGroup>
                        </Col>
                      </>
                    }
                    { this.state.hasMixer > 1 &&
                      <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerTwoBrand"
                                id="mixerTwoBrandInput"
                                placeholder="Mixer Two Brand"
                                value={this.state.mixerTwoBrand}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerTwo"
                                id="mixerTwoInput"
                                placeholder="Mixer Two"
                                value={this.state.mixerTwo}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                            </div>
                          </FormGroup>
                        </Col>
                        </>
                      }
                      </Row>
                      <Row xs="4">
                    { this.state.hasMixer > 2 &&
                    <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerThreeBrand"
                                id="mixerThreeBrandInput"
                                placeholder="Mixer Three Brand"
                                value={this.state.mixerThreeBrand}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                              </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerThree"
                                id="mixerThreeInput"
                                placeholder="Mixer Three"
                                value={this.state.mixerThree}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                              </div>
                          </FormGroup>
                        </Col>
                      </>
                    }
                    { this.state.hasMixer > 3 &&
                    <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerFourBrand"
                                id="mixerFourBrandInput"
                                placeholder="Mixer Four Brand"
                                value={this.state.mixerFourBrand}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerFour"
                                id="mixerFourInput"
                                placeholder="Mixer Four"
                                value={this.state.mixerFour}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                            </div>
                          </FormGroup>
                        </Col>
                        </>
                      }
                      </Row>
                      <Row xs="4">
                    {this.state.hasMixer > 4 &&
                    <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerFiveBrand"
                                id="mixerFiveBrandInput"
                                placeholder="Mixer Five Brand"
                                value={this.state.mixerFiveBrand}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                              </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerFive"
                                id="mixerFiveInput"
                                placeholder="Mixer Five"
                                value={this.state.mixerFive}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                              </div>
                          </FormGroup>
                        </Col>
                        </>
                    }
                    { this.state.hasMixer > 5 &&
                    <>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerSixBrand"
                                id="mixerSixBrandInput"
                                placeholder="Mixer Six Brand"
                                value={this.state.mixerSixBrand}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
                            <div className="mixerQuestion">
                              <Input
                                type="text"
                                name="mixerSix"
                                id="mixerSixInput"
                                placeholder="Mixer Six"
                                value={this.state.mixerSix}
                                onChange={this.handleFormChange}
                                className="middleInputField"/>
                            </div>
                          </FormGroup>
                        </Col>
                        </>
                      }
                      </Row>
                  </>
                <Row>
                  <Col xs="4">
                    <FormGroup className="formGroupQuestion">
                      <Input
                        type="text"
                        name="company"
                        id="companyInput"
                        placeholder="Main Component Company"
                        value={this.state.company}
                        onChange={this.handleFormChange}
                        className="middleInputField"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup className="formGroupQuestion">
                      <Input
                        type="select"
                        name="country"
                        id="countryInput"
                        value={this.state.country}
                        onChange={this.handleFormChangeCountryUpdate}
                        className="middleInputField"
                      >
                      <option value="">Select Country:</option>
                      {countryOptionsSelect}
                      </Input>
                    </FormGroup>
                  </Col>
                  { this.state.country === "GB" &&
                    <Col xs="4">
                      <FormGroup className="formGroupQuestion">
                        <Input
                          type="select"
                          name="ukUsa"
                          id="ukUsaInput"
                          value={this.state.ukUsa}
                          onChange={this.handleFormChange}
                          className="middleInputField"
                        >
                          {britishCountrySelect}
                        </Input>
                      </FormGroup>
                    </Col>
                  }
                  { this.state.country === "US" &&
                    <Col xs="4">
                      <FormGroup className="formGroupQuestion">
                        <Input
                          type="select"
                          name="ukUsa"
                          id="ukUsaInput"
                          value={this.state.ukUsa}
                          onChange={this.handleFormChange}
                          className="middleInputField"
                        >
                          {usStateOptionsSelect}
                        </Input>
                      </FormGroup>
                    </Col>
                  }
                </Row>
                <Row>
                  <Col>
                    <FormGroup check className="collabCheck">
                      <Label check>
                      <Input type="checkbox"
                             name="hasCollab"
                             onChange={this.toggleHasCollab}
                             className="middleInputField"
                             checked={this.state.hasCollab}
                      />
                      Collabaratory Brewery(s)?
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.hasCollab &&
                <>
                  <Row xs="3">
                      <Col>
                        <FormGroup>
                          <div className="collabQuestion">
                            <Label className="questionLabel">First Collabaratory Company</Label>
                            <Input
                              type="text"
                              name="firstCollabCompany"
                              id="collabOneInput"
                              placeholder="First Collab"
                              value={this.state.firstCollabCompany}
                              onChange={this.handleFormChange}
                              className="middleInputField"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <div className="collabQuestion">
                            <Label className="questionLabel">First Collab Country</Label>
                            <Input
                              type="select"
                              name="firstCollabCountry"
                              id="collabOneCountryInput"
                              value={this.state.firstCollabCountry}
                              onChange={this.handleFormChangeCountryUpdate}
                              className="middleInputField"
                            >
                              <option value="">Select Country:</option>
                              {countryOptionsSelect}
                            </Input>
                          </div>
                        </FormGroup>
                      </Col>
                      { this.state.firstCollabCountry === "GB" &&
                        <Col>
                          <FormGroup>
                            <div className="collabQuestion">
                              <Label className="questionLabel">First Collab GB Country</Label>
                              <Input
                                type="select"
                                name="firstUkUsa"
                                id="collabOneGBCountryInput"
                                value={this.state.firstUkUsa}
                                onChange={this.handleFormChange}
                                className="middleInputField"
                                >
                                {britishCountrySelect}
                              </Input>
                            </div>
                          </FormGroup>
                        </Col>
                      }
                      { this.state.firstCollabCountry === "US" &&
                        <Col xs="4">
                          <FormGroup className="formGroupQuestion">
                            <Input
                              type="select"
                              name="firstUkUsa"
                              id="collabOneUSStateInput"
                              value={this.state.firstUkUsa}
                              onChange={this.handleFormChange}
                              className="middleInputField"
                            >
                              {usStateOptionsSelect}
                            </Input>
                          </FormGroup>
                        </Col>
                      }
                    </Row>
                    <Row xs="3">
                      <Col>
                        <FormGroup>
                          <div className="collabQuestion">
                            <Label className="questionLabel">Second Collabaratory Company</Label>
                            <Input
                              type="text"
                              name="secondCollabCompany"
                              id="collabTwoInput"
                              placeholder="Second Collab Company (Optional)"
                              value={this.state.secondCollabCompany}
                              onChange={this.handleFormChange}
                              className="questionInput"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <div className="collabQuestion">
                            <Label className="questionLabel">Second Collab Country</Label>
                            <Input
                              type="select"
                              name="secondCollabCountry"
                              id="collabTwoCountryInput"
                              value={this.state.secondCollabCountry}
                              onChange={this.handleFormChangeCountryUpdate}
                              className="questionInput"
                            >
                              <option value="">Select Country:</option>
                              {countryOptionsSelect}
                            </Input>
                          </div>
                        </FormGroup>
                      </Col>
                      { this.state.secondCollabCountry === "GB" &&
                        <Col>
                          <FormGroup>
                            <div className="collabQuestion">
                              <Label className="questionLabel">Second Collab GB Country</Label>
                              <Input
                                type="select"
                                name="secondUkUsa"
                                id="collabTwoGBCountryInput"
                                value={this.state.secondUkUsa}
                                onChange={this.handleFormChange}
                                className="questionInput"
                              >
                              {britishCountrySelect}
                              </Input>
                            </div>
                          </FormGroup>
                        </Col>
                      }
                      { this.state.secondCollabCountry === "US" &&
                        <Col xs="4">
                          <FormGroup className="formGroupQuestion">
                            <Input
                              type="select"
                              name="secondUkUsa"
                              id="collabTwoUSStateInput"
                              value={this.state.secondUkUsa}
                              onChange={this.handleFormChange}
                              className="middleInputField"
                            >
                              {usStateOptionsSelect}
                            </Input>
                          </FormGroup>
                        </Col>
                      }
                  </Row>
                </>
                }
                <Row xs="3">
                  <Col>
                    <FormGroup className="formGroupQuestion">
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
                  <Col xs="2">
                    <FormGroup className="formGroupQuestion">
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
                  <Col xs="6">
                    <FormGroup className="formGroupQuestion">
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
          </Form>
        </Container>
      </div>
    )
  }
}

export default AddDrinkForm;
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
      sessionId: "",
      personName: '',
      drinkMain: '',
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
      confirmed: false
    }
  };

  componentDidMount() {
    const { drinkers, drinkTypes, drinkToEdit } = this.props
    if(drinkers && drinkTypes ) {
      this.setState({ peopleNameObjs: this.props.drinkers, drinkTypeObjs: this.props.drinkTypes })
    }
    if(drinkToEdit) {

      if(drinkToEdit.drink.mixerSix) {
        this.setState({ hasMixer: "6"})
      } else if(drinkToEdit.drink.mixerFive) {
        this.setState({ hasMixer: "5"})
      } else if(drinkToEdit.drink.mixerFour) {
        this.setState({ hasMixer: "4"})
      } else if(drinkToEdit.drink.mixerThree) {
        this.setState({ hasMixer: "3"})
      } else if(drinkToEdit.drink.mixerTwo) {
        this.setState({ hasMixer: "2"})
      } else if(drinkToEdit.drink.mixerOne) {
        this.setState({ hasMixer: "1"})
      }

      if(drinkToEdit.drink.firstCollabCompany) {
        this.setState({ hasCollab: true })
      }

      this.setState({
        personName: drinkToEdit.drink.name,
        company: drinkToEdit.drink.company,
        country: drinkToEdit.drink.country,
        ukUsa: drinkToEdit.drink.ukUsa,
        firstCollabCompany: drinkToEdit.drink.firstCollabCompany,
        firstCollabCountry: drinkToEdit.drink.firstCollabCountry,
        firstUkUsa: drinkToEdit.drink.firstUkUsa,
        secondCollabCompany: drinkToEdit.drink.secondCollabCompany,
        secondCollabCountry: drinkToEdit.drink.secondCollabCountry,
        secondUkUsa: drinkToEdit.drink.secondUkUsa,
        drinkMain: drinkToEdit.drink.drinkMain,
        drinkType: drinkToEdit.drink.drinkType,
        abv: drinkToEdit.drink.abv * 100,
        mixerOneBrand: drinkToEdit.drink.mixerOneBrand,
        mixerOne: drinkToEdit.drink.mixerOne,
        mixerTwoBrand: drinkToEdit.drink.mixerTwoBrand,
        mixerTwo: drinkToEdit.drink.mixerTwo,
        mixerThreeBrand: drinkToEdit.drink.mixerThreeBrand,
        mixerThree: drinkToEdit.drink.mixerThree,
        mixerFourBrand: drinkToEdit.drink.mixerFourBrand,
        mixerFour: drinkToEdit.drink.mixerFour,
        mixerFiveBrand: drinkToEdit.drink.mixerFiveBrand,
        mixerFive: drinkToEdit.drink.mixerFive,
        mixerSixBrand: drinkToEdit.drink.mixerSixBrand,
        mixerSix: drinkToEdit.drink.mixerSix,
        ratingWordOne: drinkToEdit.drink.ratingWordOne,
        ratingWordTwo: drinkToEdit.drink.ratingWordTwo,
        score: drinkToEdit.drink.score,
        notes: drinkToEdit.drink.notes
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.drinkers !== this.state.peopleNameObjs ||
       this.props.drinkTypes !== this.state.drinkTypeObjs) {
        this.setState({ peopleNameObjs: this.props.drinkers, drinkTypeObjs: this.props.drinkTypes })
      }
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
      drinkMain: chosenDrink.drinkMain,
      drinkType: chosenDrink.drinkType,
      abv: (chosenDrink.abv).toFixed(1),
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

  // validate = (event) => {
  //   let nam = event.target.name;
  // }

  handleSubmit = async event => {
    event.preventDefault();
    // const isValid = this.validate();
    // if (isValid) {
    // }

    let drinkDate;
    if(this.state.ratingWordOne && this.state.ratingWordTwo && this.state.score) {
      drinkDate = new Date()
    } else {
      drinkDate = "";
    }

    const neworEditedDrink = {
      sessionId: this.state.sessionId,
      name: this.state.personName,
      date: drinkDate,
      company: this.state.company,
      country: this.state.country,
      ukUsa: this.state.ukUsa,
      firstCollabCompany: this.state.firstCollabCompany,
      firstCollabCountry: this.state.firstCollabCountry,
      firstUkUsa: this.state.firstUkUsa,
      secondCollabCompany: this.state.secondCollabCompany,
      secondCollabCountry: this.state.secondCollabCountry,
      secondUkUsa: this.state.secondUkUsa,
      drinkMain: this.state.drinkMain,
      drinkType: this.state.drinkType,
      abv: this.state.abv / 100,
      mixerOneBrand: this.state.mixerOneBrand,
      mixerOne: this.state.mixerOne,
      mixerTwoBrand: this.state.mixerTwoBrand,
      mixerTwo: this.state.mixerTwo,
      mixerThreeBrand: this.state.mixerThreeBrand,
      mixerThree: this.state.mixerThree,
      mixerFourBrand: this.state.mixerFourBrand,
      mixerFour: this.state.mixerFour,
      mixerFiveBrand: this.state.mixerFiveBrand,
      mixerFive: this.state.mixerFive,
      mixerSixBrand: this.state.mixerSixBrand,
      mixerSix: this.state.mixerSix,
      ratingWordOne: this.state.ratingWordOne,
      ratingWordTwo: this.state.ratingWordTwo,
      score: this.state.score,
      notes: this.state.notes,
      confirmed: false
    }

    if(this.props.drinkToEdit) {
      // POST NEW DRINK
      this.props.addDrinkToBoard(neworEditedDrink)
      this.props.setDisplayAddForm(false)

      // UPDATE EXISTING DRINK
      this.props.editDrinkOnBoard(neworEditedDrink)
      this.props.setDisplayAddForm(false)
    }
  }

  render() {
    if(!this.state.peopleNameObjs || !this.props.drinkers) {
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
        drinkMain
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && drinkMain) {
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
          <div className="no-suggestions">
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
    usStateOptionsSelect.push(<option key="emptyState" value="">Select State:</option>)
    for (const [regionCode, fullRegionName] of Object.entries(USStateList)) {
      usStateOptionsSelect.push(
        <option key={regionCode} value={regionCode}>{fullRegionName}</option>
      )
    }
    const britishCountrySelect = [
      <option key="NIL" value="">Select GB Country:</option>,
      <option key="ENG" value="ENG">England</option>,
      <option key="SCT" value="SCT">Scotland</option>,
      <option key="WLS" value="WLS">Wales</option>,
      <option key="NIR" value="NIR">Northern Ireland</option>
    ]

    if(this.state.sessionId === "" && this.props.drinks) {
      const uniqueSessionIds = new Set()
      this.props.drinks.forEach((drink) => {
        if(drink.confirmed === true) {
          uniqueSessionIds.add(drink.sessionId)
        }
      })
      this.setState({ sessionId: uniqueSessionIds.size + 1 })
    }

    return (
      <div className="addFormDiv" onClick={(e) => this.handleCancel(e) }>
        <Container className="addFormContainer">
          <Form className="addDrinkForm" onSubmit={this.handleSubmit}>
            <Row className="addDrinkTitle">
              <h3 className="mainFormHeader">🍺🍺🍺 🍺🍺🍺 Drink Details: 🍺🍺🍺 🍺🍺🍺</h3>
              <p className="sessionNumberPtag">Session Number {this.state.sessionId}</p>
            </Row>
          <div className="mainDrinkInfoArea">
            <h4 className="mainDrinkInfoAreaHeader">Standard Required Data</h4>
            <Row xs="3">
              <Col xs="4">
                <FormGroup className="formGroupQuestion">
                  <Input
                    type="select"
                    name="personName"
                    id="personNameInput"
                    value={this.state.personName}
                    onChange={this.handleFormChange}
                    className={this.state.personName === "" ? "dataNeeded" : "inputField"}
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
                    value={this.state.drinkType}
                    onChange={this.handleFormChange}
                    className={this.state.drinkType === "" ? "dataNeeded" : "inputField"}
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
                    className={this.state.abv === "" ? "dataNeeded" : "inputField"}
                  />
                </FormGroup>
                </Col>
              </Row>
              <Row xs="2">
                <Col xs="9">
                  <FormGroup className="formGroupQuestion">
                    <Input
                      type="text"
                      name="drinkMain"
                      id="mainDrinkComponentInput"
                      placeholder="Main Drink Component"
                      value={drinkMain}
                      onKeyDown={onKeyDown}
                      onChange={handleFormChangeandMainComponentAutocomplete}
                      className={this.state.drinkMain === "" ? "dataNeeded" : "inputField"}
                    />
                  </FormGroup>
                  {suggestionsListComponent}
                </Col>
                <Col xs="2" className="mixerSelectQuestion">
                  <FormGroup className="mixerSelect">
                    <Input type="select"
                          name="hasMixer"
                          value={this.state.hasMixer}
                          onChange={this.toggleHasMixer}
                          className="inputField"
                    >
                      <option key={0} value={0}>Mixer(s)?</option>
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
                        className={this.state.company === "" ? "dataNeeded" : "inputField"}
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
                        className={this.state.country === "" ? "dataNeeded" : "inputField"}
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
                          className={this.state.ukUsa === "" ? "dataNeeded" : "inputField"}
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
                          className={this.state.ukUsa === "" ? "dataNeeded" : "inputField"}
                        >
                          {usStateOptionsSelect}
                        </Input>
                      </FormGroup>
                    </Col>
                  }
                </Row>
              </div>
            { this.state.hasMixer > 0 &&
              <>
              <div className="mixerInputArea">
              <h4 className="mixerInputAreaHeader">Mixer Input Area</h4>
                  <Row xs="4">
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
                                className={this.state.mixerOneBrand === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerOne === "" ? "dataNeeded" : "inputField"}
                              />
                              </div>
                          </FormGroup>
                        </Col>
                      </>
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
                                className={this.state.mixerTwoBrand === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerTwo === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerThreeBrand === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerThree === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerFourBrand === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerFour === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerFiveBrand === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerFive === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerSixBrand === "" ? "dataNeeded" : "inputField"}
                              />
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
                                className={this.state.mixerSix === "" ? "dataNeeded" : "inputField"}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </>
                    }
                  </Row>
              </div>
              </>
              }
                <Row xs="1">
                  <Col>
                    <FormGroup check className="collabCheck">
                      <Label check>
                      <Input type="checkbox"
                             name="hasCollab"
                             onChange={this.toggleHasCollab}
                             className="inputField"
                             checked={this.state.hasCollab}
                      />
                      Collabaratory Brewery(s)?
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.hasCollab &&
                <div className="collabInputs">
                  <h4 className="collabInputAreaHeader">Collab Input Area</h4>
                  <Row xs={this.state.firstCollabCountry === "GB" || this.state.firstCollabCountry === "US" ? "3" : "2"}>
                      <Col>
                        <FormGroup>
                          <div>
                            <Input
                              type="text"
                              name="firstCollabCompany"
                              id="collabOneInput"
                              placeholder="First Collab Company"
                              value={this.state.firstCollabCompany}
                              onChange={this.handleFormChange}
                              className={this.state.firstCollabCompany === "" ? "dataNeeded" : "inputField"}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <div>
                            <Input
                              type="select"
                              name="firstCollabCountry"
                              id="collabOneCountryInput"
                              value={this.state.firstCollabCountry}
                              onChange={this.handleFormChangeCountryUpdate}
                              className={this.state.firstCollabCountry === "" ? "dataNeeded" : "inputField"}
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
                            <div>
                              <Input
                                type="select"
                                name="firstUkUsa"
                                id="collabOneGBCountryInput"
                                value={this.state.firstUkUsa}
                                onChange={this.handleFormChange}
                                className={this.state.firstUkUsa === "" ? "dataNeeded" : "inputField"}
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
                              className={this.state.firstUkUsa === "" ? "dataNeeded" : "inputField"}
                            >
                              {usStateOptionsSelect}
                            </Input>
                          </FormGroup>
                        </Col>
                      }
                    </Row>
                    <Row xs={this.state.secondCollabCountry === "GB" || this.state.secondCollabCountry === "US" ? "3" : "2"}>
                      <Col>
                        <FormGroup>
                          <div>
                            <Input
                              type="text"
                              name="secondCollabCompany"
                              id="collabTwoInput"
                              placeholder="Second Collab Company (Optional)"
                              value={this.state.secondCollabCompany}
                              onChange={this.handleFormChange}
                              className="inputField"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <div>
                            <Input
                              type="select"
                              name="secondCollabCountry"
                              id="collabTwoCountryInput"
                              value={this.state.secondCollabCountry}
                              onChange={this.handleFormChangeCountryUpdate}
                              className="inputField"
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
                            <div>
                              <Input
                                type="select"
                                name="secondUkUsa"
                                id="collabTwoGBCountryInput"
                                value={this.state.secondUkUsa}
                                onChange={this.handleFormChange}
                                className="inputField"
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
                              className="inputField"
                            >
                              {usStateOptionsSelect}
                            </Input>
                          </FormGroup>
                        </Col>
                      }
                  </Row>
                </div>
                }
                <div className="verdictArea">
                  <h4 className="verdictAreaHeader">Verdict</h4>
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
                          className={this.state.ratingWordOne === "" ? "dataNeeded" : "inputField"}
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
                          className={this.state.ratingWordTwo === "" ? "dataNeeded" : "inputField"}
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
                          className={this.state.score === "" ? "dataNeeded" : "inputField"}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="notesArea">
                  <h4 className="notesAreaHeader">Additional Notes</h4>
                  <Row xs="1">
                    <Col>
                      <FormGroup className="formGroupQuestion">
                        <Input
                          type="textarea"
                          name="notes"
                          id="notesInput"
                          placeholder="Drink notes here"
                          value={this.state.notes}
                          onChange={this.handleFormChange}
                          className="inputField"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
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
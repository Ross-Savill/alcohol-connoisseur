import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../Stylesheets/BoardFolder/AddDrinkForm.css';
import DrinkerQuestion from './FormQuestions/DrinkerQuestion';
import LoadingSpin from '../MyUtilitiesFolder/LoadingSpin';
import { USStateList } from '../MapFolder/USFolder/USStateList';
const  countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

class AddDrinkForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      peopleNameObjs: [],
      drinkTypeObjs:[],
      uniqueMainDrinks: null,
      sessionId: "",
      personName: '',
      date: null,
      drinkMain: '',
      drinkType: '',
      abv: '',
      company: '',
      country: '',
      ukUsa: '',
      hasMixer: "",
      mixerOne: '',
      mixerTwo: '',
      mixerThree: '',
      mixerFour: '',
      mixerFive: '',
      mixerSix: '',
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
      filteredMainDrinkSuggestions: [],
      filteredMixerSuggestions: [],
      filteredRtOneSuggestions: [],
      filteredRtTwoSuggestions: [],
      showSuggestions: false,
      confirmed: false
    }
    this.handleFormChange = this.handleFormChange.bind(this)
  };

  componentDidMount() {
    const { drinks, drinkers, drinkTypes, drinkToEdit } = this.props
    if(drinkers && drinkTypes) {
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
        id: drinkToEdit.drink._id,
        personName: drinkToEdit.drink.name,
        date: drinkToEdit.drink.date,
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
        abv: (drinkToEdit.drink.abv * 100).toFixed(1),
        mixerOne: drinkToEdit.drink.mixerOne,
        mixerTwo: drinkToEdit.drink.mixerTwo,
        mixerThree: drinkToEdit.drink.mixerThree,
        mixerFour: drinkToEdit.drink.mixerFour,
        mixerFive: drinkToEdit.drink.mixerFive,
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

  mainComponentAutocomplete = (e) => {
    // set states of inputs and prepare data
    const { drinks } = this.props
    const { target: { name, value } } = e
    const userInput = e.currentTarget.value;

    // get all unique main drinks (whole object)
    const uniqueDrinks = drinks.filter((drink, index, self) =>
      index === self.findIndex((d) => (
        d.drinkMain === drink.drinkMain && d.abv === drink.abv && d.company === drink.company
      ))
    );

    // get all unique mixers (name only)
    const allMixersInclSpaces = [];
    drinks.map((drink) => allMixersInclSpaces.push(drink.mixerOne, drink.mixerTwo, drink.mixerThree, drink.mixerFour, drink.mixerFive, drink.mixerSix))
    const uniqueMixers = Array.from(new Set(allMixersInclSpaces.filter(function (mixer) { return mixer != false })));

    // filter main drink suggestions
    const filteredMainDrinkSuggestions = uniqueDrinks.filter(
        suggestion => suggestion.drinkMain.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // filter mixer suggestions
    const filteredMixerSuggestions = uniqueMixers.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );

    this.setState({ activeSuggestion: 0, filteredMainDrinkSuggestions, filteredMixerSuggestions, showSuggestions: true, [name]: value });
  }

  rtOneAutocomplete = (e) => {
    const { target: { name, value } } = e
    const userInput = e.currentTarget.value;
    const allRatingWords = [...new Set(
    this.props.drinks.map((drink) => {
        return drink.ratingWordOne, drink.ratingWordTwo
      })
    )]
    const filteredRtOneSuggestions = allRatingWords.filter(
      suggestion => suggestion.toString().toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({ activeSuggestion: 0, filteredRtOneSuggestions, showSuggestions: true, [name]: value })
  }

  rtTwoAutocomplete = (e) => {
    const { target: { name, value } } = e
    const userInput = e.currentTarget.value;
    const allRatingWords = [...new Set(
      this.props.drinks.map((drink) => {
          return drink.ratingWordOne, drink.ratingWordTwo
      })
    )]
    const filteredRtTwoSuggestions = allRatingWords.filter(
      suggestion => suggestion.toString().toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({ activeSuggestion: 0, filteredRtTwoSuggestions, showSuggestions: true, [name]: value })
  }

  mainComponentSuggestionClick = chosenDrink => {
    this.setState({
      activeSuggestion: 0,
      filteredMainDrinkSuggestions: [],
      showSuggestions: false,
      drinkMain: chosenDrink.drinkMain,
      drinkType: chosenDrink.drinkType,
      abv: (chosenDrink.abv * 100),
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

  mixerSuggestionClick = (event) => {
    // const { target: { name, value } } = event
    // this.setState({ [name]: value })
    console.log(event)
  }

  rtWordOneSuggestionClick = chosenWord => {
    this.setState({
      activeSuggestion: 0,
      filteredMainDrinkSuggestions: [],
      showSuggestions: false,
      ratingWordOne: chosenWord
    })
  }

  rtWordTwoSuggestionClick = chosenWord => {
    this.setState({
      activeSuggestion: 0,
      filteredMainDrinkSuggestions: [],
      showSuggestions: false,
      ratingWordTwo: chosenWord
    })
  }

  // HANDLE CYCLING THROUGH SUGGESTIONS
  onKeyDown = e => {
    const { activeSuggestion, filteredMainDrinkSuggestions } = this.state;

    // if clicked enter to select suggestion
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredMainDrinkSuggestions[activeSuggestion]
      });
      // upclick
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // downclick
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredMainDrinkSuggestions.length) {
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
    this.setState({ hasMixer: e.target.value, mixerOne: '', mixerTwo: '',
                    mixerThree: '', mixerFour: '', mixerFive: '', mixerSix: ''
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
    if(this.props.drinkToEdit && this.state.date !== null) {
      drinkDate = this.state.date
    } else if(this.state.ratingWordOne && this.state.ratingWordTwo && this.state.score) {
      drinkDate = new Date()
    } else {
      drinkDate = null;
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
      mixerOne: this.state.mixerOne,
      mixerTwo: this.state.mixerTwo,
      mixerThree: this.state.mixerThree,
      mixerFour: this.state.mixerFour,
      mixerFive: this.state.mixerFive,
      mixerSix: this.state.mixerSix,
      ratingWordOne: this.state.ratingWordOne,
      ratingWordTwo: this.state.ratingWordTwo,
      score: this.state.score,
      notes: this.state.notes,
      confirmed: false
    }

    if(!this.props.drinkToEdit) {
      // POST NEW DRINK
      this.props.addDrinkToBoard(neworEditedDrink)
      this.props.setDisplayAddForm(false)
    } else {
      // UPDATE EXISTING DRINK
      neworEditedDrink["id"] = this.props.drinkToEdit.drink._id;
      this.props.editDrinkOnBoard(neworEditedDrink)
      this.props.setDisplayAddForm(false)
    }
  }


  render() {
    if(!this.state.peopleNameObjs || !this.props.drinkers) {
      return <LoadingSpin />
    }

    const {
      mainComponentAutocomplete,
      rtWordOneSuggestionClick,
      rtWordTwoSuggestionClick,
      rtOneAutocomplete,
      rtTwoAutocomplete,
      mainComponentSuggestionClick,
      mixerSuggestionClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredMainDrinkSuggestions,
        filteredMixerSuggestions,
        filteredRtOneSuggestions,
        filteredRtTwoSuggestions,
        showSuggestions,
        drinkMain,
        ratingWordOne,
        ratingWordTwo
      }
    } = this;

    // START OF AUTOCOMPLETE CODE

    let mainDrinkSuggestionsComponent;
    let mixerSuggestionsComponent;
    let rtWordOneSuggestionsComponent;
    let rtWordTwoSuggestionsComponent;

    if (showSuggestions && drinkMain) {
      if (filteredMainDrinkSuggestions.length) {
        mainDrinkSuggestionsComponent = (
          <ul className="suggestions main-suggestions">
            {filteredMainDrinkSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={() => mainComponentSuggestionClick(suggestion)}>
                  {suggestion.drinkMain} ({(suggestion.abv*100).toFixed(1)}%)
                </li>
              );
            })}
          </ul>
        );
      } else {
        mainDrinkSuggestionsComponent = (
          <div className="no-suggestions">
            <em>No main drinks available.</em>
          </div>
        );
      }
    }

    if (showSuggestions && drinkMain) {
      if (filteredMixerSuggestions.length) {
        mixerSuggestionsComponent = (
          <ul className="suggestions mixer-suggestions">
            {filteredMixerSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={() => mixerSuggestionClick(suggestion)}>
                  {suggestion} (PREVIOUS MIXER)
                </li>
              );
            })}
          </ul>
        );
      } else {
        mixerSuggestionsComponent = (
          <div className="no-suggestions">
            <em>No mixers available.</em>
          </div>
        );
      }
    }

    if (showSuggestions && ratingWordOne) {
      if (filteredRtOneSuggestions.length) {
        rtWordOneSuggestionsComponent = (
          <ul className="suggestions">
            {filteredRtOneSuggestions.map((suggestedWord, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={() => rtWordOneSuggestionClick(suggestedWord)}>
                  {suggestedWord}
                </li>
              );
            })}
          </ul>
        );
      } else {
        rtWordOneSuggestionsComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    if (showSuggestions && ratingWordTwo) {
      if (filteredRtOneSuggestions.length) {
        rtWordTwoSuggestionsComponent = (
          <ul className="suggestions">
            {filteredRtTwoSuggestions.map((suggestedWord, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={index} onClick={() => rtWordTwoSuggestionClick(suggestedWord)}>
                  {suggestedWord}
                </li>
              );
            })}
          </ul>
        );
      } else {
        rtWordOneSuggestionsComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    // END OF AUTO COMPLETE CODE

    const drinkTypes = this.state.drinkTypeObjs
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
      this.setState({ sessionId: this.props.sessionId })
    }

    console.log(this.state.personName)
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
                <DrinkerQuestion drinkerNames={this.state.peopleNameObjs}
                                 personName={this.state.personName}
                                 handleFormChange={this.handleFormChange}/>
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
                      onChange={mainComponentAutocomplete}
                      className={this.state.drinkMain === "" ? "dataNeeded" : "inputField"}
                    />
                  </FormGroup>
                  <div className="mainAndMixerSuggestions">
                    {mainDrinkSuggestionsComponent}
                    {mixerSuggestionsComponent}
                  </div>
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
                  <Row xs="3">
                      <>
                        <Col xs="4">
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
                        <Col xs="4">
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
                    { this.state.hasMixer > 2 &&
                        <>
                        <Col xs="4">
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
                  </Row>
                { this.state.hasMixer > 3 &&
                  <Row xs="3">
                    <>
                      <Col xs="4">
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
                  { this.state.hasMixer > 4 &&
                      <>
                        <Col xs="4">
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
                        <Col xs="4">
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
                }
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
                          onChange={rtOneAutocomplete}
                          className={this.state.ratingWordOne === "" ? "dataNeeded" : "inputField"}
                        />
                      </FormGroup>
                      {rtWordOneSuggestionsComponent}
                    </Col>
                    <Col>
                      <FormGroup className="formGroupQuestion">
                        <Input
                          type="text"
                          name="ratingWordTwo"
                          id="ratingWordTwoInput"
                          placeholder="Rating Word Two"
                          value={this.state.ratingWordTwo}
                          onChange={rtTwoAutocomplete}
                          className={this.state.ratingWordTwo === "" ? "dataNeeded" : "inputField"}
                        />
                      </FormGroup>
                      {rtWordTwoSuggestionsComponent}
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
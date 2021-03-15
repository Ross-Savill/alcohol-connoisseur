import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import '../Stylesheets/BoardFolder/AddDrinkForm.css';
import DrinkerQ from './FormQuestions/DrinkerQ';
import DrinkTypeQ from './FormQuestions/DrinkTypeQ';
import MainComponentQ from './FormQuestions/MainComponentQ';
import ABVQuestion from './FormQuestions/ABVQuestion';
import MixerSelect from './FormQuestions/MixerSelect';
import MainCompanyQ from './FormQuestions/MainCompanyQ';
import MainCountryQ from './FormQuestions/MainCountryQ';
import MainGBCountryQ from './FormQuestions/MainGBCountryQ';
import MainUSStateQ from './FormQuestions/MainUSStateQ';
import MixerOneQ from './FormQuestions/MixerOneQ';
import MixerTwoQ from './FormQuestions/MixerTwoQ';
import MixerThreeQ from './FormQuestions/MixerThreeQ';
import MixerFourQ from './FormQuestions/MixerFourQ';
import MixerFiveQ from './FormQuestions/MixerFiveQ';
import MixerSixQ from './FormQuestions/MixerSixQ';
import CollabCheckbox from './FormQuestions/CollabCheckbox';
import CollabCompanyOneQ from './FormQuestions/CollabCompanyOneQ';
import CollabCountryOneQ from './FormQuestions/CollabCountryOneQ';
import CollabGBCountryOneQ from './FormQuestions/CollabGBCountryOneQ';
import CollabUSStateOneQ from './FormQuestions/CollabUSStateOneQ';
import CollabCompanyTwoQ from './FormQuestions/CollabCompanyTwoQ';
import CollabCountryTwoQ from './FormQuestions/CollabCountryTwoQ';
import CollabGBCountryTwoQ from './FormQuestions/CollabGBCountryTwoQ';
import CollabUSStateTwoQ from'./FormQuestions/CollabUSStateTwoQ';
import RatingOneQ from './FormQuestions/RatingOneQ';
import RatingTwoQ from './FormQuestions/RatingTwoQ';
import ScoreQ from './FormQuestions/ScoreQ';
import NotesQ from './FormQuestions/NotesQ';
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
      filteredMainDrinkMixerSuggestions: [],
      filteredMixerSuggestions: [],
      filteredCompanySuggestions: [],
      filteredRtOneSuggestions: [],
      filteredRtTwoSuggestions: [],
      showSuggestions: false,
      mixerOneSuggestions: false,
      mixerTwoSuggestions: false,
      mixerThreeSuggestions: false,
      mixerFourSuggestions: false,
      mixerFiveSuggestions: false,
      mixerSixSuggestions: false,
      companySuggestions: false,
      firstCollabCompanySuggestions: false,
      secondCollabCompanySuggestions: false,
      drinkerError: "",
      drinkTypeError: "",
      mainComponentError: "",
      confirmed: false
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.mainComponentSuggestionClick = this.mainComponentSuggestionClick.bind(this);
    this.mixerSuggestionClick = this.mixerSuggestionClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.drinkAutocomplete = this.drinkAutocomplete.bind(this);
    this.companyAutocomplete = this.companyAutocomplete.bind(this);
    this.companySuggestionClick = this.companySuggestionClick.bind(this);
    this.toggleHasMixer = this.toggleHasMixer.bind(this);
    this.mixerAutocomplete = this.mixerAutocomplete.bind(this);
    this.mixerSuggestionClick = this.mixerSuggestionClick.bind(this);
    this.handleFormChangeCountryUpdate = this.handleFormChangeCountryUpdate.bind(this);
    this.toggleHasCollab = this.toggleHasCollab.bind(this);
    this.rtOneAutocomplete = this.rtOneAutocomplete.bind(this);
    this.rtWordOneSuggestionClick = this.rtWordOneSuggestionClick.bind(this);
    this.rtTwoAutocomplete = this.rtTwoAutocomplete.bind(this);
    this.rtWordTwoSuggestionClick = this.rtWordTwoSuggestionClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  };

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentDidMount() {
    const { drinkers, drinkTypes, drinkToEdit } = this.props
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
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log("triggered")
      this.setState({ showSuggestions: false,
                      mixerOneSuggestions: false,
                      mixerTwoSuggestions: false,
                      mixerThreeSuggestions: false,
                      mixerFourSuggestions: false,
                      mixerFiveSuggestions: false,
                      mixerSixSuggestions: false,
                      companySuggestions: false })
    }
}

  componentDidUpdate(prevProps, prevState) {
    if(this.props.drinkers !== this.state.peopleNameObjs ||
      this.props.drinkTypes !== this.state.drinkTypeObjs) {
        this.setState({ peopleNameObjs: this.props.drinkers, drinkTypeObjs: this.props.drinkTypes })
      }
  }

  drinkAutocomplete = (e) => {
    const { drinks } = this.props
    const { target: { name, value } } = e
    const userInput = e.currentTarget.value;
    const uniqueDrinks = drinks.filter((drink, index, self) =>
      index === self.findIndex((d) => (
        d.drinkMain === drink.drinkMain && d.abv === drink.abv && d.company === drink.company
      ))
    );
    const allMixersInclSpaces = [];
    drinks.map((drink) => allMixersInclSpaces.push(drink.mixerOne, drink.mixerTwo, drink.mixerThree, drink.mixerFour, drink.mixerFive, drink.mixerSix))
    const uniqueMixers = Array.from(new Set(allMixersInclSpaces.filter(function (mixer) { return mixer != false })));
    const filteredMainDrinkSuggestions = uniqueDrinks.filter(
      suggestion => suggestion.drinkMain.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    const filteredMainDrinkMixerSuggestions = uniqueMixers.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({ activeSuggestion: 0, filteredMainDrinkSuggestions, filteredMainDrinkMixerSuggestions, showSuggestions: true, [name]: value });
  }

  mixerAutocomplete = e => {
    const { drinks } = this.props
    const { target: { name, value } } = e
    const userInput = e.currentTarget.value;
    let allLiquids = [];
    drinks.map((drink) => {
      allLiquids.push(drink.drinkMain)
      if(!drink.mixerOne) { return } else { allLiquids.push(drink.mixerOne)}
      if(!drink.mixerTwo) { return } else { allLiquids.push(drink.mixerTwo)}
      if(!drink.mixerThree) { return } else { allLiquids.push(drink.mixerThree)}
      if(!drink.mixerFour) { return } else { allLiquids.push(drink.mixerFour)}
      if(!drink.mixerFive) { return } else { allLiquids.push(drink.mixerFive)}
      if(!drink.mixerSix) { return } else { allLiquids.push(drink.mixerSix)}
    })
    const uniqueMixers = Array.from(new Set(allLiquids));
    const filteredMixerSuggestions = uniqueMixers.filter(
      suggestion => suggestion.toString().toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({ activeSuggestion: 0, filteredMixerSuggestions, [`${name}Suggestions`]: true, [name]: value })
  }

  companyAutocomplete = e => {
    const { drinks } = this.props
    const { target: { name, value } } = e
    const userInput = e.currentTarget.value;
    let companies = [];
    drinks.map((drink) => {
      companies.push({ sugCompany: drink.company, sugCountry: drink.country, sugUkUsa: drink.ukUsa })
      if(drink.firstCollabCompany) {
        companies.push({ sugCompany: drink.firstCollabCompany, sugCountry: drink.firstCollabCountry, sugUkUsa: drink.firstUkUsa })
      }
      if(drink.secondCollabCompany) {
        companies.push({ sugCompany: drink.secondCollabCompany, sugCountry: drink.secondCollabCountry, sugUkUsa: drink.secondUkUsa })
      }
    })

    const uniqueCompanies = companies.filter((drink, index, self) =>
      index === self.findIndex((d) => (
        d.sugCompany === drink.sugCompany && d.sugCountry === drink.sugCountry && d.sugUkUsa === drink.sugUkUsa
      ))
    );

    const filteredCompanySuggestions = uniqueCompanies.filter(
      suggestion => suggestion.sugCompany.toString().toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({ activeSuggestion: 0, filteredCompanySuggestions, [`${name}Suggestions`]: true, [name]: value })
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
      filteredMainDrinkMixerSuggestions: [],
      showSuggestions: false,
      drinkMain: chosenDrink.drinkMain,
      drinkType: chosenDrink.drinkType,
      abv: (chosenDrink.abv * 100).toFixed(1),
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

  companySuggestionClick = (companyObject, name, country, gbUS) => {
    this.setState({ [name]: companyObject.sugCompany,
                    [country]: companyObject.sugCountry,
                    [gbUS]: companyObject.sugUkUsa,
                    activeSuggestion: 0,
                    filteredCompanySuggestions: [],
                    [`${name}Suggestions`]: false
    })
  }

  mixerSuggestionClick = (mixerName, name) => {
    this.setState({ [name]: mixerName,
                    activeSuggestion: 0,
                    filteredMixerSuggestions: [],
                    [`${name}Suggestions`]: false
    })
  }

  rtWordOneSuggestionClick = chosenWord => {
    this.setState({
      activeSuggestion: 0,
      filteredRtOneSuggestions: [],
      showSuggestions: false,
      ratingWordOne: chosenWord
    })
  }

  rtWordTwoSuggestionClick = chosenWord => {
    this.setState({
      activeSuggestion: 0,
      filteredRtTwoSuggestions: [],
      showSuggestions: false,
      ratingWordTwo: chosenWord
    })
  }

  // HANDLE CYCLING THROUGH SUGGESTIONS
  onKeyDown = e => {
    const { activeSuggestion, filteredMainDrinkSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredMainDrinkSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredMainDrinkSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  handleFormChange = (event) => {
    console.log(event.target)
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

  validate = (event) => {
    let drinkerError = "";
    let drinkTypeError = "";
    let mainComponentError = "";

    if(!this.state.personName) {
      drinkerError = "Select Drinker"
    }
    if(!this.state.drinkType) {
      drinkTypeError = "Select Drink Type"
    }
    if(!this.state.drinkMain) {
      mainComponentError = "Input Drink"
    }
    if(drinkerError || drinkTypeError || mainComponentError) {
      this.setState({ drinkerError, drinkTypeError, mainComponentError })
      return false;
    }
    return true;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {

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
  }

  render() {
    if(!this.state.peopleNameObjs || !this.props.drinkers) {
      return <LoadingSpin />
    }

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
    usStateOptionsSelect.sort(function(a,b) {
      return a.props.value > b.props.value
    })

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

    return (
      <div className="addFormDiv" onClick={(e) => this.handleCancel(e) }>
        <Container className="addFormContainer" ref={this.container}>
          <Form className="addDrinkForm" onSubmit={this.handleSubmit}>
            <Row className="addDrinkTitle">
              <h3 className="mainFormHeader">🍺🍺🍺 🍺🍺🍺 Drink Details: 🍺🍺🍺 🍺🍺🍺</h3>
              <p className="sessionNumberPtag">Session Number {this.state.sessionId}</p>
            </Row>
          <div className="mainDrinkInfoArea">
            <h4 className="mainDrinkInfoAreaHeader">Standard Required Data</h4>
            <Row xs="3">
              <div>
                  <DrinkerQ drinkerNames={this.state.peopleNameObjs}
                            personName={this.state.personName}
                            handleFormChange={this.handleFormChange}
                  />
                  <div className="drinkerErrorMessage">{this.state.drinkerError}</div>
              </div>
              <div>
                <DrinkTypeQ drinkType={this.state.drinkType}
                            drinkTypes={this.state.drinkTypeObjs}
                            handleFormChange={this.handleFormChange}
                />
                <div className="drinkTypeErrorMessage">{this.state.drinkTypeError}</div>
              </div>
              <ABVQuestion abv={this.state.abv}
                            handleFormChange={this.handleFormChange}
              />
            </Row>
            <Row xs="2">
              <Col xs="10">
                <div>
                  <MainComponentQ filteredMainDrinkSuggestions={this.state.filteredMainDrinkSuggestions}
                                  activeSuggestion={this.state.activeSuggestion}
                                  showSuggestions={this.state.showSuggestions}
                                  filteredMainDrinkMixerSuggestions={this.state.filteredMainDrinkMixerSuggestions}
                                  drinkMain={this.state.drinkMain}
                                  mainComponentSuggestionClick={this.mainComponentSuggestionClick}
                                  mixerSuggestionClick={this.mixerSuggestionClick}
                                  onKeyDown={this.onKeyDown}
                                  drinkAutocomplete={this.drinkAutocomplete}
                                  setWrapperRef={this.setWrapperRef}
                                  handleClickOutside={this.handleClickOutside}
                  />
                  <div className="mainComponentErrorMessage">{this.state.mainComponentError}</div>
                </div>
              </Col>
              <MixerSelect hasMixer={this.state.hasMixer}
                           toggleHasMixer={this.toggleHasMixer}
              />
            </Row>
            <Row xs={this.state.country === "GB" || this.state.country === "US" ? "3" : "2"}>
              <MainCompanyQ company={this.state.company}
                            filteredCompanySuggestions={this.state.filteredCompanySuggestions}
                            companySuggestions={this.state.companySuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            companyAutocomplete={this.companyAutocomplete}
                            onKeyDown={this.onKeyDown}
                            companySuggestionClick={this.companySuggestionClick}
                            setWrapperRef={this.setWrapperRef}
                            handleClickOutside={this.handleClickOutside}
              />
              <MainCountryQ country={this.state.country}
                            handleFormChangeCountryUpdate={this.handleFormChangeCountryUpdate}
                            countryOptionsSelect={countryOptionsSelect}
              />
              { this.state.country === "GB" &&
              <MainGBCountryQ ukUsa={this.state.ukUsa}
                              handleFormChange={this.handleFormChange}
                              britishCountrySelect={britishCountrySelect}
              />
              }
              { this.state.country === "US" &&
              <MainUSStateQ ukUsa={this.state.ukUsa}
                            handleFormChange={this.handleFormChange}
                            usStateOptionsSelect={usStateOptionsSelect}
              />
              }
            </Row>
          </div>
            { this.state.hasMixer > 0 &&
              <div className="mixerInputArea">
              <h4 className="mixerInputAreaHeader">Mixer Input Area</h4>
              <Row xs="3">
                <MixerOneQ mixerOne={this.state.mixerOne}
                           mixerOneSuggestions={this.state.mixerOneSuggestions}
                           filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                           activeSuggestion={this.state.activeSuggestion}
                           onKeyDown={this.onKeyDown}
                           mixerAutocomplete={this.mixerAutocomplete}
                           mixerSuggestionClick={this.mixerSuggestionClick}
                />
                { this.state.hasMixer > 1 &&
                <MixerTwoQ mixerTwo={this.state.mixerTwo}
                           mixerTwoSuggestions={this.state.mixerTwoSuggestions}
                           filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                           activeSuggestion={this.state.activeSuggestion}
                           onKeyDown={this.onKeyDown}
                           mixerAutocomplete={this.mixerAutocomplete}
                           mixerSuggestionClick={this.mixerSuggestionClick}
                />
                }
                { this.state.hasMixer > 2 &&
                <MixerThreeQ mixerThree={this.state.mixerThree}
                             mixerThreeSuggestions={this.state.mixerThreeSuggestions}
                             filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                             activeSuggestion={this.state.activeSuggestion}
                             onKeyDown={this.onKeyDown}
                             mixerAutocomplete={this.mixerAutocomplete}
                             mixerSuggestionClick={this.mixerSuggestionClick}
                />
                }
              </Row>
            { this.state.hasMixer > 3 &&
              <Row xs="3">
                <MixerFourQ mixerFour={this.state.mixerFour}
                            mixerFourSuggestions={this.state.mixerFourSuggestions}
                            filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            onKeyDown={this.onKeyDown}
                            mixerAutocomplete={this.mixerAutocomplete}
                            mixerSuggestionClick={this.mixerSuggestionClick}
                />
              { this.state.hasMixer > 4 &&
                <MixerFiveQ mixerFive={this.state.mixerFive}
                            mixerFiveSuggestions={this.state.mixerFiveSuggestions}
                            filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            onKeyDown={this.onKeyDown}
                            mixerAutocomplete={this.mixerAutocomplete}
                            mixerSuggestionClick={this.mixerSuggestionClick}
                />
              }
              { this.state.hasMixer > 5 &&
                <MixerSixQ mixerSix={this.state.mixerSix}
                            mixerSixSuggestions={this.state.mixerSixSuggestions}
                            filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            onKeyDown={this.onKeyDown}
                            mixerAutocomplete={this.mixerAutocomplete}
                            mixerSuggestionClick={this.mixerSuggestionClick}
                />
              }
              </Row>
              }
              </div>
            }
          <Row xs="1">
            <CollabCheckbox toggleHasCollab={this.toggleHasCollab}
                            hasCollab={this.state.hasCollab}
            />
          </Row>
        { this.state.hasCollab &&
            <div className="collabInputs">
              <h4 className="collabInputAreaHeader">Collab Input Area</h4>
              <Row xs={this.state.firstCollabCountry === "GB" || this.state.firstCollabCountry === "US" ? "3" : "2"}>
                <CollabCompanyOneQ firstCollabCompany={this.state.firstCollabCompany}
                                   companyAutocomplete={this.companyAutocomplete}
                                   filteredCompanySuggestions={this.state.filteredCompanySuggestions}
                                   firstCollabCompanySuggestions={this.state.firstCollabCompanySuggestions}
                                   activeSuggestion={this.state.activeSuggestion}
                                   onKeyDown={this.onKeyDown}
                                   companySuggestionClick={this.companySuggestionClick}
                                   setWrapperRef={this.setWrapperRef}
                                   handleClickOutside={this.handleClickOutside}
                />
                <CollabCountryOneQ firstCollabCountry={this.state.firstCollabCountry}
                                    handleFormChangeCountryUpdate={this.handleFormChangeCountryUpdate}
                                    countryOptionsSelect={countryOptionsSelect}
                />
              { this.state.firstCollabCountry === "GB" &&
                <CollabGBCountryOneQ firstUkUsa={this.state.firstUkUsa}
                                     handleFormChange={this.handleFormChange}
                                     britishCountrySelect={britishCountrySelect}
                />
              }
              { this.state.firstCollabCountry === "US" &&
                <CollabUSStateOneQ firstUkUsa={this.state.firstUkUsa}
                                   handleFormChange={this.handleFormChange}
                                   usStateOptionsSelect={usStateOptionsSelect}
                />
              }
              </Row>
              <Row xs={this.state.secondCollabCountry === "GB" || this.state.secondCollabCountry === "US" ? "3" : "2"}>
                <CollabCompanyTwoQ secondCollabCompany={this.state.secondCollabCompany}
                                   companyAutocomplete={this.companyAutocomplete}
                                   handleFormChange={this.handleFormChange}
                />

                <CollabCountryTwoQ secondCollabCountry={this.state.secondCollabCountry}
                                   handleFormChangeCountryUpdate={this.handleFormChangeCountryUpdate}
                                   countryOptionsSelect={countryOptionsSelect}
                />
              { this.state.secondCollabCountry === "GB" &&
                <CollabGBCountryTwoQ secondUkUsa={this.state.secondUkUsa}
                                     handleFormChange={this.handleFormChange}
                                     britishCountrySelect={britishCountrySelect}
                />
              }
              { this.state.secondCollabCountry === "US" &&
                <CollabUSStateTwoQ secondUkUsa={this.state.secondUkUsa}
                                   handleFormChange={this.handleFormChange}
                                   usStateOptionsSelect={usStateOptionsSelect}
                />
              }
              </Row>
            </div>
        }
            <div className="verdictArea">
              <h4 className="verdictAreaHeader">Verdict</h4>
              <Row xs="3">
                <RatingOneQ ratingWordOne={this.state.ratingWordOne}
                            showSuggestions={this.state.showSuggestions}
                            filteredRtOneSuggestions={this.state.filteredRtOneSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            rtOneAutocomplete={this.rtOneAutocomplete}
                            rtWordOneSuggestionClick={this.rtWordOneSuggestionClick}
                />
                <RatingTwoQ ratingWordTwo={this.state.ratingWordTwo}
                            showSuggestions={this.state.showSuggestions}
                            filteredRtTwoSuggestions={this.state.filteredRtTwoSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            rtTwoAutocomplete={this.rtTwoAutocomplete}
                            rtWordTwoSuggestionClick={this.rtWordTwoSuggestionClick}/>

                <ScoreQ score={this.state.score}
                        handleFormChange={this.handleFormChange}
                />
              </Row>
            </div>
              <div className="notesArea">
                <h4 className="notesAreaHeader">Additional Notes</h4>
                  <Row xs="1">
                    <NotesQ notes={this.state.notes}
                            handleFormChange={this.handleFormChange}
                    />
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
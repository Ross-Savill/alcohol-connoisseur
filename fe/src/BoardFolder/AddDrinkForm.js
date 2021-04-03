import React, { Component } from 'react';
import { Container, Col, Form, Button, Row } from 'reactstrap';
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
import MixerSevenQ from './FormQuestions/MixerSevenQ';
import MixerEightQ from './FormQuestions/MixerEightQ';
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
      drinkerId: '',
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
      mixerSeven: '',
      mixerEight: '',
      ratingWordOne: '',
      ratingWordTwo: '',
      score: "",
      hasCollab: "",
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
      mixerSevenSuggestions: false,
      mixerEightSuggestions: false,
      companySuggestions: false,
      firstCollabCompanySuggestions: false,
      secondCollabCompanySuggestions: false,
      drinkerError: "",
      drinkTypeError: "",
      mainComponentError: "",
      confirmed: false
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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
    this.removeDropdown = this.removeDropdown.bind(this);
  };

  componentDidMount() {
    const { drinkers, drinkTypes, drinkToEdit } = this.props
    if(drinkers && drinkTypes) {
      this.setState({ peopleNameObjs: this.props.drinkers, drinkTypeObjs: this.props.drinkTypes })
    }

    if(drinkToEdit) {
      if(drinkToEdit.drink.mixerEight) {
        this.setState({ hasMixer: "8" })
      } else if (drinkToEdit.drink.mixerSeven) {
        this.setState({ hasMixer: "7" })
      } else if (drinkToEdit.drink.mixerSix) {
        this.setState({ hasMixer: "6" })
      } else if(drinkToEdit.drink.mixerFive) {
        this.setState({ hasMixer: "5" })
      } else if(drinkToEdit.drink.mixerFour) {
        this.setState({ hasMixer: "4" })
      } else if(drinkToEdit.drink.mixerThree) {
        this.setState({ hasMixer: "3" })
      } else if(drinkToEdit.drink.mixerTwo) {
        this.setState({ hasMixer: "2" })
      } else if(drinkToEdit.drink.mixerOne) {
        this.setState({ hasMixer: "1" })
      }

      if(drinkToEdit.drink.firstCollabCompany) {
        this.setState({ hasCollab: true })
      }

      this.setState({
        id: drinkToEdit.drink._id,
        personName: drinkToEdit.drink.name,
        drinkerId: drinkToEdit.drink.drinkerId,
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
        abv: drinkToEdit.drink.abv ? (drinkToEdit.drink.abv * 100).toFixed(1) : "",
        mixerOne: drinkToEdit.drink.mixerOne,
        mixerTwo: drinkToEdit.drink.mixerTwo,
        mixerThree: drinkToEdit.drink.mixerThree,
        mixerFour: drinkToEdit.drink.mixerFour,
        mixerFive: drinkToEdit.drink.mixerFive,
        mixerSix: drinkToEdit.drink.mixerSix,
        mixerSeven: drinkToEdit.drink.mixerSeven,
        mixerEight: drinkToEdit.drink.mixerEight,
        ratingWordOne: drinkToEdit.drink.ratingWordOne,
        ratingWordTwo: drinkToEdit.drink.ratingWordTwo,
        score: drinkToEdit.drink.score ? drinkToEdit.drink.score : "",
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
    drinks.map((drink) => {
      if(!drink.mixerOne) { return } else { allMixersInclSpaces.push(drink.mixerOne)}
      if(!drink.mixerTwo) { return } else { allMixersInclSpaces.push(drink.mixerTwo)}
      if(!drink.mixerThree) { return } else { allMixersInclSpaces.push(drink.mixerThree)}
      if(!drink.mixerFour) { return } else { allMixersInclSpaces.push(drink.mixerFour)}
      if(!drink.mixerFive) { return } else { allMixersInclSpaces.push(drink.mixerFive)}
      if(!drink.mixerSix) { return } else { allMixersInclSpaces.push(drink.mixerSix)}
      if(!drink.mixerSeven) { return } else { allMixersInclSpaces.push(drink.mixerSeven)}
      if(!drink.mixerEight) { return } else { allMixersInclSpaces.push(drink.mixerEight)}
    });
    // const uniqueMixers = Array.from(new Set(allMixersInclSpaces));
    let uniqueMixers;

      let alreadyIn = {};
      let result = [];
      const len = allMixersInclSpaces.length;
      let j = 0;
      for(let i = 0; i < len; i++) {
           const drinkToCheck = allMixersInclSpaces[i];
           if(alreadyIn[drinkToCheck] !== 1) {
                 alreadyIn[drinkToCheck] = 1;
                 result[j++] = drinkToCheck;
           }
      }
      uniqueMixers = result;

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
      if(!drink.mixerSeven) { return } else { allLiquids.push(drink.mixerSeven)}
      if(!drink.mixerEight) { return } else { allLiquids.push(drink.mixerEight)}
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

  removeDropdown() {
    this.setState({ showSuggestions: false, mixerOneSuggestions: false,
      mixerTwoSuggestions: false, mixerThreeSuggestions: false, mixerFourSuggestions: false,
      mixerFiveSuggestions: false, mixerSixSuggestions: false, mixerSevenSuggestions: false, mixerEightSuggestions: false,
      companySuggestions: false, firstCollabCompanySuggestions: false, secondCollabCompanySuggestions: false })
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
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  handleNameChange = (chosenNameObj) => {
    this.setState({ personName: chosenNameObj.label, drinkerId: chosenNameObj.value })
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
                    mixerThree: '', mixerFour: '', mixerFive: '', mixerSix: '', mixerSeven: ''
                 });
  };

  toggleHasCollab = (e) => {
    this.setState({ hasCollab: e.target.value,
                    firstCollabCompany: '', firstCollabCountry: '', firstUkUsa: '',
                    secondCollabCompany: '', secondCollabCountry: '', secondUkUsa: ''
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
      if(this.props.drinkToEdit && this.state.date) {
        drinkDate = this.state.date
      } else if(this.state.ratingWordOne && this.state.ratingWordTwo && this.state.score) {
        drinkDate = new Date()
      } else {
        drinkDate = undefined;
      }

      let score;
      this.state.score === "" ? score = undefined : score = this.state.score

      let abv;
      this.state.abv === "" ? abv = undefined : abv = this.state.abv

      let confirmedStatus = false

      if(this.props.drinkToEdit) {
        if(this.props.drinkToEdit.drink.confirmed === true ||
          this.props.admin === true && this.state.ratingWordOne !== ""
                                     && this.state.ratingWordTwo !== ""
                                     && (this.state.score !== "" || null)) {
          confirmedStatus = true
        }
      } else {
        if(this.props.admin === true && this.state.ratingWordOne !== ""
                                    && this.state.ratingWordTwo !== ""
                                    && (this.state.score !== "" || this.state.score !== null)) {
          confirmedStatus = true
        }
      }

      const neworEditedDrink = {
        sessionId: this.state.sessionId,
        drinkerId: this.state.drinkerId,
        name: this.state.personName,
        date: drinkDate ? new Date(drinkDate) : undefined,
        company: (this.state.company).trim(),
        country: this.state.country,
        ukUsa: this.state.ukUsa,
        firstCollabCompany: (this.state.firstCollabCompany).trim(),
        firstCollabCountry: this.state.firstCollabCountry,
        firstUkUsa: this.state.firstUkUsa,
        secondCollabCompany: (this.state.secondCollabCompany).trim(),
        secondCollabCountry: this.state.secondCollabCountry,
        secondUkUsa: this.state.secondUkUsa,
        drinkMain: (this.state.drinkMain).trim(),
        drinkType: this.state.drinkType,
        abv: abv / 100,
        mixerOne: (this.state.mixerOne).trim(),
        mixerTwo: (this.state.mixerTwo).trim(),
        mixerThree: (this.state.mixerThree).trim(),
        mixerFour: (this.state.mixerFour).trim(),
        mixerFive: (this.state.mixerFive).trim(),
        mixerSix: (this.state.mixerSix).trim(),
        mixerSeven: (this.state.mixerSeven).trim(),
        mixerEight: (this.state.mixerEight).trim(),
        ratingWordOne: (this.state.ratingWordOne).trim(),
        ratingWordTwo: (this.state.ratingWordTwo).trim(),
        score: parseFloat(score),
        notes: (this.state.notes).trim(),
        confirmed: confirmedStatus
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
        <Container className="addFormContainer">
          <Form className="addDrinkForm" onSubmit={this.handleSubmit}>
            <Row className="addDrinkTitle">
              <h3 className="mainFormHeader">🍺🍺🍺 🍺🍺🍺 Drink Details: 🍺🍺🍺 🍺🍺🍺</h3>
              <p className="sessionNumberPtag">Session Number {this.state.sessionId}</p>
            </Row>
          <div className="mainDrinkInfoArea">
            <h4 className="mainDrinkInfoAreaHeader">Standard Required Data</h4>
            <Row xs="3">
              <div>
                  <DrinkerQ userObjects={this.state.peopleNameObjs}
                            personName={this.state.personName}
                            drinkerId={this.state.drinkerId}
                            handleNameChange={this.handleNameChange}
                            userId={this.props.userId}
                            admin={this.props.admin}
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
              <Col xs="7">
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
                                  removeDropdown={this.removeDropdown}
                  />
                  <div className="mainComponentErrorMessage">{this.state.mainComponentError}</div>
                </div>
              </Col>
              <MixerSelect hasMixer={this.state.hasMixer}
                           toggleHasMixer={this.toggleHasMixer}
              />
              <CollabCheckbox toggleHasCollab={this.toggleHasCollab}
                              hasCollab={this.state.hasCollab}
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
                            removeDropdown={this.removeDropdown}
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
              <Row xs="4">
                <MixerOneQ mixerOne={this.state.mixerOne}
                           mixerOneSuggestions={this.state.mixerOneSuggestions}
                           filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                           activeSuggestion={this.state.activeSuggestion}
                           onKeyDown={this.onKeyDown}
                           mixerAutocomplete={this.mixerAutocomplete}
                           mixerSuggestionClick={this.mixerSuggestionClick}
                           removeDropdown={this.removeDropdown}
                />
                { this.state.hasMixer > 1 &&
                <MixerTwoQ mixerTwo={this.state.mixerTwo}
                           mixerTwoSuggestions={this.state.mixerTwoSuggestions}
                           filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                           activeSuggestion={this.state.activeSuggestion}
                           onKeyDown={this.onKeyDown}
                           mixerAutocomplete={this.mixerAutocomplete}
                           mixerSuggestionClick={this.mixerSuggestionClick}
                           removeDropdown={this.removeDropdown}
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
                             removeDropdown={this.removeDropdown}
                />
                }
                { this.state.hasMixer > 3 &&

                <MixerFourQ mixerFour={this.state.mixerFour}
                            mixerFourSuggestions={this.state.mixerFourSuggestions}
                            filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            onKeyDown={this.onKeyDown}
                            mixerAutocomplete={this.mixerAutocomplete}
                            mixerSuggestionClick={this.mixerSuggestionClick}
                            removeDropdown={this.removeDropdown}
                />
                }
              </Row>
                <Row xs="4">
              { this.state.hasMixer > 4 &&
                <MixerFiveQ mixerFive={this.state.mixerFive}
                            mixerFiveSuggestions={this.state.mixerFiveSuggestions}
                            filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            onKeyDown={this.onKeyDown}
                            mixerAutocomplete={this.mixerAutocomplete}
                            mixerSuggestionClick={this.mixerSuggestionClick}
                            removeDropdown={this.removeDropdown}
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
                            removeDropdown={this.removeDropdown}
                />
              }
              { this.state.hasMixer > 6 &&
                <MixerSevenQ mixerSeven={this.state.mixerSeven}
                            mixerSevenSuggestions={this.state.mixerSevenSuggestions}
                            filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            onKeyDown={this.onKeyDown}
                            mixerAutocomplete={this.mixerAutocomplete}
                            mixerSuggestionClick={this.mixerSuggestionClick}
                            removeDropdown={this.removeDropdown}
                />
              }
              { this.state.hasMixer > 7 &&
                <MixerEightQ mixerEight={this.state.mixerEight}
                            mixerEightSuggestions={this.state.mixerEightSuggestions}
                            filteredMixerSuggestions={this.state.filteredMixerSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            onKeyDown={this.onKeyDown}
                            mixerAutocomplete={this.mixerAutocomplete}
                            mixerSuggestionClick={this.mixerSuggestionClick}
                            removeDropdown={this.removeDropdown}
                />
              }
              </Row>
            </div>
            }
        { this.state.hasCollab > 0 &&
            <div className="collabInputArea">
              <h4 className="collabInputAreaHeader">Collab Input Area</h4>
              <Row xs={this.state.firstCollabCountry === "GB" || this.state.firstCollabCountry === "US" ? "3" : "2"}>
                <CollabCompanyOneQ firstCollabCompany={this.state.firstCollabCompany}
                                   companyAutocomplete={this.companyAutocomplete}
                                   filteredCompanySuggestions={this.state.filteredCompanySuggestions}
                                   firstCollabCompanySuggestions={this.state.firstCollabCompanySuggestions}
                                   activeSuggestion={this.state.activeSuggestion}
                                   onKeyDown={this.onKeyDown}
                                   companySuggestionClick={this.companySuggestionClick}
                                   removeDropdown={this.removeDropdown}
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
            { this.state.hasCollab > 1 &&
              <Row xs={this.state.secondCollabCountry === "GB" || this.state.secondCollabCountry === "US" ? "3" : "2"}>
                <CollabCompanyTwoQ secondCollabCompany={this.state.secondCollabCompany}
                                   companyAutocomplete={this.companyAutocomplete}
                                   filteredCompanySuggestions={this.state.filteredCompanySuggestions}
                                   secondCollabCompanySuggestions={this.state.secondCollabCompanySuggestions}
                                   activeSuggestion={this.state.activeSuggestion}
                                   onKeyDown={this.onKeyDown}
                                   companySuggestionClick={this.companySuggestionClick}
                                   removeDropdown={this.removeDropdown}
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
            }
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
                            removeDropdown={this.removeDropdown}
                />
                <RatingTwoQ ratingWordTwo={this.state.ratingWordTwo}
                            showSuggestions={this.state.showSuggestions}
                            filteredRtTwoSuggestions={this.state.filteredRtTwoSuggestions}
                            activeSuggestion={this.state.activeSuggestion}
                            rtTwoAutocomplete={this.rtTwoAutocomplete}
                            rtWordTwoSuggestionClick={this.rtWordTwoSuggestionClick}
                            removeDropdown={this.removeDropdown}
                />
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
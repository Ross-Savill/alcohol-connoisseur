import React, { Component } from 'react';
import Navbar from '../../MyUtilitiesFolder/Navbar'
import { VectorMap } from "react-jvectormap";
import USRegionDataTable from './USRegionDataTable';
import USDrinkerDataTable from './USDrinkerDataTable';
import '../../Stylesheets/USPageSS/USMap.css';
import { USStateList } from './USStateList';
import LoadingSpin from '../../MyUtilitiesFolder/LoadingSpin';

class USMap extends Component {
  constructor(props) {
    super(props)
    this.handleRegionReset = this.handleRegionReset.bind(this)
      this.state = {
        drinks: null,
        usMapData: null,
        selectedRegion: null,
        fullRegionName: "All States",
        justBeersCiders: false
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    if(drinks) {
      this.haveDrinks()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, justBeersCiders } = this.state
    if(this.props.drinks !== drinks || prevState.justBeersCiders !== justBeersCiders) {
      this.haveDrinks(prevState.justBeersCiders)
    }
  }

  haveDrinks = (prevStateJustBeersAndCiders) => {
    const { drinks } = this.props
    this.setState({ drinks })

    let usStateData = []

    let mapDataWithOrWithoutBeers = null
    if(!this.state.justBeersCiders) {
      mapDataWithOrWithoutBeers = drinks;
    } else {
      mapDataWithOrWithoutBeers = drinks.filter(drink => (drink.drinkType === "Beer"
                                                      || drink.drinkType === "Cider")
                                                      && !drink.mixerOne)
    }
    if(mapDataWithOrWithoutBeers) {
    mapDataWithOrWithoutBeers
    .filter(drink => drink.country === "US")
    .map((drink) => {
      if(drink.country === "US") {
        usStateData.push(drink.ukUsa)
      }},
    )
    mapDataWithOrWithoutBeers
    .filter(drink => drink.country === "US")
    .map((drink) => {
      if(drink.firstCollabCountry === "US") {
        usStateData.push(drink.firstUkUsa)
      }}
    )
    mapDataWithOrWithoutBeers
    .filter(drink => drink.country === "US")
    .map((drink) => {
      if(drink.secondCollabCountry === "US") {
        usStateData.push(drink.secondUkUsa)
      }}
    )

    const countedUniqueUSStates = usStateData.reduce(function(occ, name) {
      occ[name] = (occ[name] || 0) + 1;
      return occ;
    }, {});
    if(drinks !== this.state.drinks || this.state.justBeersCiders !== prevStateJustBeersAndCiders) {
      this.setState({ drinks, usMapData: countedUniqueUSStates })
    }
  }
  }

  handleRegionClick = (e, stateCode) => {
    this.refs.map.$mapObject.tip.hide();
    for (const [selectedRegion, fullRegionName] of Object.entries(USStateList)) {
      if (stateCode === selectedRegion) {
        this.setState({ selectedRegion, fullRegionName })
      }
    }
  };

  handleRegionReset() {
    this.setState({ selectedRegion: null, fullRegionName: "All States" })
  }

  handleJustBeersCiders() {
    const { justBeersCiders } = this.state
    this.setState({ justBeersCiders: !justBeersCiders })
  }

  render() {
    if(!this.props.drinks) {
      return (
        <div className="usMapPageLoadingDiv">
          <LoadingSpin />
        </div>
      )
    } else {
      let toBeerOrNotToBeer = null
      if(!this.state.justBeersCiders) {
        toBeerOrNotToBeer = this.state.drinks;
      } else {
        toBeerOrNotToBeer = this.state.drinks.filter(drink =>
          (drink.drinkType === "Beer" ||
           drink.drinkType === "Cider") &&
           !drink.mixerOne
          )
      }
      return(
        <div className="usTotalContainer">
          <div className="usTitleNavDescription">
            <h1 className="usMainTitle">US Map</h1>
            <Navbar />
            <div className="usDescriptionAndChkbox">
              <p className="usDescription">Here you can view every drink with ties to the United States &nbsp;</p>
              <div className="usMapBeerCiderChkboxAndLabel">
                <label className="usMapBeerCiderLabel">(Just Beers/Ciders with no mixers?)&nbsp;</label>
                <input className="usMapBeerCiderChkbox"
                       type="checkbox"
                       onChange={() => this.handleJustBeersCiders()}/>
              </div>
            </div>
          </div>
          <div className="usMapAndBothTables">
            <div className="usMapAndDrinkersTable">
              <div className="usMap">
                <VectorMap
                  map="us_aea"
                  ref={"map"}
                  backgroundColor="#0077be"
                  zoomOnScroll={false}
                  containerStyle={{
                    width: "100%",
                    height: "420px"
                  }}
                  onRegionClick={this.handleRegionClick} //gets the country code
                  containerClassName="map"
                  regionStyle={{
                    initial: {
                      fill: "#e4e4e4",
                      "fill-opacity": 0.9,
                      stroke: "none",
                      "stroke-width": 0,
                      "stroke-opacity": 0
                    },
                    hover: {
                      "fill-opacity": 0.6,
                      cursor: 'pointer'
                    },
                    onRegionOver: function(e, code) {
                      document.body.style.cursor = 'pointer';
                    },
                    selected: {
                      fill: "#2938bc", //color for the clicked country
                    },
                    selectedHover: {}
                  }}
                  regionsSelectable={true}
                  series={{
                    regions: [
                      {
                        values: this.state.usMapData, //this is your data
                        scale: ["#146804"], //your color game's here
                        normalizeFunction: "polynomial"
                      }
                    ]
                  }}
                />
              </div>
              <div className="usDrinkerDataTable">
                <USDrinkerDataTable
                  drinks={toBeerOrNotToBeer}
                  regionCode={this.state.selectedRegion}
                  regionName={this.state.fullRegionName}
                  handleRegionReset={this.handleRegionReset}
                />
              </div>
            </div>
            <div className="usRegionDataTable">
              <USRegionDataTable
                drinks={toBeerOrNotToBeer}
                regionCode={this.state.selectedRegion}
                regionName={this.state.fullRegionName}
              />
            </div>
          </div>
        </div>
      )
    }
  }
};

export default USMap;
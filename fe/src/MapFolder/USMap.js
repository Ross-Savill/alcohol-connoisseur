import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap";
import RegionDataTable from './RegionDataTable';
import DrinkerDataTable from './DrinkerDataTable';
import './USMap.css';
import { USStateList } from './USStateList';
const { getCode, getName, getData } = require("country-list");

class USMap extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        downloadedDrinks: null,
        downloadedDrinkers: null,
        worldMapData: null,
        usMapData: null,
        selectedRegion: null,
        fullRegionName: null
      }
  }

  componentDidMount() {
    if(this.props.drinks !== this.state.downloadedDrinks) {
    const currentPropDrinks = this.props.drinks
    console.log(currentPropDrinks)
    const currentPropDrinkers = this.props.drinkers
    this.setState({ downloadedDrinks: currentPropDrinks,
                    downloadedDrinkers: currentPropDrinkers})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPropDrinks = this.state.downloadedDrinks
    const currentPropDrinkers = this.state.downloadedDrinkers

    let usStateData = []

    if(currentPropDrinks === null) {
      return
    } else {

      currentPropDrinks
      .filter(drink => drink.country === "US")
      .map((drink) => {
        if(drink.country === "US") {
          usStateData.push(drink.ukUsa)
        }},
      )
      currentPropDrinks
      .filter(drink => drink.country === "US")
      .map((drink) => {
        if(drink.firstCollabCountry === "US") {
          usStateData.push(drink.firstUkUsa)
        }}
      )
      currentPropDrinks
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

    if(currentPropDrinks !== this.state.drinks) {
      this.setState({ drinks: currentPropDrinks,
                      drinkers: currentPropDrinkers,
                      usMapData: countedUniqueUSStates
                    })
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

  render() {
    if(!this.state.usMapData) {
      return("Please Wait")
    } else {
      return(
        <div className="totalContainer">
          <div className="titleAndInput">
            <h1 className="mainTitle">US States</h1>
          </div>
          <div className="mapAndRegionTable">
            <div className="map">
              <VectorMap
                map="us_aea"
                ref={"map"}
                backgroundColor="#0077be" //change it to ocean blue: #0077be
                zoomOnScroll={false}
                containerStyle={{
                  width: "100%",
                  height: "520px"
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
            <div className="regionDataTable">
              <RegionDataTable
                chosenMap="usa"
                drinks={this.state.drinks}
                regionCode={this.state.selectedRegion}
                regionName={this.state.fullRegionName}
              />
            </div>
          </div>
          <div className="drinkerDataTable">
            <DrinkerDataTable
              chosenMap="usa"
              drinks={this.state.drinks}
              regionCode={this.state.selectedRegion}
              regionName={this.state.fullRegionName}
            />
          </div>
        </div>
      )
    }
  }
};

export default USMap;
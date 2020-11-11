import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap";
import RegionDataTable from './RegionDataTable';
import DrinkerDataTable from './DrinkerDataTable';
import './Maps.css';
import { USStateList } from './USStateList';
const { getCode, getName, getData } = require("country-list");

class Maps extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        worldMapData: null,
        usMapData: null,
        chosenMap: "usa",
        selectedRegion: null,
        fullRegionName: null
      }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPropDrinks = this.props.drinks
    const currentPropDrinkers = this.props.drinkers

    let countryData = []
    let usStateData = []

    currentPropDrinks
      .filter(drink => drink.country !== "Barbados" && drink.country !== "-")
      .map((drink) => {
        if(drink.secondCollabCountry) {
          countryData.push(drink.secondCollabCountry, drink.firstCollabCountry, drink.country)
        } else if (drink.firstCollabCountry) {
          countryData.push(drink.firstCollabCountry, drink.country)
        } else {
          countryData.push(drink.country)
        }
      })

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

    const countedUniqueCountries = countryData.reduce(function(occ, name) {
      occ[name] = (occ[name] || 0) + 1;
      return occ;
    }, {});

    const countedUniqueUSStates = usStateData.reduce(function(occ, name) {
      occ[name] = (occ[name] || 0) + 1;
      return occ;
    }, {});

    if(currentPropDrinks !== this.state.drinks) {
      this.setState({ drinks: currentPropDrinks,
                      drinkers: currentPropDrinkers,
                      worldMapData: countedUniqueCountries,
                      usMapData: countedUniqueUSStates
                    })
      }
  }

  handleCountryClick = (e, countryCode) => {
    this.refs.map.$mapObject.tip.hide();
    const fullRegionName = getName(countryCode)
    this.setState({ selectedRegion: countryCode,
                    fullRegionName
                  })
  };

  handleStateClick = (e, stateCode) => {
    this.refs.map.$mapObject.tip.hide();
    for (const [selectedRegion, fullRegionName] of Object.entries(USStateList)) {
      if (stateCode === selectedRegion) {
        this.setState({ selectedRegion, fullRegionName })
      }
    }
  };

  render() {
    if(!this.state.worldMapData) {
      return("Please Wait")
    } else if(this.state.chosenMap === "world") {
      return(
        <div>
          <h1 className="mainTitle">Drinks Geography</h1>
          <div className="map">
            <VectorMap
              map={"world_mill"}
              ref={"map"}
              backgroundColor="#0077be" //change it to ocean blue: #0077be
              zoomOnScroll={false}
              containerStyle={{
                width: "100%",
                height: "520px"
              }}
              onRegionClick={this.handleCountryClick} //gets the country code
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
                    values: this.state.worldMapData, //this is your data
                    scale: ["#146804"], //your color game's here
                    normalizeFunction: "polynomial"
                  }
                ]
              }}
            />
          </div>
          <div>
            <DrinkerDataTable
              classname="drinkerDataTable"
              drinks={this.state.drinks}
              chosenMap={this.state.chosenMap}
              regionCode={this.state.selectedRegion}
              regionName={this.state.fullRegionName}
            />
          </div>
          <div>
            <RegionDataTable
              className="regionDataTable"
              drinks={this.state.drinks}
              chosenMap={this.state.chosenMap}
              countryCode={this.state.selectedRegion}
              countryName={this.state.fullRegionName}
            />
          </div>
        </div>
      )
    } else if(this.state.chosenMap === "usa") {
      return(
        <div>
          <h1>Drinks Geography</h1>
          <div className="map">
            <VectorMap
              map={"us_aea"}
              ref={"map"}
              backgroundColor="#0077be" //change it to ocean blue: #0077be
              zoomOnScroll={false}
              containerStyle={{
                width: "100%",
                height: "520px"
              }}
              onRegionClick={this.handleStateClick} //gets the country code
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
                },
                selected: {
                  fill: "#2938bc", //color for the clicked country
                },
                selectedHover: {
                  cursor: "pointer"
                }
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
          <div>
            <DrinkerDataTable
              classname="drinkerDataTable"
              drinks={this.state.drinks}
              chosenMap={this.state.chosenMap}
              regionCode={this.state.selectedRegion}
              regionName={this.state.fullRegionName}
            />
          </div>
          <div>
            <RegionDataTable
              className="regionDataTable"
              drinks={this.state.drinks}
              chosenMap={this.state.chosenMap}
              regionCode={this.state.selectedRegion}
              regionName={this.state.fullRegionName}
            />
          </div>
        </div>
      )
    }
  }
};

export default Maps;
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
        downloadedDrinks: null,
        downloadedDrinkers: null,
        worldMapData: null,
        usMapData: null,
        chosenMap: "world",
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
    // const currentPropDrinks = this.props.drinks
    // const currentPropDrinkers = this.props.drinkers
    const currentPropDrinks = this.state.downloadedDrinks
    const currentPropDrinkers = this.state.downloadedDrinkers

    let countryData = []
    let usStateData = []

    if(currentPropDrinks === null) {
      return
    } else {

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
  }

  // handleSelectRegion(region) {
  //   this.setState({ chosenMap: "usa" })
  // }

  chosenMap() {
    const { chosenMap } = this.state
    if(chosenMap === "world") {
      return "world_mill"
    } else if(chosenMap === "usa") {
      return "us_aea"
    }
  }

  chosenMapData() {
    const { chosenMap } = this.state
    if(chosenMap === "world") {
      return this.state.worldMapData
    } else if(chosenMap === "usa") {
      return this.state.usMapData
    }
  }

  handleRegionClick = (e, stateCode) => {
    const { chosenMap } = this.state
    this.refs.map.$mapObject.tip.hide();
    if(chosenMap === "world") {
      const fullRegionName = getName(stateCode)
      this.setState({ selectedRegion: stateCode, fullRegionName })
    } else if(chosenMap === "usa") {
      for (const [selectedRegion, fullRegionName] of Object.entries(USStateList)) {
        if (stateCode === selectedRegion) {
          this.setState({ selectedRegion, fullRegionName })
        }
      }
    }
  };

  render() {
    console.log(this.state.worldMapData)
    if(!this.state.worldMapData) {
      return("Please Wait")
    } else {
      return(
        <div className="totalContainer">
          <div className="titleAndInput">
            <h1 className="mainTitle">Drinks Geography
              {/* <select onChange={this.handleSelectRegion.bind(this)}>
                <option value="world">World</option>
                <option value="usa">USA</option>
              </select> */}
            </h1>
          </div>
          <div className="mapAndRegionTable">
            <div className="map">
              <VectorMap
                map={this.chosenMap()}
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
                      values: this.chosenMapData(), //this is your data
                      scale: ["#146804"], //your color game's here
                      normalizeFunction: "polynomial"
                    }
                  ]
                }}
              />
            </div>
            <div className="regionDataTable">
              <RegionDataTable
                drinks={this.state.drinks}
                chosenMap={this.state.chosenMap}
                regionCode={this.state.selectedRegion}
                regionName={this.state.fullRegionName}
              />
            </div>
          </div>
          <div className="drinkerDataTable">
            <DrinkerDataTable
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
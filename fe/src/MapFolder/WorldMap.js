import React, { Component } from 'react';
import Navbar from '../Navbar';
import { VectorMap } from "react-jvectormap";
import RegionDataTable from './RegionDataTable';
import DrinkerDataTable from './DrinkerDataTable';
import '../Stylesheets/WorldMap.css';
const { getCode, getName, getData } = require("country-list");

class WorldMap extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        worldMapData: null,
        selectedRegion: null,
        fullRegionName: null
      }
  }

  componentDidMount() {
    const { drinks } = this.props
    if(drinks) {
      this.haveDrinks()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks } = this.state
    if(this.props.drinks !== drinks) {
      this.haveDrinks()
    }
  }

  handleRegionClick = (e, stateCode) => {
    this.refs.map.$mapObject.tip.hide();
      const fullRegionName = getName(stateCode)
      this.setState({ selectedRegion: stateCode, fullRegionName })
  };

  haveDrinks = () => {
    const { drinks, drinkers } = this.props
    this.setState({ drinks, drinkers })

    let countryData = []

    drinks
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

    const countedUniqueCountries = countryData.reduce(function(occ, name) {
      occ[name] = (occ[name] || 0) + 1;
      return occ;
    }, {});

    this.setState({ drinks, drinkers,
                      worldMapData: countedUniqueCountries,
    })
  }

  render() {
    if(!this.props.drinks) {
      return("Please Wait")
    } else {
      return(
        <div className="totalContainer">
          <div className="titleAndInput">
            <h1 className="mainTitle">World Map</h1>
            <Navbar />
          </div>
          <div className="mapAndRegionTable">
            <div className="map">
              <VectorMap
                map="world_mill"
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
                      values: this.state.worldMapData, //this is your data
                      scale: ["#146804"], //your color game's here
                      normalizeFunction: "polynomial"
                    }
                  ]
                }}
              />
            </div>
            <div className="regionDataTable">
              <RegionDataTable
                chosenMap="world"
                drinks={this.state.drinks}
                regionCode={this.state.selectedRegion}
                regionName={this.state.fullRegionName}
              />
            </div>
          </div>
          <div className="drinkerDataTable">
            <DrinkerDataTable
              chosenMap="world"
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

export default WorldMap;
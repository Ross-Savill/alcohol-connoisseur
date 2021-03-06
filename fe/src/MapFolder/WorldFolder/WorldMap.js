import React, { Component } from 'react';
import Navbar from '../../MyUtilitiesFolder/Navbar';
import { VectorMap } from "react-jvectormap";
import WorldRegionDataTable from './WorldRegionDataTable';
import WorldDrinkerDataTable from './WorldDrinkerDataTable';
import '../../Stylesheets/WorldPageSS/WorldMap.css';
import LoadingSpin from '../../MyUtilitiesFolder/LoadingSpin';
const { getName } = require("country-list");

class WorldMap extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        worldMapData: null,
        selectedRegion: null,
        fullRegionName: null
      }
      this.resetSelectedCountry = this.resetSelectedCountry.bind(this)
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

  resetSelectedCountry = () => {
    this.setState({ selectedRegion: null, fullRegionName: null })
  }

  haveDrinks = () => {
    const { drinks } = this.props
    this.setState({ drinks })

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

    this.setState({ drinks, worldMapData: countedUniqueCountries,
    })
  }

  render() {
    if(!this.props.drinks) {
      return (
        <div className="worldMapPageLoadingDiv">
          <LoadingSpin />
        </div>
      )
    } else {
      return(
        <div>
          <div className="worldTitleAndNav">
            <h1 className="worldMainTitle">World Map</h1>
            <Navbar />
          </div>
          <div className="worldContainer">
            <div>
              <div className="worldMap">
                <VectorMap
                  map="world_mill"
                  ref={"map"}
                  backgroundColor="#0077be" //change it to ocean blue: #0077be
                  zoomOnScroll={false}
                  containerStyle={{
                    width: "100%",
                    height: "100%"
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
                      fill: "#2938bc",
                    },
                    selectedHover: {}
                  }}
                  regionsSelectable={true}
                  series={{
                    regions: [
                      {
                        values: this.state.worldMapData,
                        scale: ["#146804"],
                        normalizeFunction: "polynomial"
                      }
                    ]
                  }}
                />
              </div>
            </div>
            <div className="worldDrinkerDataTable">
              <WorldDrinkerDataTable
                chosenMap="world"
                drinks={this.state.drinks}
                regionCode={this.state.selectedRegion}
                regionName={this.state.fullRegionName}
                resetSelectedCountry={this.resetSelectedCountry}
              />
            </div>
            <div className="worldRegionDataTable">
                <WorldRegionDataTable
                  chosenMap="world"
                  drinks={this.state.drinks}
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

export default WorldMap;
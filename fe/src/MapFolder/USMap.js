import React, { Component } from 'react';
import Navbar from '../Navbar'
import { VectorMap } from "react-jvectormap";
import USRegionDataTable from './USRegionDataTable';
import USDrinkerDataTable from './USDrinkerDataTable';
import '../Stylesheets/USMap.css';
import { USStateList } from './USStateList';

class USMap extends Component {
  constructor(props) {
    super(props)
    this.handleRegionReset = this.handleRegionReset.bind(this)
      this.state = {
        drinks: null,
        usMapData: null,
        selectedRegion: null,
        fullRegionName: "All States",
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

  haveDrinks = () => {
    const { drinks } = this.props
    this.setState({ drinks })

    let usStateData = []

    drinks
    .filter(drink => drink.country === "US")
    .map((drink) => {
      if(drink.country === "US") {
        usStateData.push(drink.ukUsa)
      }},
    )
    drinks
    .filter(drink => drink.country === "US")
    .map((drink) => {
      if(drink.firstCollabCountry === "US") {
        usStateData.push(drink.firstUkUsa)
      }}
    )
    drinks
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

    if(drinks !== this.state.drinks) {
      this.setState({ drinks, usMapData: countedUniqueUSStates })
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

  render() {
    if(!this.props.drinks) {
      return("Please Wait")
    } else {
      return(
        <div className="totalContainer">
          <div className="titleAndInput">
            <h1 className="mainTitle">US Map</h1>
            <Navbar />
          </div>
          <div className="usMapAndBothTables">
            <div className="usMapAndDrinkersTable">
              <div className="usMap">
                <VectorMap
                  map="us_aea"
                  ref={"map"}
                  backgroundColor="#0077be" //change it to ocean blue: #0077be
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
              <div className="drinkerDataTable">
                <USDrinkerDataTable
                  drinks={this.state.drinks}
                  regionCode={this.state.selectedRegion}
                  regionName={this.state.fullRegionName}
                  handleRegionReset={this.handleRegionReset}
                />
              </div>
            </div>
            <div className="regionDataTable">
              <USRegionDataTable
                chosenMap="usa"
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

export default USMap;
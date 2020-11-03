import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap";
const { getCode, getName, getData } = require("country-list");

class Maps extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        mapData: null
      }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentPropDrinks = this.props.drinks
    const currentPropDrinkers = this.props.drinkers
    if(currentPropDrinks !== this.state.drinks) {
      this.setState({ drinks: currentPropDrinks,
                      drinkers: currentPropDrinkers })
    }
      let countryData = []
      const { drinks } = this.state
      drinks.map((drink) => {
        if(drink.secondCollabCountry) {
          countryData.push(drink.secondCollabCountry, drink.firstCollabCountry, drink.country)
        } else if (drink.firstCollabCountry) {
          countryData.push(drink.firstCollabCountry, drink.country)
        } else {
          countryData.push(drink.country)
        }
      })
      this.setState({ mapData: countryData })

      //TURN THE ABOVE INTO AN OBJECT OF COUNTRY CODES AND NUMBER OF APPEARANCES AS BELOW (not object bit)

      // const countedUniqueDrinkers = whoSaidIt.reduce(function(occ, name) {
      //   occ[name] = (occ[name] || 0) + 1;
      //   return occ;
      // }, {});
      // const useableDrinkerData = [];
      // for(const name in countedUniqueDrinkers) {
      //   useableDrinkerData.push([name, countedUniqueDrinkers[name]]);
      // }
  }

  handleClick = (e, countryCode) => {
    console.log(countryCode);
  };

  render() {
    return(
      <div>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" //change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px"
          }}
          onRegionClick={this.handleClick} //gets the country code
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
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc" //color for the clicked country
            },
            selectedHover: {}
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: mapData, //this is your data
                scale: ["#146804", "#ff0000"], //your color game's here
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>
    )
  }
};

export default Maps;
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const style = {
  height: 30,
  width: "30%",
  border: "1px solid green",
  margin: 2,
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
};

class BreweryScroll extends Component {
  constructor(props) {
    super(props)
      this.state = {
        drinks: null,
        drinkers: null,
        soloBeersAndCiders: null,
        oneCollabBsAndCs: null,
        twoCollabBsandCs: null,
        allBreweries: null
      }
  }

  componentDidMount() {
    const { drinks, drinkers } = this.props
    this.setState({ drinks, drinkers })
  }

  componentDidUpdate(prevProps, prevState) {
    const { drinks, drinkers } = this.props
    if(prevState.drinks !== drinks) {
      this.setState({ drinks, drinkers })

      let twoCollabBsandCs = [];
      let oneCollabBsAndCs = [];
      let soloBeersAndCiders = [];

      drinks.map((drink) => {
        if((drink.drinkType === "Beer" || drink.drinkType === "Cider") && drink.secondCollabCompany !== "" && drink.mixerOne === "") {
          twoCollabBsandCs.push(drink)
        } else if((drink.drinkType === "Beer" || drink.drinkType === "Cider") && drink.firstCollabCompany !== "" && drink.mixerOne === ""){
          oneCollabBsAndCs.push(drink)
        } else if((drink.drinkType === "Beer" || drink.drinkType === "Cider") && drink.mixerOne === "") {
          soloBeersAndCiders.push(drink)
        }
      })
      this.setState({ soloBeersAndCiders, oneCollabBsAndCs, twoCollabBsandCs })
    }
    this.collectBreweries();
  }

  collectBreweries() {
    const { soloBeersAndCiders, oneCollabBsAndCs, twoCollabBsandCs } = this.state
    if(soloBeersAndCiders) {
      // const countedUniqueBreweries = allBeersAndCiders.reduce(function(occ, word) {
      //   occ[word] = (occ[word] || 0) + 1;
      //   return occ;
      // }, {});
      // const sortedUniqueWords = [];
      // for(const word in countedUniqueWords) {
      //   sortedUniqueWords.push([word, countedUniqueWords[word]]);
      // }
      // sortedUniqueWords.sort(function(a, b) {
      //   return b[1] - a[1];
      // });
      // this.setState({ sortedUniqueWords })

      function soloMakers(soloBeersAndCiders, company) {
        var grouped = {};
        for (var i=0; i<soloBeersAndCiders.length; i++) {
          var p = soloBeersAndCiders[i][company];
          if (!grouped[p]) { grouped[p] = []; }
          grouped[p].push(soloBeersAndCiders[i]);
        }
        console.log(grouped);
      }

      function oneCollab(oneCollabBsAndCs, company) {
        var grouped = {};
        for (var i=0; i<oneCollabBsAndCs.length; i++) {
          var p = oneCollabBsAndCs[i][company];
          if (!grouped[p]) { grouped[p] = []; }
          grouped[p].push(oneCollabBsAndCs[i]);
        }
        console.log(grouped);
      }

      function twoCollab(twoCollabBsandCs, company) {
        var grouped = {};
        for (var i=0; i<twoCollabBsandCs.length; i++) {
          var p = twoCollabBsandCs[i][company];
          if (!grouped[p]) { grouped[p] = []; }
          grouped[p].push(twoCollabBsandCs[i]);
        }
        console.log(grouped);
      }
      soloMakers(soloBeersAndCiders, "company")
      oneCollab(oneCollabBsAndCs, "firstCollabCompany")
      twoCollab(twoCollabBsandCs, "secondCollabCompany")
    }
  }

  render() {
    const { soloBeersAndCiders } = this.state
    if(!soloBeersAndCiders) {
      return <p> No Drinks</p>
    } else {
      return(
        <InfiniteScroll
          dataLength={soloBeersAndCiders.length}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          height={500}
          >
          {soloBeersAndCiders.map((drink, index) => (
            <div style={style} key={index}>
              {drink.company}
            </div>
          ))}
        </InfiniteScroll>
      )
    }
  }
}

export default BreweryScroll;
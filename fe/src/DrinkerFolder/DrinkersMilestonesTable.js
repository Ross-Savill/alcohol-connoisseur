import React, { Component } from 'react';
import '../Stylesheets/DrinkersPageSS/DrinkersMilestonesTable.css';
import moment from 'moment';

class DrinkersMilestonesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drinks: null,
      selectedDrinker: null,
      sufficientDrinks: null,
      sessionsAttended: null,
      orderedSessionsByScore: null,
      highestRatedSessions: null,
      lowestRatedSessions: null
    }
  }

  componentDidMount() {
    const { drinks, selectedDrinker } = this.props
    if(this.props.drinks !== this.state.drinks) {
      this.setState({ drinks, selectedDrinker})
    }
  }

  componentDidUpdate() {
    const { drinks, selectedDrinker } = this.props
    if(this.props.drinks !== this.state.drinks) {
      this.setState({ drinks, selectedDrinker})
    }
    let dateCount = []
    this.props.drinks.map((drink) => {
      if(drink.name === selectedDrinker) {
        dateCount.push(drink.date)
      }
    })
    if(this.state.sessionsAttended === null) {
      this.setState({ sessionsAttended: new Set(dateCount) })
    }

    if(this.state.sufficientDrinks === null && new Set(dateCount).size >= 10) {
      this.setState({ sufficientDrinks: true })
    } else if(this.state.sufficientDrinks === null && new Set(dateCount).size < 10) {
      this.setState({ sufficientDrinks: false })
    }
    this.renderTopBottomData()
  }

  renderHighestAvgHeaders() {
    return(
      <tr className="highestAvgHeaderRow">
        <th className="highestAvgTH">Date</th>
        <th className="highestAvgTH">Avg Score</th>
      </tr>
    )
  }

  renderWorstAvgHeaders() {
    return(
      <tr className="lowestAvgHeaderRow">
        <th className="lowestAvgTH">Date</th>
        <th className="lowestAvgTH">Avg Score</th>
      </tr>
    )
  }

  renderTopBottomData() {
    const { drinks, selectedDrinker, sessionsAttended} = this.state
    let sessionScoreArrays = [];
    if(sessionsAttended && sessionsAttended.size > 10) {
      let sessionsAttendedArray = [...sessionsAttended];

      sessionsAttendedArray.map((date) => {
        let sessionArray = [];
        drinks.map((drink) => {
          if(drink.date === date && drink.name === selectedDrinker) {
            sessionArray.push(drink.score)
          }
        })
        const dateAndDrinks = { date: date, avgScore: sessionArray.reduce((a,b) => a + b, 0) / sessionArray.length };
        sessionScoreArrays.push(dateAndDrinks)
      })

      const orderedSessionsByScore = sessionScoreArrays.sort((a, b) => b.avgScore > a.avgScore ? 1 : -1)
      console.log(orderedSessionsByScore)
      let highestSessionCount = 0;
      let topFiveScoreSessions = [];
      let lowestSessionCount = 0;
      let bottomFiveScoreSessions = [];

      orderedSessionsByScore.map((dateWithAvg, i) => {
        if(highestSessionCount === 6) return;
        if(i === orderedSessionsByScore.length - 1) return;
        const nextScore = orderedSessionsByScore[i+1].avgScore
        if(dateWithAvg.avgScore === nextScore) {
          topFiveScoreSessions.push(dateWithAvg)
        } else {
          topFiveScoreSessions.push(dateWithAvg)
          highestSessionCount = highestSessionCount + 1
        }
      })

      orderedSessionsByScore.slice(0).reverse().map((dateWithAvg, i) => {
        if(lowestSessionCount === 6) return;
        if(i === orderedSessionsByScore.length - 1) return;
        const nextScore = orderedSessionsByScore[i+1].avgScore
        if(dateWithAvg.avgScore === nextScore) {
          bottomFiveScoreSessions.push(dateWithAvg)
        } else {
          bottomFiveScoreSessions.push(dateWithAvg)
          lowestSessionCount = lowestSessionCount + 1
        }
      })
      console.log(topFiveScoreSessions)
      if(this.state.highestRatedSessions === null) {
        this.setState({ highestRatedSessions: topFiveScoreSessions,
                        lowestRatedSessions: bottomFiveScoreSessions })
      }
    }
  }

  renderTopRatingData() {
    const { highestRatedSessions } = this.state
    if(highestRatedSessions) {
      return highestRatedSessions.map((dataScoreObj) => {
        return (
          <tr className="milestoneTD" onClick={() => this.props.handleSelectedDate(dataScoreObj.date)}>
            <td>{moment(dataScoreObj.date).format('MMMM Do YYYY')}</td>
            <td>{(dataScoreObj.avgScore).toFixed(2)}</td>
          </tr>
        )
      })
    }
  }

  renderBottomRatingData() {
    const { lowestRatedSessions } = this.state
    if(lowestRatedSessions) {
      return lowestRatedSessions.map((dataScoreObj) => {
        return (
          <tr className="milestoneTD" onClick={() => this.props.handleSelectedDate(dataScoreObj.date)}>
            <td>{moment(dataScoreObj.date).format('MMMM Do YYYY')}</td>
            <td>{(dataScoreObj.avgScore).toFixed(2)}</td>
          </tr>
        )
      })
    }
  }

  render() {
    const { drinks, sufficientDrinks } = this.state
    if(!drinks) {
      return <p>Please Wait</p>
    } else if (sufficientDrinks === false) {
      return <p>Need to attend at least 10 meetups for favourite/ least favourite sessons!</p>
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th className="milestoneDatesHeaderTitle" colSpan="2">Milestone Sessions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="bestDrinksTitleTH" colSpan="2">Top 5 Rated Sessions</th>
            </tr>
            {this.renderHighestAvgHeaders()}
            {this.renderTopRatingData()}
            <tr>
              <th className="worstDrinksTitleTH" colSpan="2">Bottom 5 Rated Sessions</th>
            </tr>
            {this.renderWorstAvgHeaders()}
            {this.renderBottomRatingData()}
          </tbody>
        </table>
      )
    }
  }
}

export default DrinkersMilestonesTable;
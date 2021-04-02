import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import '../../Stylesheets/BoardFolder/AddDrinkForm.css';

class ScoreQ extends React.Component {render() {

  let potentialScores = [];
  for(let score = 0; score <= 10;) {
    potentialScores.push(score)
    score = score + 0.5
  }

  const options = potentialScores.map((score) => {
    return <option key={score} value={score}>{score}</option>
  })

  return (
    <Col>
      <Label className={this.props.score === "" ? "dataNeededLabel" : "questionLabel"}>Score</Label>
      <FormGroup className="formGroupQuestion">
        <Input
          type="select"
          name="score"
          id="scoreInput"
          placeholder="Score"
          value={this.props.score || ""}
          onChange={this.props.handleFormChange}
          className={this.props.score === "" ? "dataNeeded" : "inputField"}
        >
          <option className="placeholder" value="">Select Score:</option>
          {options}
        </Input>
      </FormGroup>
    </Col>
  )
}}

export default ScoreQ;
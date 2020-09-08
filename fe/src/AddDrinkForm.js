import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './AddDrinkForm.css';

class AddDrinkForm extends Component {
  render() {
    return (
      <Container className="AddDrinkFormContainer">
        <h2>Add Drink</h2>
        <Form inline className="addDrinkForm">
          <Col>
            <FormGroup>
              <Label for="personNameInput">Person Name</Label>
              <Input
                type="text"
                name="personNameEntry"
                id="personNameInput"
                placeholder="Drinker's Name"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="mainDrinkComponentInput">Main Drink Component</Label>
              <Input
                type="text"
                name="mainDrinkComponentEntry"
                id="mainDrinkComponentInput"
                placeholder="Main Drink Component"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="drinkTypeInput">Drink Type</Label>
              <Input
                type="select"
                name="drinkTypeEntry"
                id="drinkTypeInput"
                placeholder="Select Drink Type"
              >
                <option>Beer</option>
                <option>Cider</option>
                <option>Wine</option>
                <option>Fortified Wine</option>
                <option>Gin</option>
                <option>Vodka</option>
                <option>Whisky</option>
                <option>Rum</option>
                <option>Brandy</option>
                <option>Liqueur</option>
                <option>Soft Drink</option>
                <option>Other</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="brandNameInput">Brand or Brewery</Label>
              <Input
                type="text"
                name="brandNameEntry"
                id="brandNameInput"
                placeholder="Brand or Brewery Name"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="abvInput">ABV(%)</Label>
              <Input
                type="number"
                name="abvEntry"
                id="abvInput"
                placeholder="Drink ABV(%)"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="mixerOneInput">Mixer One</Label>
              <Input
                type="text"
                name="mixerOneEntry"
                id="mixerOneInput"
                placeholder="Mixer One"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="mixerTwoInput">Mixer Two</Label>
              <Input
                type="text"
                name="mixerTwoEntry"
                id="mixerTwoInput"
                placeholder="Mixer Two"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="garnishInput">Garnish</Label>
              <Input
                type="text"
                name="garnishEntry"
                id="garnishInput"
                placeholder="Garnish"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="ratingWordOneInput">Rating Word One</Label>
              <Input
                type="text"
                name="ratingWordOneEntry"
                id="ratingWordOneInput"
                placeholder="Rating Word One"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="ratingWordTwoInput">Rating Word Two</Label>
              <Input
                type="text"
                name="ratingWordTwoEntry"
                id="ratingWordTwoInput"
                placeholder="Rating Word Two"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="scoreInput">Score</Label>
              <Input
                type="number"
                name="scoreEntry"
                id="scoreInput"
                placeholder="Score"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="notesInput">Notes</Label>
              <Input
                type="textarea"
                name="notesEntry"
                id="notesInput"
                placeholder="Drink notes here"
              />
            </FormGroup>
          </Col>
          <Button>Submit Drink</Button>
        </Form>
      </Container>
    )
  }
}

export default AddDrinkForm;

// class App extends Component {
//   render() {
//     return (
//       <Container className="App">
//         <h2>Sign In</h2>
//         <Form className="form">
//           <Col>
//             <FormGroup>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 id="exampleEmail"
//                 placeholder="myemail@email.com"
//               />
//             </FormGroup>
//           </Col>
//           <Col>
//             <FormGroup>
//               <Label for="examplePassword">Password</Label>
//               <Input
//                 type="password"
//                 name="password"
//                 id="examplePassword"
//                 placeholder="********"
//               />
//             </FormGroup>
//           </Col>
//           <Button>Submit</Button>
//         </Form>
//       </Container>
//     );
//   }
// }
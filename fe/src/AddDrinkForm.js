import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './AddDrinkForm.css';

class AddDrinkForm extends Component {
  render() {
    return (
      <Container className="AddDrinkFormContainer">
        <h2>Add Drink</h2>
        <form className="addDrinkForm">
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
                placeholder="Main Drink Component"
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
              <Label>Drink Type</Label>
              <Input
                type="text"
                name="mainDrinkComponent"
                placeholder="Main Drink Component"
              />
            </FormGroup>
          </Col>
          <input placeholder={"Drink Type"}></input>
          <p>Brand or Brewery</p><input placeholder={"Brand or Brewery"}></input>
          <p>Mixer One</p><input placeholder={"Mixer One"}></input>
          <p>Mixer Two</p><input placeholder={"Mixer Two"}></input>
          <p>Garnish</p><input placeholder={"Garnish"}></input>
          <p>Rating Word One</p><input placeholder={"Rating Word One"}></input>
          <p>Rating Word Two</p><input placeholder={"Rating Word Two"}></input>
          <p>Score</p><input placeholder={"Score"}></input>
        </form>
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
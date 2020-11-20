const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/drinkdb')

const Drinks = require('./models/Drinks')
const PeopleNames = require('./models/PeoplesNames')
const DrinkTypes = require('./models/DrinkTypes')

const app = new express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/drinks', (req,res) => {
  Drinks.find({})
  .then(docs => res.send(docs))
})

app.get('/peoplenames', (req,res) => {
  PeopleNames.find({})
  .then(docs => res.send(docs))
})

app.get('/drinktypes', (req,res) => {
  DrinkTypes.find({})
  .then(docs => res.send(docs))
})

app.listen(port , () => {
  console.log(`listening at http://localhost:${port}`)
})


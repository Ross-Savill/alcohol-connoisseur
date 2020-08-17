const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')


mongoose.connect('mongodb://localhost:27017/drinkdb')

const Drinks = require('./models/Drinks')

const app = new express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/drinks', (req,res) => {
  Drinks.find({})
  .then(docs => res.send(docs))
})

app.get('/drinks/:id', (req,res) =>{
  const id = req.params;
  Drinks.findOne({id})
    .then(doc => res.send(doc))
})

app.listen(port , () => {
  console.log(`listening at http://localhost:${port}`)
})


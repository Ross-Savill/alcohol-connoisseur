const express = require('express');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/drinkdb')

const Drinks = require('./models/drinks')

const app = new express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.get('/', (req,res) => {
  return res.send('hello world from api')
})

app.listen(port , () => {
  console.log(`listening at http://localhost:${port}`)
})


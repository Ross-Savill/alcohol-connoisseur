const mongoose = require('mongoose')

const drinksSchema = new mongoose.Schema({
  name: String,
  date: Date,
  drinkMain: String,
  drinkType: String,
  abv: Number,
  mixerOne: String,
  mixerTwo: String,
  ratingWordOne: String,
  ratingWordTwo: String,
  score: Number,
  brand: String,
  collabOne: String,
  collabTwo: String,
  company: String,
  notes: String
})

module.exports = mongoose.model('Drink', drinksSchema)
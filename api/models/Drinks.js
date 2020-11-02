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
  company: String,
  country: String,
  ukUsa: String,
  firstCollabBrand: String,
  firstCollabCompany: String,
  firstCollabCountry: String,
  firstUkUsa: String,
  secondCollabBrand: String,
  secondCollabCompany: String,
  secondCollabCountry: String,
  secondUkUsa: String,
  collabOne: String,
  collabTwo: String,
  notes: String
})

module.exports = mongoose.model('Drink', drinksSchema)
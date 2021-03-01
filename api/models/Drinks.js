const mongoose = require('mongoose')

const drinksSchema = new mongoose.Schema({
  sessionId: Number,
  name: String,
  date: Date,
  drinkMain: String,
  drinkType: String,
  abv: Number,
  mixerOneBrand: String,
  mixerOne: String,
  mixerTwoBrand: String,
  mixerTwo: String,
  mixerThreeBrand: String,
  mixerThree: String,
  mixerFourBrand: String,
  mixerFour: String,
  mixerFiveBrand: String,
  mixerFive: String,
  mixerSixBrand: String,
  mixerSix: String,
  ratingWordOne: String,
  ratingWordTwo: String,
  score: Number,
  company: String,
  country: String,
  ukUsa: String,
  firstCollabCompany: String,
  firstCollabCountry: String,
  firstUkUsa: String,
  secondCollabCompany: String,
  secondCollabCountry: String,
  secondUkUsa: String,
  notes: String,
  confirmed: Boolean
})

module.exports = mongoose.model('Drink', drinksSchema)
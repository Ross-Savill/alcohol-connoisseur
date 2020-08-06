const Mongoose = require('mongoose')

const drinksSchema = new Mongoose.Schema({
  name: String,
  id: Number,
  date: Date,
  drinkMain: String,
  drinkType: String,
  abv: Number,
  mixerOne: String,
  mixerTwo: String,
  garnish: String,
  ratingWordOne: String,
  ratingWordTwo: String,
  score: Number,
  brand: String,
  collabOne: String,
  collabTwo: String,
  company: String
})

module.exports = mongoose.model('Drink', drinksSchema)
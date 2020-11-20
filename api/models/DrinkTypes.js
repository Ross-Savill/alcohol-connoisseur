const mongoose = require('mongoose')

const drinkTypesSchema = new mongoose.Schema({
  drinkType: String
})

module.exports = mongoose.model('drinktype', drinkTypesSchema)
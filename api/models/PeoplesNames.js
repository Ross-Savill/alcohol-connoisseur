const mongoose = require('mongoose')

const peopleNamesSchema = new mongoose.Schema({
  drinker: String
})

module.exports = mongoose.model('drinker', peopleNamesSchema)
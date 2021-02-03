const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  personName: String,
  title: String
})

module.exports = mongoose.model('user', userSchema)
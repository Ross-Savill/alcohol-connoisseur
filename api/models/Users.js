const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  personName: String,
  request_language: String,
  email_verified: String,
  title: String,
  profilePic: String
})

module.exports = mongoose.model('user', userSchema)
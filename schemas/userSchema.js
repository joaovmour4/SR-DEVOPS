const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: String,
  userName: String,
  userPassword: String,
  userEmail: String,
  userSubsidio: Boolean
});

const User = mongoose.model('User', userSchema)

module.exports = User
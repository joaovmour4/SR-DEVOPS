const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: String,
  userPassword: String,
  _id: String
});

const User = mongoose.model('User', userSchema)

module.exports = User
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const pratoSchema = new Schema({
  _id: String,
  prato: String,
  pratoType: String 
});

const Prato = mongoose.model('Prato', pratoSchema)

module.exports = Prato
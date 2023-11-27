const mongoose = require("mongoose")

const Schema = mongoose.Schema

const menuSchema = new Schema({
  _id: String,
  diaSemana: String,
  prato: String,
  vegetariano: String,
  acompanhamento: Array
});

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const menuSchema = new Schema({
  _id: String,
  diaSemana: String,
  pratoComum: String,
  pratoVegetariano: String,
  acompanhamentos: Array
});

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    _id: String,
    userId: String,
    quantity: Number,
    value: Number,
    purchaseDate: Date
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase
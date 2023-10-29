const { ObjectId, Decimal128, Int32 } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    _id: String,
    userId: String,
    quantity: Number,
    value: Decimal128,
    purchaseDate: Date
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase
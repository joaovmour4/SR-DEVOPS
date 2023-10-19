const { ObjectId, Decimal128, Int32 } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    _id: String,
    userId: ObjectId,
    quantity: Number,
    value: Decimal128,
    purchaseDate: Date
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const userSchema = require('./schemas/userSchema')

const userRoutes = require('./routes/userRoutes')

app.use('/user', userRoutes)

mongoose.set('strictQuery', false)
const mongodb = 'mongodb://127.0.0.1:27017/'

main().catch((err)=>console.log(err))

async function main(){
    await mongoose.connect(mongodb)
}

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})
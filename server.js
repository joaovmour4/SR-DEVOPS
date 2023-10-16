const express = require('express')
const mongoose = require('mongoose')
const swagger = require('swagger-ui-express')
const swaggerFile = require('./api/swagger_output.json')
const app = express()

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const userSchema = require('./schemas/userSchema')

const userRoutes = require('./routes/userRoutes')

app.use('/', userRoutes, swagger.serve, swagger.setup(swaggerFile))

mongoose.set('strictQuery', false)
// Conexão via docker
const mongodb = 'mongodb://mongo:27017/' 
// const mongodb = 'mongodb://127.0.0.1:27017' 

main().catch((err)=>console.log(err))

async function main(){
    await mongoose.connect(mongodb)
}

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})
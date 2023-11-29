const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const swagger = require('swagger-ui-express')
const swaggerFile = require('./api/swagger_output.json')

// Definições do app
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Importando os endpoints
const userRoutes = require('./routes/userRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
const pratoRoutes = require('./routes/pratoRoutes')

// Configurando os middlewares
app.use('/', userRoutes, purchaseRoutes, pratoRoutes)
app.use('/doc', swagger.serve, swagger.setup(swaggerFile))

mongoose.set('strictQuery', false)

// Conexão com o DB
const mongodb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sr-devops.kc3riqy.mongodb.net/?retryWrites=true&w=majority`

async function main(){
    await mongoose.connect(mongodb)
}

main()
.then(
    app.listen(3000, ()=>{
        console.log('server running on port 3000')
    })
)
.catch((err)=>console.log(err))

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

// Configurando os middlewares
app.use('/', userRoutes, purchaseRoutes, swagger.serve, swagger.setup(swaggerFile))

mongoose.set('strictQuery', false)

// Conexão via docker
const mongodb = 'mongodb://mongo:27017/' 

// Conexão local
// const mongodb = 'mongodb://127.0.0.1:27017'

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

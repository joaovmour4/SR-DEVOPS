const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const swagger = require('swagger-ui-express')
const swaggerFile = require('./api/swagger_output.json')
const cors = require('cors')
const helmet = require('helmet')

// Configurando CORS
const corsOptions = {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};


// Definições do app
const app = express()
app.use(cors(corsOptions));
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Importando os endpoints
const userRoutes = require('./routes/userRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
const pratoRoutes = require('./routes/pratoRoutes')
const menuRoutes = require('./routes/menuRoutes')

// Configurando os middlewares
app.use('/', userRoutes, purchaseRoutes, pratoRoutes, menuRoutes)
app.use('/doc', swagger.serve, swagger.setup(swaggerFile))
app.use('*', (req, res)=>{
    return res.status(404).json({message: 'A rota requisitada não existe'})
})

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

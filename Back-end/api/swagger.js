const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const outputFile = './swagger_output.json'
const endpointsFiles = ['../routes/userRoutes.js', '../routes/purchaseRoutes.js']

const doc = {
    info: {
      version: 'v1.0',      // by default: '1.0.0'
      title: 'CRUD RU-UNIFESSPA',        // by default: 'REST API'
      description: 'API CRUD de usuários do sistema de compra de tickets do Restaurante Universitário UNIFESSPA',  // by default: ''
    },
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    }
  };

swaggerAutogen(outputFile, endpointsFiles, doc)
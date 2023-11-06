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
        },
        schemas: {
          User: {
              userId: '1',
              userName: 'John Doe',
              userPassword: 'Password',
              userEmail: 'john.doe@mail.com',
              userSubsidio: true,
              userCargo: 'user',
              userPurchases: [
                '1',
                '2',
                '3'
              ]
          },
          Purchase: {
            _id: '1',
            userId: '1',
            quantity: 1,
            value: 13,
            purchaseDate: '01-01-2023'
        }
      }
    }
  };

swaggerAutogen(outputFile, endpointsFiles, doc)
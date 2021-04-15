const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "Peer Assessment System API",
        description: "Description"
    },
    host: "localhost:3081",
    schemes: ['http']
}

const outputFile = './swaggerDocs.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc);
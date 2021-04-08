const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "Peer Assessment System API",
        description: "Description"
    },
    host: "localhost:3080",
    schemes: ['http']
}

const outputFile = './swaggerDocs.json'
const endpointsFiles = ['./app.js']

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then( () => {
    require('./bin/www');
})
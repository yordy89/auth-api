const app = require('express')()
const swaggerUi = require('swagger-ui-express')

const SwaggerConfig = require('../config/swagger.config')

const oauth2 = require('./oauth2/oauth2.api')
const status = require('./status/status.api')

/**
 * @description Initialize swagger.
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerConfig.getSwaggerDocument()))
app.get('/swagger', (request, response) => response.json(SwaggerConfig.getSwaggerDocument()))

/**
 * @description Add required APIs.
 */
app.use('/oauth2', oauth2)
app.use('/status', status)

module.exports = app

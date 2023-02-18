const OAuth2Server = require('oauth2-server')

const { OAUTH2 } = require('../config/variables.config')
const ModelOAuth2 = require('./model.oauth2')

/**
 * @property {Function} server.token
 * @property {Function} server.authenticate
 */
const server = new OAuth2Server({
  accessTokenLifetime: OAUTH2.ACCESS_TOKEN_LIFETIME,
  model: ModelOAuth2,
  refreshTokenLifetime: OAUTH2.REFRESH_TOKEN_LIFETIME
})

module.exports = server

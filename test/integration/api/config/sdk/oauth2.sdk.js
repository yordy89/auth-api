const { HOST } = require('../variables')

class Oauth2Sdk {
  /**
   * @param {string} authorization
   * @param {Object} payload
   * @returns {Object}
   * @description Add oauth2 token options.
   */
  static addOauth2TokenOptions (authorization, payload) {
    return {
      form: payload,
      headers: { authorization },
      json: true,
      method: 'POST',
      uri: `${HOST}/v1/oauth2/token`
    }
  }

  /**
   * @param {string} accessToken
   * @returns {Object}
   * @description Authenticate.
   */
  static authenticate (accessToken) {
    return {
      headers: { authorization: accessToken },
      json: true,
      uri: `${HOST}/v1/oauth2/authenticate`
    }
  }
}

module.exports = Oauth2Sdk

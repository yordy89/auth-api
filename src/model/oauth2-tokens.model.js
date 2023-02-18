const { Oauth2TokenSchema } = require('@buychain/schema')
const mongoose = require('mongoose')

class OAuth2TokensModel {
  /**
   * @param {Object} payload
   * @returns {Promise<Object>}
   * @description Add oauth2-token.
   */
  static addOauth2Token (payload) {
    return OAuth2TokensModel._model.create(payload)
  }

  /**
   * @param {string} accessToken
   * @returns {Promise<Object>}
   * @description Get oauth2-token by access-token.
   */
  static getOauth2TokenByAccessToken (accessToken) {
    const conditions = { accessToken }

    return OAuth2TokensModel._model.findOne(conditions)
  }

  /**
   * @param {string} refreshToken
   * @returns {Promise<Object>}
   * @description Get oauth2-token by refresh-token.
   */
  static getOauth2TokenByRefreshToken (refreshToken) {
    const conditions = { refreshToken }

    return OAuth2TokensModel._model.findOne(conditions)
  }

  /**
   * @param {string} refreshToken
   * @returns {Promise<void>}
   * @description Delete oauth2-token by refresh-token.
   */
  static async deleteOauth2TokenByRefreshToken (refreshToken) {
    const conditions = { refreshToken }

    await OAuth2TokensModel._model.deleteOne(conditions)
  }
}

OAuth2TokensModel._model = mongoose.model('OAuth2-Tokens', Oauth2TokenSchema)

module.exports = OAuth2TokensModel

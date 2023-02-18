const { Oauth2ClientSchema } = require('@buychain/schema')
const mongoose = require('mongoose')

class Oauth2ClientsModel {
  /**
   * @param {string} clientId
   * @param {string} clientSecret
   * @returns {Promise<Object>}
   * @description Get oauth2-client.
   */
  static getOauth2Client (clientId, clientSecret) {
    const conditions = { clientId, clientSecret }

    return Oauth2ClientsModel._model.findOne(conditions)
  }
}

Oauth2ClientsModel._model = mongoose.model('OAuth2-Clients', Oauth2ClientSchema)

module.exports = Oauth2ClientsModel

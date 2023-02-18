const { LoggerUtil } = require('@buychain/util')
const { Oauth2ClientSchema } = require('@buychain/schema')
const mongoose = require('mongoose')

const { MONGODB } = require('../../config/variables.config')
const { OAuth2ClientsData } = require('./data')

class Seeding {
  /**
   * @returns {Promise<void>}
   * @description Run.
   */
  static async run () {
    try {
      mongoose.set('useCreateIndex', true)
      await mongoose.connect(MONGODB.URL, { useNewUrlParser: true, useUnifiedTopology: true })
      LoggerUtil.info('Successfully connected.')

      await Seeding._insertOAuth2Clients(OAuth2ClientsData)

      LoggerUtil.info('Done.')
      process.exit(0)
    } catch (error) {
      LoggerUtil.error(`Failed to bootstrap storage data: ${error.message}`)
      process.exit(1)
    }
  }

  /**
   * @private
   * @param {Array} oAuth2Clients
   * @returns {Promise<void>}
   * @description Insert oauth2-clients.
   */
  static async _insertOAuth2Clients (oAuth2Clients) {
    if (!oAuth2Clients.length) {
      LoggerUtil.info(' -> No oauth2-clients. Skipping...')
      return
    }

    LoggerUtil.info(' -> Inserting oauth2-clients...')

    await Seeding._oAuth2ClientsModel.create(oAuth2Clients)
  }
}

Seeding._oAuth2ClientsModel = mongoose.model('OAuth2-Clients', Oauth2ClientSchema)

module.exports = Seeding.run()

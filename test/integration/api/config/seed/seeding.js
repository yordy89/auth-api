const { CompanySchema, Oauth2ClientSchema, UserSchema } = require('@buychain/schema')
const { LoggerUtil } = require('@buychain/util')
const mongoose = require('mongoose')

const { MONGODB_URL } = require('../variables')
const { CompaniesData, OAuth2ClientsData, UsersData } = require('./data')

class Seeding {
  /**
   * @returns {Promise<void>}
   * @description Run.
   */
  static async run () {
    try {
      mongoose.set('useCreateIndex', true)
      await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      LoggerUtil.info('Successfully connected.')

      await Seeding._insertCompanies(CompaniesData)
      await Seeding._insertOAuth2Clients(OAuth2ClientsData)
      await Seeding._insertUsers(UsersData)

      LoggerUtil.info('Done.')
      process.exit(0)
    } catch (error) {
      LoggerUtil.error(`Failed to bootstrap storage data: ${error.message}.`)
      process.exit(1)
    }
  }

  /**
   * @private
   * @param {Array} companies
   * @returns {Promise<void>}
   * @description Insert companies.
   */
  static async _insertCompanies (companies) {
    if (!companies.length) {
      LoggerUtil.info(' -> No companies. Skipping...')
      return
    }

    LoggerUtil.info(' -> Inserting companies...')

    await Seeding._companiesModel.create(companies)
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

  /**
   * @private
   * @param {Array} users
   * @returns {Promise<void>}
   * @description Insert users.
   */
  static async _insertUsers (users) {
    if (!users.length) {
      LoggerUtil.info(' -> No users. Skipping...')
      return
    }

    LoggerUtil.info(' -> Inserting users...')

    await Seeding._usersModel.create(users)
  }
}

Seeding._companiesModel = mongoose.model('Companies', CompanySchema)
Seeding._oAuth2ClientsModel = mongoose.model('OAuth2-Clients', Oauth2ClientSchema)
Seeding._usersModel = mongoose.model('Users', UserSchema)

module.exports = Seeding.run()

const mongoose = require('mongoose')

const { LoggerUtil } = require('@buychain/util')

class MongodbStorage {
  /**
   * @param {string} uri
   * @returns {Promise<void>}
   * @description Initiate Mongoose connection and attach event listeners to it.
   */
  static async init (uri) {
    const connectionOptions = {
      keepAlive: true,
      poolSize: 10,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    mongoose.connection.on('connected', MongodbStorage._onConnected)
    mongoose.connection.on('error', MongodbStorage._onError)
    mongoose.connection.on('disconnected', MongodbStorage._onDisconnected)

    await mongoose.connect(uri, connectionOptions)
  }

  /**
   * @description On connected event handler.
   */
  static _onConnected () {
    LoggerUtil.info('Mongoose connection opened.')
  }

  /**
   * @description On disconnected event handler.
   */
  static _onDisconnected () {
    LoggerUtil.error('Mongoose connection disconnected.')
  }

  /**
   * @description On error event handler.
   */
  static _onError (error) {
    LoggerUtil.error(`Mongoose connection error: ${error.message}`)
  }
}

module.exports = MongodbStorage

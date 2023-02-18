const { ExpressErrorHandlerUtil } = require('@buychain/util')
const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const sentry = require('@sentry/node')

const { CORS, DISABLE_REQUEST_LOG, MONGODB, PORT, SENTRY_DSN } = require('./config/variables.config')
const MongodbStorage = require('./storage/mongodb.storage')
const Api = require('./api')
const PackageJson = require('../package.json')

class App {
  /**
   * @constructor
   */
  constructor () {
    this.app = express()
    this.port = PORT
    this.env = this.app.get('env')
  }

  /**
   * @returns {Promise<void>}
   * @description Initialize App.
   */
  async init () {
    this._initRequestTrackerMiddleware()
    this._initRequestLoggerMiddleware()
    this._initCorsMiddleware()
    this._initRequestParserMiddleware()
    this._initCompressionMiddleware()
    await App._initStorage()
    this._initApi()
    this._initErrorTrackerMiddleware()
    this._initErrorHandlerMiddleware()
  }

  /**
   * @private
   * @description Initialize request tracker middleware.
   */
  _initRequestTrackerMiddleware () {
    sentry.init({
      dsn: SENTRY_DSN,
      environment: process.env.NODE_ENV,
      name: PackageJson.name,
      release: PackageJson.version
    })

    this.app.use(sentry.Handlers.requestHandler())
  }

  /**
   * @private
   * @description Initialize request logger middleware.
   */
  _initRequestLoggerMiddleware () {
    DISABLE_REQUEST_LOG !== '1' && this.app.use(morgan('dev'))
  }

  /**
   * @private
   * @description Initialize Cross-origin resource sharing middleware.
   *  Reflect any request that is coming from an origin ending with one specified in configs.
   */
  _initCorsMiddleware () {
    this.app.use(cors({
      allowedHeaders: ['Authorization', 'Content-Type', 'Origin', 'X-Requested-With'],
      credentials: true,
      maxAge: -1,
      methods: ['GET', 'POST', 'OPTIONS'],
      optionsSuccessStatus: 200,
      origin: CORS.ORIGIN
    }))
  }

  /**
   * @private
   * @description Initialize body parser middleware.
   *  Parses the text as URL encoded data.
   */
  _initRequestParserMiddleware () {
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '512kb' }))
  }

  /**
   * @private
   * @description Initialize compression middleware.
   */
  _initCompressionMiddleware () {
    this.app.use(compression())
  }

  /**
   * @private
   * @returns {Promise<void>}
   * @description Initialize storage.
   */
  static async _initStorage () {
    await MongodbStorage.init(MONGODB.URL)
  }

  /**
   * @private
   * @description Initialize API.
   */
  _initApi () {
    this.app.use('/auth/v1', Api)
  }

  /**
   * @private
   * @description Initialize error tracker middleware.
   */
  _initErrorTrackerMiddleware () {
    this.app.use(sentry.Handlers.errorHandler())
  }

  /**
   * @private
   * @description Initialize error handler middleware.
   */
  _initErrorHandlerMiddleware () {
    this.app.use(ExpressErrorHandlerUtil.init)
  }
}

module.exports = new App()

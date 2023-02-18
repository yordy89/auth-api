/* eslint-disable max-lines-per-function */
const http = require('http')

const { LoggerUtil, ProcessVariablesCheckerUtil } = require('@buychain/util')

const App = require('../app')
const { name, engines } = require('../../package')

const init = async () => {
  new ProcessVariablesCheckerUtil(['NPM_TOKEN', 'SENTRY_DSN'], process.env.NODE_ENV, ['production']).check()

  await App.init()

  /**
   * @description Create HTTP server.
   */
  const server = http.createServer(App.app)

  /**
   * @private
   * @param {Error} error
   * @description Event listener for HTTP/HTTPS server "error" event.
   */
  const _onError = (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }

    // Handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
      LoggerUtil.error(`${App.port} requires elevated privileges.`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      LoggerUtil.error(`${App.port} is already in use.`)
      process.exit(1)
      break
    default:
      throw error
    }
  }

  /**
   * @private
   * @description Event listener for HTTP/HTTPS server "listening" event.
   */
  const _onListening = () => {
    LoggerUtil.info(`${name} started:`)
    LoggerUtil.info(` -> Port: ${App.port}.`)
    LoggerUtil.info(` -> Node version: ${process.version}. Recommended version: v${engines.node}.`)
    LoggerUtil.info(` -> Environment: ${App.env}.`)
    LoggerUtil.info(` -> Start date: ${(new Date()).toUTCString()}.`)
  }

  /**
   * @description Listen.
   */
  server.listen(App.port)
  server.on('error', _onError)
  server.on('listening', _onListening)
}

module.exports = init()
  .catch((error) => LoggerUtil.error(error.message))

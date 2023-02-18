const { HOST } = require('../variables')

class StatusSdk {
  /**
   * @returns {Object}
   * @description Get status options.
   */
  static getStatusOptions () {
    return {
      json: true,
      method: 'GET',
      uri: `${HOST}/v1/status`
    }
  }
}

module.exports = StatusSdk

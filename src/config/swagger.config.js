const yaml = require('yamljs')

const { SWAGGER_HOST } = require('./variables.config')
const swaggerDocument = yaml.load('./api/swagger/swagger.yaml')
const PackageJson = require('../../package.json')

class SwaggerConfig {
  /**
   * @returns {Object}
   * @description Get swagger document.
   */
  static getSwaggerDocument () {
    swaggerDocument.host = SWAGGER_HOST.replace('http://', '').replace('https://', '')
    swaggerDocument.info.version = PackageJson.version

    return swaggerDocument
  }
}

module.exports = SwaggerConfig

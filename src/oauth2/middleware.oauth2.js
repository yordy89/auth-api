const OAuth2Server = require('oauth2-server')

const ServerOAuth2 = require('./server.oauth2')

class MiddlewareOAuth2 {
  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Token.
   */
  static async token (request, response, next) {
    request.body.refresh_token = request.body.refreshToken

    const Request = new OAuth2Server.Request(request)
    const Response = new OAuth2Server.Response(response)

    try {
      const token = await ServerOAuth2.token(Request, Response)

      // Swagger-ui expects with underline.
      token.access_token = token.accessToken

      return response.status(201).json(token)
    } catch (error) {
      next(error.inner || error)
    }
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Authenticate.
   */
  static async authenticate (request, response, next) {
    const Request = new OAuth2Server.Request(request)
    const Response = new OAuth2Server.Response(response)
    const { scope } = request.headers

    try {
      const token = await ServerOAuth2.authenticate(Request, Response, { scope })

      return response.status(200).json(token)
    } catch (error) {
      next(error.inner || error)
    }
  }
}

module.exports = MiddlewareOAuth2

const { BcryptUtil, ErrorsUtil } = require('@buychain/util')

const { OAuth2ClientsModel, OAuth2TokensModel, UsersModel } = require('../model')

const { InvalidPasswordError, ResourceNotFoundError, LoginInvalidAccountStateError } = ErrorsUtil

class ModelOAuth2 {
  /**
   * @param {string} clientId
   * @param {string} clientSecret
   * @description Get client.
   */
  static async getClient (clientId, clientSecret) {
    const oauth2Client = await OAuth2ClientsModel.getOauth2Client(clientId, clientSecret)
    if (!oauth2Client) {
      throw new ResourceNotFoundError('The specified client is not found.')
    }

    return {
      grants: oauth2Client.grants,
      id: oauth2Client.clientId
    }
  }

  /**
   * @param {string} username
   * @param {string} password
   * @description Get user.
   */
  static async getUser (username, password) {
    const user = await UsersModel.getUserByUsername(username)
    if (!user) {
      throw new ResourceNotFoundError(`The user with username: ${username} is not found.`)
    }

    const match = await BcryptUtil.compare(password, user.password)
    if (!match) {
      throw new InvalidPasswordError('The specified password is not valid.')
    } else if (!ModelOAuth2.ACCOUNT_VALID_STATES.includes(user.accountState)) {
      const message = `The user accountState should be one of ${ModelOAuth2.ACCOUNT_VALID_STATES}`
      throw new LoginInvalidAccountStateError(message)
    }

    return user
  }

  /**
   * @param {Object} token
   * @param {Object} client
   * @param {object} user
   * @description Save token.
   */
  static async saveToken (token, client, user) {
    const { id: clientId } = client
    const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt } = token

    // Grant admin scope if user has system roles
    const scope = user.systemRoles?.length
      ? user.systemRoles.map((role) => ModelOAuth2.SYSTEM_ROLE_TO_SCOPE[role]).join(',')
      : 'access:member'

    const _user = { companyId: user.companyId, id: user.id }
    const payload = {
      accessToken, accessTokenExpiresAt, client, refreshToken, refreshTokenExpiresAt, scope, user: _user
    }
    await OAuth2TokensModel.addOauth2Token(payload)

    return {
      accessToken,
      accessTokenExpiresAt,
      client: { id: clientId },
      refreshToken,
      refreshTokenExpiresAt,
      scope,
      user: _user
    }
  }

  /**
   * @param {string} accessToken
   * @description Get access-token.
   */
  static async getAccessToken (accessToken) {
    const token = await OAuth2TokensModel.getOauth2TokenByAccessToken(accessToken)
    if (!token) {
      throw new ResourceNotFoundError(`The token with access-token: ${accessToken} is not found.`)
    }

    const { accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, client, user, scope } = token

    return { accessToken, accessTokenExpiresAt, client, refreshToken, refreshTokenExpiresAt, scope, user }
  }

  /**
   * @param {string} refreshToken
   * @returns {Promise<Object>}
   * @description Get refresh-token.
   */
  static async getRefreshToken (refreshToken) {
    const token = await OAuth2TokensModel.getOauth2TokenByRefreshToken(refreshToken)
    if (!token) {
      throw new ResourceNotFoundError(`The token with refresh-token: ${refreshToken} is not found.`)
    }

    const { refreshTokenExpiresAt, client, user, scope } = token

    return { client, refreshToken, refreshTokenExpiresAt, scope, user }
  }

  /**
   * @param {Object} token
   * @returns {Promise<boolean>}
   * @description Revoke token.
   */
  static async revokeToken (token) {
    await OAuth2TokensModel.deleteOauth2TokenByRefreshToken(token.refreshToken)

    return true
  }

  /**
   * @param {Object} token
   * @param {string} scope
   * @returns {boolean}
   * @description Verify scope.
   *  WIll be called only if scope is passed.
   *  Use trim to remove space after comma char that request module sets while sending array in header.
   */
  static verifyScope (token, scope) {
    const requestedScopes = scope.split(',').map((item) => item.trim())
    const authorizedScopes = token.scope.split(',')

    return requestedScopes.some((item) => authorizedScopes.includes(item))
  }
}

ModelOAuth2.ACCOUNT_VALID_STATES = ['WAIT_APPROVAL', 'APPROVED', 'UPDATE_REQUIRED']

ModelOAuth2.SYSTEM_ROLE_TO_SCOPE = {
  ANALYTIC_TEST_USER: 'access:analytic:test:user',
  BILLING_ADMIN: 'access:billing:admin',
  COMPANY_ADMIN: 'access:company:admin'
}

module.exports = ModelOAuth2

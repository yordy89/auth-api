/* eslint-disable max-lines-per-function, max-statements, max-lines, prefer-destructuring */
const RequestPromise = require('request-promise')

const { Oauth2Sdk } = require('./config/sdk')
const { AUTHORIZATION, PASSWORD, USERNAME, USERNAME_2 } = require('./config/variables')

describe('OAuth2 Api: ', () => {
  describe('POST ./oauth2/token.', () => {
    // Initialize payload & options before each test (test suit may modify it, thus should be reinitialized)
    let options, payload
    beforeEach(() => {
      payload = { grant_type: 'password', password: PASSWORD, username: USERNAME }
      options = Oauth2Sdk.addOauth2TokenOptions(AUTHORIZATION, payload)
    })

    test('should be valid. The grant-type is password.', async () => {
      const result = await RequestPromise(options)

      expect(result).toHaveProperty('accessToken')
      expect(result).toHaveProperty('accessTokenExpiresAt')
      expect(result).toHaveProperty('refreshToken')
      expect(result).toHaveProperty('refreshTokenExpiresAt')
      expect(result).toHaveProperty('scope')
      expect(result).toHaveProperty('access_token')

      expect(result).toHaveProperty('client')
      expect(result.client).toBeInstanceOf(Object)
      expect(result.client).toHaveProperty('id')
      expect(Object.keys(result.client).length).toBe(1)

      expect(result).toHaveProperty('user')
      expect(result.user).toBeInstanceOf(Object)
      expect(result.user).toHaveProperty('id')
      expect(result.user).toHaveProperty('companyId')
      expect(Object.keys(result.user).length).toBe(2)

      expect(Object.keys(result).length).toBe(8)
    })

    test('should be valid. The grant-type is password. The username should be case insensitive.', async () => {
      payload.username = USERNAME.toLocaleUpperCase()

      const result = await RequestPromise(options)

      expect(result).toHaveProperty('accessToken')
      expect(result).toHaveProperty('refreshToken')
      expect(result).toHaveProperty('refreshTokenExpiresAt')
      expect(result).toHaveProperty('accessTokenExpiresAt')
      expect(result).toHaveProperty('access_token')
      expect(result).toHaveProperty('scope')

      expect(result).toHaveProperty('client')
      expect(result.client).toBeInstanceOf(Object)
      expect(result.client).toHaveProperty('id')
      expect(Object.keys(result.client).length).toBe(1)

      expect(result).toHaveProperty('user')
      expect(result.user).toBeInstanceOf(Object)
      expect(result.user).toHaveProperty('id')
      expect(result.user).toHaveProperty('companyId')
      expect(Object.keys(result.user).length).toBe(2)

      expect(Object.keys(result).length).toBe(8)
    })

    test('should be valid. The grant-type is refresh_token.', async () => {
      const { refreshToken } = await RequestPromise(options)

      Object.assign(payload, { grant_type: 'refresh_token', refreshToken })
      const options2 = Oauth2Sdk.addOauth2TokenOptions(AUTHORIZATION, payload)
      const result = await RequestPromise(options2)

      expect(result).toHaveProperty('accessToken')
      expect(result).toHaveProperty('accessTokenExpiresAt')
      expect(result).toHaveProperty('refreshToken')
      expect(result).toHaveProperty('refreshTokenExpiresAt')
      expect(result).toHaveProperty('scope')
      expect(result).toHaveProperty('access_token')

      expect(result).toHaveProperty('client')
      expect(result.client).toBeInstanceOf(Object)
      expect(result.client).toHaveProperty('id')
      expect(Object.keys(result.client).length).toBe(1)

      expect(result).toHaveProperty('user')
      expect(result.user).toBeInstanceOf(Object)
      expect(result.user).toHaveProperty('id')
      expect(result.user).toHaveProperty('companyId')
      expect(Object.keys(result.user).length).toBe(2)

      expect(Object.keys(result).length).toBe(8)
    })

    test('should be invalid. Body is specified instead of form.', async () => {
      delete options.form
      options.body = {}

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Invalid request: content must be application/x-www-form-urlencoded',
        status: 400
      })
    })

    test('should be invalid. No authorization is specified.', async () => {
      delete options.headers

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Invalid client: cannot retrieve client credentials',
        status: 400
      })
    })

    test('should be invalid. Invalid authorization is specified.', async () => {
      options.headers.authorization = '3JmdDdpYjZlaDB'

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Invalid client: cannot retrieve client credentials',
        status: 400
      })
    })

    test('should be invalid. The form is missing.', async () => {
      delete options.form

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Invalid request: content must be application/x-www-form-urlencoded',
        status: 400
      })
    })

    test('should be invalid. The grant_type is missing.', async () => {
      delete payload.grant_type

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Missing parameter: `grant_type`',
        status: 400
      })
    })

    test('should be invalid. Invalid grant_type is specified.', async () => {
      payload.grant_type = 'mock'

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Unsupported grant type: `grant_type` is invalid',
        status: 400
      })
    })

    test('should be invalid. The grant-type is password. The user is not found.', async () => {
      payload.username = 'mock-username'

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Not Found',
        message: `The user with username: ${payload.username} is not found.`,
        status: 404
      })
    })

    test('should be invalid. The grant-type is password. The username is missing.', async () => {
      delete payload.username

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Missing parameter: `username`',
        status: 400
      })
    })

    test('should be invalid. The grant-type is password. The specified password is not valid.', async () => {
      payload.password = 'mock-password'

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Unauthorized',
        message: 'The specified password is not valid.',
        status: 401
      })
    })

    test('should be invalid. The grant-type is password. The password is missing.', async () => {
      delete payload.password

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Missing parameter: `password`',
        status: 400
      })
    })

    test('should be invalid. The refresh_token is password. The refreshToken is not specified.', async () => {
      payload.grant_type = 'refresh_token'

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Missing parameter: `refresh_token`',
        status: 400
      })
    })
  })

  describe('GET ./oauth2/authenticate.', () => {
    let accessToken, accessToken2

    beforeAll(async () => {
      const payload = { grant_type: 'password', password: PASSWORD, username: USERNAME }
      const options = Oauth2Sdk.addOauth2TokenOptions(AUTHORIZATION, payload)
      const result = await RequestPromise(options)
      accessToken = result.accessToken

      // Access token for user 2 (system user)
      const payload2 = { grant_type: 'password', password: PASSWORD, username: USERNAME_2 }
      const options2 = Oauth2Sdk.addOauth2TokenOptions(AUTHORIZATION, payload2)
      const result2 = await RequestPromise(options2)
      accessToken2 = result2.accessToken
    })

    // Initialize options before each test (test suit may modify it, thus should be reinitialized)
    let options
    beforeEach(() => {
      options = Oauth2Sdk.authenticate(`Bearer ${accessToken}`)
    })

    test('should be valid.', async () => {
      const result = await RequestPromise(options)

      expect(result).toHaveProperty('accessToken')
      expect(result).toHaveProperty('refreshToken')
      expect(result).toHaveProperty('refreshTokenExpiresAt')
      expect(result).toHaveProperty('accessTokenExpiresAt')
      expect(result).toHaveProperty('scope')

      expect(result).toHaveProperty('client')
      expect(result.client).toBeInstanceOf(Object)
      expect(result.client).toHaveProperty('id')
      expect(Object.keys(result.client).length).toBe(1)

      expect(result).toHaveProperty('user')
      expect(result.user).toBeInstanceOf(Object)
      expect(result.user).toHaveProperty('id')
      expect(result.user).toHaveProperty('companyId')
      expect(Object.keys(result.user).length).toBe(2)

      expect(Object.keys(result).length).toBe(7)
    })

    test('should be valid. Authenticate with scope (BILLING_ADMIN).', async () => {
      options = Oauth2Sdk.authenticate(`Bearer ${accessToken2}`)
      options.headers.scope = ['access:billing:admin']

      const result = await RequestPromise(options)

      expect(result).toHaveProperty('accessToken')
      expect(result).toHaveProperty('refreshToken')
      expect(result).toHaveProperty('refreshTokenExpiresAt')
      expect(result).toHaveProperty('accessTokenExpiresAt')
      expect(result).toHaveProperty('scope', 'access:billing:admin')

      expect(result).toHaveProperty('client')
      expect(result.client).toBeInstanceOf(Object)
      expect(result.client).toHaveProperty('id')
      expect(Object.keys(result.client).length).toBe(1)

      expect(result).toHaveProperty('user')
      expect(result.user).toBeInstanceOf(Object)
      expect(result.user).toHaveProperty('id')
      expect(result.user).toHaveProperty('companyId')
      expect(Object.keys(result.user).length).toBe(2)

      expect(Object.keys(result).length).toBe(7)
    })

    test('should be invalid. The authorization is not specified.', async () => {
      delete options.headers

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Unauthorized',
        message: 'Unauthorized request: no authentication given',
        status: 401
      })
    })

    test('should be invalid. Wrong authorization is specified.', async () => {
      options.headers.authorization = 'Bearer 1b812799c11e5dce38721549f54ada5873cd14f8'

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Not Found',
        message: 'The token with access-token: 1b812799c11e5dce38721549f54ada5873cd14f8 is not found.',
        status: 404
      })
    })

    test('should be invalid. Invalid authorization is specified.', async () => {
      options.headers.authorization = '1b812799c11e5dce38721549f54ada5873cd14f8'

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Bad Request',
        message: 'Invalid request: malformed authorization header',
        status: 400
      })
    })

    test('should be invalid. Insufficient scope is specified.', async () => {
      options.headers.scope = ['access:company:admin']

      expect.assertions(1)
      await expect(RequestPromise(options)).rejects.toHaveProperty('error', {
        code: 'Forbidden',
        message: 'Insufficient scope: authorized scope is insufficient',
        status: 403
      })
    })
  })
})

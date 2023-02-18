const VariablesConfig = require('../../../src/config/variables.config')

describe('config/variables: ', () => {
  describe('config: ', () => {
    test('should have 7 props.', () => {
      expect(Object.keys(VariablesConfig).length).toBe(7)
    })

    test('should have CORS prop.', () => {
      expect(VariablesConfig).toHaveProperty('CORS')
      expect(VariablesConfig.CORS).toHaveProperty('ORIGIN')
      expect(Object.keys(VariablesConfig.CORS).length).toBe(1)
    })

    test('should have DISABLE_REQUEST_LOG prop.', () => {
      expect(VariablesConfig).toHaveProperty('DISABLE_REQUEST_LOG')
    })

    test('should have MONGODB prop.', () => {
      expect(VariablesConfig).toHaveProperty('MONGODB')
      expect(VariablesConfig.MONGODB).toHaveProperty('URL')
      expect(Object.keys(VariablesConfig.MONGODB).length).toBe(1)
    })

    test('should have OAUTH2 prop.', () => {
      expect(VariablesConfig).toHaveProperty('OAUTH2')
      expect(VariablesConfig.OAUTH2).toHaveProperty('ACCESS_TOKEN_LIFETIME')
      expect(VariablesConfig.OAUTH2).toHaveProperty('REFRESH_TOKEN_LIFETIME')
      expect(Object.keys(VariablesConfig.OAUTH2).length).toBe(2)
    })

    test('should have PORT prop.', () => {
      expect(VariablesConfig).toHaveProperty('PORT')
    })

    test('should have SENTRY_DSN prop.', () => {
      expect(VariablesConfig).toHaveProperty('SENTRY_DSN')
    })

    test('should have SWAGGER_HOST prop.', () => {
      expect(VariablesConfig).toHaveProperty('SWAGGER_HOST', 'http://localhost:3010')
    })
  })
})

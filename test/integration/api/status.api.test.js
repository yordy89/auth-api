const RequestPromise = require('request-promise')

const { StatusSdk } = require('./config/sdk')

describe('Status Api: ', () => {
  describe('GET ./status.', () => {
    test('should be valid.', async () => {
      const options = StatusSdk.getStatusOptions()

      const result = await RequestPromise(options)

      expect(result).toHaveProperty('name', 'auth-api')
      expect(result).toHaveProperty('version')
      expect(Object.keys(result).length).toBe(2)
    })
  })
})

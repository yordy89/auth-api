const SwaggerConfig = require('../../../src/config/swagger.config')

describe('config/swagger: ', () => {
  describe('static fns:', () => {
    test('should have 1 static function.', () => {
      expect(SwaggerConfig).toHaveProperty('getSwaggerDocument')
      expect(SwaggerConfig.getSwaggerDocument).toBeInstanceOf(Function)
    })
  })

  describe('static getSwaggerDocument(...):', () => {
    test('should be valid.', () => {
      const result = SwaggerConfig.getSwaggerDocument()

      expect(result).toBeInstanceOf(Object)
      expect(result).toHaveProperty('swagger')
      expect(result).toHaveProperty('info')
      expect(result).toHaveProperty('basePath')
      expect(result).toHaveProperty('consumes')
      expect(result).toHaveProperty('produces')
      expect(result).toHaveProperty('tags')
      expect(result).toHaveProperty('schemes')
      expect(result).toHaveProperty('paths')
      expect(result).toHaveProperty('definitions')

      expect(result).toHaveProperty('host')
      expect(result.host).not.toMatch('http')
      expect(result.host).not.toMatch('https')

      expect(Object.keys(result).length).toBe(10)
    })
  })
})

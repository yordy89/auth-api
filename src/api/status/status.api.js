const router = require('express').Router()

const { name, version } = require('../../../package')

router.get('/',
  (request, response) => response.json({ name, version }))

module.exports = router

const router = require('express').Router()

const OAuth2 = require('../../oauth2')

router.post('/token', OAuth2.token)

router.get('/authenticate', OAuth2.authenticate)

router.get('/testing', (req, res, next) => {
  res.send('Hello World!')
})

module.exports = router

const VariablesConfig = {
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN || '*'
  },
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG || 0,
  MONGODB: {
    URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/buy-chain'
  },
  OAUTH2: {
    // Access - 4 hours, Refresh - 7 days
    ACCESS_TOKEN_LIFETIME: Number(process.env.OAUTH2_ACCESS_TOKEN_LIFETIME) || 60 * 60 * 4,
    REFRESH_TOKEN_LIFETIME: Number(process.env.OAUTH2_REFRESH_TOKEN_LIFETIME) || 60 * 60 * 24 * 7
  },
  PORT: process.env.PORT || '3010',
  SENTRY_DSN: process.env.SENTRY_DSN,
  SWAGGER_HOST: process.env.SWAGGER_HOST || 'http://localhost:3010'
}

module.exports = VariablesConfig

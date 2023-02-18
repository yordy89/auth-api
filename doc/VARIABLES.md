# Variables

Required Environment Variables.

| Variable name                  | Description                  |
|--------------------------------|------------------------------|
| `NPM_TOKEN`                    | Npm token                    |
| `SENTRY_DSN`                   | Sentry DSN                   |

Optional Environment Variables.

| Variable name                   | Description                   | Default                               |
|---------------------------------|-------------------------------|---------------------------------------|
| `CORS_ORIGIN`                   | Cors origin                   | `*`                                   |
| `DISABLE_REQUEST_LOG`           | Disable request log           | `0`                                   |
| `LOG_COLORIZE_ALL`              | Log colorize all              | `false`                               |
| `LOG_LEVEL`                     | Log level                     | `info`                                |
| `MONGODB_URL`                   | Mongodb URL                   | `mongodb://localhost:27017/buy-chain` |
| `NODE_ENV`                      | Node env                      | `development`                         |
| `OAUTH2_ACCESS_TOKEN_LIFETIME`  | OAuth2 access token lifetime  | `14400`                               |
| `OAUTH2_REFRESH_TOKEN_LIFETIME` | OAuth2 refresh token lifetime | `604800`                              |
| `PORT`                          | Port                          | `3010`                                |
| `SWAGGER_HOST`                  | Swagger host                  | `http://localhost:3010`               |

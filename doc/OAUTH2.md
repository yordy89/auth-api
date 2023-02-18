# OAuth2

## Grant

- Grant an application the level of access - endpoint: `./v1/oauth2/token`.
- Grant type: `password`
- Content-Type: `application/x-www-form-urlencoded`
- Authorization: `Basic ....`

### *

- *Access token lifetime: `4 hour`.
- *Authorization `Basic {base64(clientId:clientSecret)}`

# API

API prefix - `/v1`.

| Endpoint              | Method | Parameter     | In     | Required |
|-----------------------|--------|---------------|--------|----------|
| ./oauth2/token        | POST   | authorization | header | ✔        |
|                       |        | username      | form   | ✔        |
|                       |        | password      | form   | ✔        |
|                       |        | grant_type    | form   | ✔        |
| ./oauth2/authenticate | GET    | authorization | header | ✔        |
|                       |        | scope         | header | ✘        |
|                       |        |               |        |          |
| ./status              | GET    |               |        |          |

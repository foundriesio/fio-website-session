An [express-session](https://github.com/expressjs/session) based session handler for express web applications.

It is based on the redis session store.

## How to use it

```JavaScript
import session from '@foundriesio/web-session';

import log from 'log' // Provide a log function.
import redisClient from 'redis-client' // Provide a redis client.

return session(redisClient, log);
```

## Configuration

Via a JSON file with the following structure:

```JSON
{
  "cookie": {
    "domain": "The cookie domain name, defaults to localhost",
    "secure": "If the cookie should be secure (like HTTPS only), defaults to false",
    "maxAge": "The cookie max age, defaults to 3 days"
  },
  "session": {
    "secret": "The server side session secret, defaults to 'taco cat'",
    "prefix": "The previs for the session key, defaults to 'sid:'",
    "name": "The name of the session key, defaults to 'sid'"
  }
}
```

The JSON file can be defined using the `FIO_CONFIG_FILE` environment variable:

```bash
export FIO_CONFIG_FILE="/path/to/config.json"
```

Or using the following environment variable:

- `FIO_COOKIE_DOMAIN`: The cookie domain name, defaults to `localhost` (string).
- `FIO_COOKIE_SECURE`: If the cookie should be secure (HTTPS-only), defaults to `false` (boolean).
- `FIO_COOKIE_MAXAGE`: The cookie max age, defaults to 3 days (string or number, string can also be specified as `3 days`).
- `FIO_SESSION_SECRET`: The server side session secret, defaults to `taco cat` (string).
- `FIO_SESSION_NAME`: The name of the session key, defaults to `sid` (string).
- `FIO_SESSION_PREFIX`: The prefix for the session key, defaults to `sid:` (string).

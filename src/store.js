import connectRedis from 'connect-redis';

import config from './config';

/**
 *
 * @param {Object} session An `express-session` object.
 * @param {Object} client A compatible redis client.
 * @param {Function} log A logger function.
 * @returns A redis store object.
 */
export default function sessionStore(session, client, log) {
  const cfg = config();

  const options = {
    client: client,
    prefix: cfg.get('session').prefix
  };

  if (log) {
    options.logErrors = log.error.bind(log);
  }

  const RedisStore = connectRedis(session);
  return new RedisStore(options);
}

/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import connectRedis from 'connect-redis';

import config from './config.js';

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

/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import expressSession from 'express-session';

import config from './config.js';
import sessionStore from './store.js';

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  rolling: false,
  proxy: true
};

/**
 *
 * @param {Object} client A compatible redis client.
 * @param {Function} log A logger function.
 * @returns An `express-session` session.
 */
export function session(client, log) {
  const cfg = config();

  sessionConfig.name = cfg.get('session').name;
  sessionConfig.secret = cfg.get('session').secret;
  sessionConfig.cookie = {
    httpOnly: true,
    domain: cfg.get('cookie').domain,
    maxAge: cfg.get('cookie').maxAge,
    secure: cfg.get('cookie').secure,
  };

  sessionConfig.store = sessionStore(expressSession, client, log);
  return expressSession(sessionConfig);
}

export default session;

/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import expressSession from 'express-session';

import config from './config';
import sessionStore from './store';

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  rolling: false
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
    domain: cfg.get('cookie').domain,
    secure: cfg.get('cookie').secure,
    maxAge: cfg.get('cookie').maxAge
  };

  sessionConfig.store = sessionStore(expressSession, client, log);
  return expressSession(sessionConfig);
}

export default session;

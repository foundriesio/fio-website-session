/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import convict from 'convict';

const { NODE_ENV } = process.env;

if (NODE_ENV !== 'production') {
  require('dotenv').config();
}

export function config() {
  const cfg = convict({
    config: {
      format: String,
      default: '',
      env: 'FIO_CONFIG_FILE'
    },
    cookie: {
      domain: {
        format: String,
        default: 'localhost',
        env: 'FIO_COOKIE_DOMAIN'
      },
      secure: {
        format: Boolean,
        default: false,
        env: 'FIO_COOKIE_SECURE'
      },
      maxAge: {
        format: 'duration',
        default: 172800000,
        env: 'FIO_COOKIE_MAXAGE'
      }
    },
    session: {
      secret: {
        format: String,
        default: 'taco cat',
        env: 'FIO_SESSION_SECRET'
      },
      name: {
        format: String,
        default: 'sid',
        env: 'FIO_SESSION_NAME'
      },
      prefix: {
        format: String,
        default: 'sid:',
        env: 'FIO_SESSION_PREFIX'
      }
    },
    redis: {
      host: {
        format: String,
        default: 'localhost',
        env: 'FIO_REDIS_HOST'
      },
      port: {
        format: 'port',
        default: 6379,
        env: 'FIO_REDIS_PORT'
      }
    }
  });

  const configFile = cfg.get('config');
  if (configFile) {
    cfg.loadFile(configFile);
  }

  return cfg;
}

export default config;

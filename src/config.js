/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import convict from 'convict';
import convict_format_with_moment from 'convict-format-with-moment';
import convict_format_with_validator from 'convict-format-with-validator';
import json5 from 'json5';

convict.addFormats(convict_format_with_validator);
convict.addFormats(convict_format_with_moment);
convict.addParser({ extension: 'json', parse: json5.parse });

export function config() {
  const cfg = convict({
    config: {
      format: String,
      default: '',
      env: 'FIO_CONFIG_FILE',
    },
    cookie: {
      domain: {
        format: String,
        default: 'localhost',
        env: 'FIO_COOKIE_DOMAIN',
      },
      secure: {
        format: Boolean,
        default: false,
        env: 'FIO_COOKIE_SECURE',
      },
      maxAge: {
        format: 'duration',
        default: 432000000,
        env: 'FIO_COOKIE_MAXAGE',
      },
    },
    session: {
      resave: {
        format: Boolean,
        default: true,
        env: 'FIO_SESSION_RESAVE',
      },
      rolling: {
        format: Boolean,
        default: true,
        env: 'FIO_SESSION_ROLLING',
      },
      secret: {
        format: String,
        default: 'taco cat',
        env: 'FIO_SESSION_SECRET',
      },
      name: {
        format: String,
        default: 'sid',
        env: 'FIO_SESSION_NAME',
      },
      prefix: {
        format: String,
        default: 'sid:',
        env: 'FIO_SESSION_PREFIX',
      },
    },
  });

  const configFile = cfg.get('config');
  if (configFile) {
    cfg.loadFile(configFile);
  }

  cfg.validate();

  return cfg;
}

export default config;

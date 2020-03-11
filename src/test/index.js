const assert = require('assert');
const express = require('express');
const redis = require('redis-mock');
const request = require('supertest');

const { session } = require('../../dist/main');

describe('Tests express-session integration with default values', function() {
  before(function(done) {
    const client = redis.createClient();
    this.appSession = session(client);

    done();
  });

  it('should check default values', function(done) {
    const app = express();
    app.use(this.appSession);

    app.get('/', function(req, res) {
      assert.ok(req.sessionStore);
      assert.ok(req.session);
      assert.ok(req.session.id);
      assert.ok(req.session.cookie);

      assert.strictEqual(req.sessionStore.prefix, 'sid:');
      assert.ok(req.session.cookie.httpOnly);
      assert.ok(!req.session.cookie.secure);
      assert.strictEqual(req.session.cookie.path, '/');

      res.json({ rick: 'wubba lubba dub dub' });
    });

    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('Tests express-session integration with custom values', function() {
  before(function(done) {
    this.env = process.env;

    process.env.FIO_COOKIE_DOMAIN = 'foo';
    process.env.FIO_COOKIE_MAXAGE = '7 days';
    process.env.FIO_SESSION_PREFIX = 'foo';

    const client = redis.createClient();
    this.appSession = session(client);

    done();
  });

  after(function(done) {
    process.env = this.env;
    done();
  });

  it('should check custom values', function(done) {
    const app = express();
    app.use(this.appSession);

    app.get('/', function(req, res) {
      assert.ok(req.sessionStore);
      assert.ok(req.session);
      assert.ok(req.session.id);
      assert.ok(req.session.cookie);

      assert.strictEqual(req.sessionStore.prefix, 'foo');
      assert.ok(req.session.cookie.httpOnly);
      assert.ok(!req.session.cookie.secure);
      assert.strictEqual(req.session.cookie.path, '/');
      assert.strictEqual(req.session.cookie.domain, 'foo');
      assert.strictEqual(req.session.cookie.originalMaxAge, 604800000);

      res.json({ rick: 'wubba lubba dub dub' });
    });

    request(app)
      .get('/')
      .expect(200, done);
  });
});

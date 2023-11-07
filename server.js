require('module-alias/register');

const InitApp = require('./src/InitApp');

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const IP = require('ip');

const config = require('./src/config');
const cuid = require('cuid');
const _ = require('lodash');
const createNamespace = require('cls-hooked').createNamespace;
const sessionName = config.sessionName;
const session = createNamespace(sessionName);

const {
  Logger,
  ErrorHandler: { BaseError, INTERNAL_SERVER_ERROR, PAGE_NOT_FOUND_ERROR },
  reqFormat,
  AuthManager,
} = require('intelli-utility');

const router = require('@routes');

const app = express();

InitApp(app).then(() => {

  app.use(express.json({ limit: '1mb' }));
  app.use(
    express.urlencoded({
      limit: '1mb',
      extended: true,
    }),
  );

  if (!config.isTest) {
    app.use(morgan(reqFormat));
  }

  app.use(cors());

  app.use(AuthManager.decodeAuthToken);


  app.use((req, res, next) => {
    session.run(() => {

      res.locals.sessionId = _.isUndefined(req.headers.sessionid) ? cuid() : req.headers.sessionid;

      try {
        res.locals.clientIp = _.isUndefined(req.headers.clientip)
          ? _.get(req, 'headers.x-forwarded-for', _.get(req, 'headers.X-Forwarded-For', IP.address()))
          : req.headers.clientip;
      } catch (err) {
        console.log(err);
      }

      session.set('sessionId', res.locals.sessionId);
      session.set('clientIp', res.locals.clientIp);
      next();
    });
  });

  app.use(config.node.pathPrefix, router);

  // Todo: handle response with error handler
  app.use((req, res, next) => {
    next(new PAGE_NOT_FOUND_ERROR());
  });

  app.use(async (error, req, res, next) => {
    try {
      if (!(error instanceof BaseError)) {
        throw new INTERNAL_SERVER_ERROR();
      } else throw error;
    } catch (err) {
      await err.handleError(req, res);
    }
  });

  const server = app.listen(config.node.port, async () => {
    Logger.info({ msg: `Base URL: http://${config.node.host}:${config.node.port}${config.node.pathPrefix}` });
  });
  // if (config.isTest) {
  //   // For unit testing
  //   module.exports = app;
  // }
});

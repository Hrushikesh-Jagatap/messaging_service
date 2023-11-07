const express = require('express');

// const timeZoneHandler = require('@common/timeZoneHandler');
const {
  node: { buildNumber },
// eslint-disable-next-line import/no-unresolved
} = require('@config');

const { HttpResponseHandler, Logger: log } = require('intelli-utility');

const v1Routes = require('./v1');

const router = express.Router();

// Health Check
router.get('/healthcheck', (req, res) => {
  log.info({ info: 'inside health check API' });
  const data = {
    ts: new Date(),
    buildNumber,
  };
  return HttpResponseHandler.success(req, res, data);
});

router.use('/v1', v1Routes);

module.exports = router;

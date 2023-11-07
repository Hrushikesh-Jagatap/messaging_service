
const express = require('express');

const router = express.Router();

const { HttpResponseHandler, Logger: log } = require('intelli-utility');

const { FCMController } = require('@controllers/v1');


router.post('/push', async (req, res, next) => {
  log.info({ info: 'Notification route :: inside post api' });
  try {
    const args = req.body;

    const data = await FCMController.sendPush(args);

    HttpResponseHandler.success(req, res, data);
  } catch (error) {
    log.error({ error });
    next(error);
  }
});


router.post('/push/topic', async (req, res, next) => {
  log.info({ info: 'Notification router :: inside post push topic API' });
  try {
    const args = req.body;

    const data = await FCMController.sendPushTopic(args);

    HttpResponseHandler.success(req, res, data);
  } catch (error) {
    log.error({ error });
    next(error);
  }
});


router.get('/', async (req, res, next) => {
  log.info({ info: 'Notification router :: inside get API' });
  try {
    HttpResponseHandler.success(req, res);
  } catch (error) {
    log.error({ error });
    next(error);
  }
});

module.exports = router;

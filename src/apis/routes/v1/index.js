const express = require('express');

const router = express.Router();

const NotificationRouter = require('./Notification');

const FCMRouter = require('./FCM');

router.use('/notification', NotificationRouter);

router.use('/fcm-token', FCMRouter);

module.exports = router;

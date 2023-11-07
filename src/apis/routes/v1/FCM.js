const express = require('express');
const { saveFCMToken } = require('../../controllers/v1/FCM');

const router = express.Router({ mergeParams: true });

router.post('/', saveFCMToken);

module.exports = router;

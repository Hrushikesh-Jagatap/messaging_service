const {
  ErrorHandler: { INTERNAL_SERVER_ERROR },
  HttpResponseHandler, Logger: log
} = require('intelli-utility');

const { FCMService } = require('@services/v1');

const saveFCMToken = async (req, res, next) => {
  log.info({ info: 'FCM controller :: save  FCM token' });
  try {
    const requestBody = req.body;
    const data = await FCMService.saveFCMToken(requestBody);
    HttpResponseHandler.success(req, res, data);
  } catch (error) {
    next(error);
  }
};


const sendPush = async (requestBody) => {

  log.info({ info: 'FCM service :: send push topic' });

  try {
    const {
      userId, title, body, data, appName } = requestBody;
    console.log("user id is", userId)
    return await FCMService.sendPush(userId, title, body, data, appName);
  } catch (error) {
    next(error);
  }
};


const sendPushTopic = async (requestBody) => {
  log.info({ info: 'FCM controller :: send push topic' });
  try {
    const { topic, title, body, data, appName } = requestBody;
    return await FCMService.sendPushTopic(topic, title, body, data, appName);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  saveFCMToken,
  sendPush,
  sendPushTopic,
};











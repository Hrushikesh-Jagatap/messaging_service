const {
  ErrorHandler: { INTERNAL_SERVER_ERROR },
  Logger: log,
} = require('intelli-utility');
const { FCM } = require('@root/src/apis/models');
const admin = require('firebase-admin');
const { firebaseConfig } = require('@config');
const { pushNotificationBadges } = require('@constants');
//const serviceAccount = require('@root/sarvm-ai-firebase-admin.json');
const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});
const saveFCMToken = async (data) => {
  log.info({ info: 'FCM service :: inside save FCM token' });

  try {
    const result = await FCM.findOneAndUpdate(
      {
        userId: data.userId,
        deviceId: data.deviceId,
        appName: data.appName,
      },
      {
        ...data,
      },
      {
        new: true,
        upsert: true,
      },
    );
    return result;
  } catch (err) {
    throw new INTERNAL_SERVER_ERROR(err);
  }
};
const getDeviceTokenByUserId = async (userId, appName) => {
  log.info({ info: 'FCM service :: inside get device token by user id' });

  const deviceIds = await FCM.aggregate([
    { $sort: { updatedAt: -1 } },
    { $match: { userId, appName, fcmToken: { $exists: true } } },
    { $limit: 1 },
    { $project: { fcmToken: 1, updatedAt: 1 } },
  ]);

  if (deviceIds.length) {
    return deviceIds[0].fcmToken;
  }
  return null;
};

const sendPush = async (userId, title, body, data, appName) => {
  log.info({ info: 'FCM service :: send push' });
  try {
    const registrationToken = await getDeviceTokenByUserId(userId, appName);
    let channelId = 'Default_Channel';
    const message = {
      android: {
        notification: {
          body,
          title,
          channelId,
          // badge: pushNotificationBadges(appName),
        },
      },
      token: registrationToken,
      data,
    };
    if (registrationToken) {
      return await admin.messaging().send(message);
    }
    return { success: false, message: 'registrationToken not found' };
  }
  catch (err) {
    console.log(err);
    throw new INTERNAL_SERVER_ERROR(err);
  }
};
const sendPushTopic = async (topic, title, body, data, appName) => {
  log.info({ info: 'FCM service :: send push topic' });
  try {
    const message = {
      notification: {
        body,
        title,
      },
      data: data,
    };

    return await admin.messaging().sendToTopic(topic, message);
  } catch (err) {
    console.log(err);
    throw new INTERNAL_SERVER_ERROR(err);
  }
};

module.exports = {
  saveFCMToken,
  sendPush,
  sendPushTopic,
};

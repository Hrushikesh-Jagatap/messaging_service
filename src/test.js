// const admin = require('firebase-admin'); // how to use 


// const message = {
//     notification: {
//         title: 'Price drop',
//         body: '5% off all electronics'
//     },
//     // data:{
//     //     fr
//     // }

// };
// const registrationToken = "d9hPXQW0TQCkz76_IVYDyr:APA91bEAlYcpGHPzGUSzfAj_C3-3WX91gWCfjqboHBvxDoBOSEGvS2XovWe7IKs_4D9Ml1JcOB-XywTq3laS8tnzZVHh_2S2c9vTXhHk1tOwVGEYJsVB7cmJk3AbX050Em_tW_Ha3Hh-" //fcm token 

// const main = async () => {
//     const result = await admin.messaging().sendToDevice(registrationToken, message);
//     console.log('++++', result);
// };

// main();


// const admin = require('firebase-admin');
// const serviceAccount = require('path/to/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


// async function sendNotification(channelId, message) {
//   const notification = {
//     title: 'Notification Title',
//     body: message
//   };
//   const messageData = {
//     notification,
//     topic: channelId
//   };

//   try {
//     const response = await admin.messaging().send(messageData);
//     console.log('Notification sent successfully:', response);
//   } catch (error) {
//     console.error('Error sending notification:', error);
//   }
// }


// const channelId = 'your-channel-id';
// const message = 'Hello, this is a notification!';
// sendNotification(channelId, message);

// // const getDeviceTokenByUserId = async (userId, appName) => {
// //     log.info({ info: 'FCM service :: inside get device token by user id' });
// //     const deviceIds = await FCM.aggregate([
// //       { $sort: { createdAt: -1 } },
// //       { $match: { userId, appName, fcmToken: { $exists: true } } },
// //       { $limit: 1 },
// //       { $project: { fcmToken: 1, createdAt: 1 } },
// //     ]);

// //     if (deviceIds.length) {
// //       return deviceIds[0].fcmToken;
// //     }
// //     return null;
// //   };

// // const sendPush = async (userId, title, body, data, appName) => {
// //     log.info({ info: 'FCM service :: send push' });
// //     try {
// //       const registrationToken = await getDeviceTokenByUserId(userId, appName);
// //       let channelId = 'Default_Channel';

// //       if (appName === 'retailerApp') {
// //         try {
// //           const orderData = JSON.parse(data?.order);
// //           if (orderData.status === 'NEW') {
// //             channelId = 'New_Orders';
// //           }
// //         } catch (error) {
// //           console.error('Error parsing order data:', error);
// //           throw new INTERNAL_SERVER_ERROR('Error parsing order data');
// //         }
// //       }
// //       const message = {
// //         android: {
// //           notification: {
// //             body,
// //             title,
// //             channelId,
// //             // badge: pushNotificationBadges(appName),
// //           },
// //         },
// //         token: registrationToken,
// //         data,
// //       };
// //       if (registrationToken) {
// //         return await admin.messaging().send(message);
// //       }
// //       return { success: false, message: 'registrationToken not found' };
// //     }
// //     catch (err) {
// //       console.log(err);
// //       throw new INTERNAL_SERVER_ERROR(err);
// //     }
// //   };

// const getDeviceTokenByUserId = async (userId, appName) => {
//   log.info({ info: 'FCM service :: inside get device token by user id' });

//   const deviceIds = await FCM.aggregate([
//     { $sort: { updatedAt: -1 } },
//     { $match: { userId, appName, fcmToken: { $exists: true } } },
//     { $limit: 1 },
//     { $project: { fcmToken: 1, updatedAt: 1 } },
//   ]);

//   if (deviceIds.length) {
//     return deviceIds[0].fcmToken;
//   }
//   return null;
// };


// const sendPush = async (userId, title, body, data, appName) => {
//   log.info({ info: 'FCM service :: send push' });
//   try {
//     const registrationToken = await getDeviceTokenByUserId(userId, appName);
//     let channelId = 'Default_Channel';

//     if (appName === 'retailerApp') {
//       try {
//         let orderData = null;
//         if (data && data.order) orderData = JSON.parse(data.order);
//         if (orderData && orderData.status === 'NEW') {
//           channelId = 'New_Orders';
//         }
//       } catch (error) {
//         console.error('Error parsing order data:', error);
//         throw new INTERNAL_SERVER_ERROR('Error parsing order data');
//       }
//     }
//     const message = {
//       android: {
//         notification: {
//           body,
//           title,
//           channelId,
//           // badge: pushNotificationBadges(appName),
//         },
//       },
//       token: registrationToken,
//       data,
//     };
//     if (registrationToken) {
//       return await admin.messaging().send(message);
//     }
//     return { success: false, message: 'registrationToken not found' };
//   }
//   catch (err) {
//     console.log(err);
//     throw new INTERNAL_SERVER_ERROR(err);
//   }
// };
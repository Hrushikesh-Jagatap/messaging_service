const { boolean } = require('joi');
const mongoose = require('mongoose');

const FCMSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },

  appName: {
    type: 'String',
  },

  deviceId: {
    type: 'String',
  },

  fcmToken: {
    type: 'String',
  },

  active: {
    type: 'Boolean',
    default: false,
  },

  createdBy: {
    type: 'String',
    defalut: null,
  },

  updatedBy: {
    type: 'String',
    defalut: null,
  },
},
  { timestamps: { createdAt: true, updatedAt: true }, versionKey: false },
);
//FCMSchema.index({ userId: 1, appName: 1, deviceId: 1 }, { unique: true });
const FCM = mongoose.model('FCM', FCMSchema, 'fcm');

module.exports = FCM;

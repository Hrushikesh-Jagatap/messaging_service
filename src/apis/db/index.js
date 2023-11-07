/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const FCMModel = require('@models/FCM');
// eslint-disable-next-line import/no-unresolved
const config = require('@config');
const { Logger } = require('intelli-utility');

const { USERNAME, PASSWORD, CLUSTER, url } = config.mongodb;

class db {
  constructor() {
    if (!db.instance) {
      db.instance = this;
    }
    // eslint-disable-next-line no-constructor-return
    return db.instance;
  }

  connect() {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { connection } = mongoose;
    connection.on('error', console.error.bind(console, 'connection error: '));
    connection.once('open', () => {
      Logger.warn('Mongodb Connected successfully');
    });

    this.Fcm = FCMModel;
  }

  static getInstance() {
    return this.instance;
  }
}

module.exports = db;

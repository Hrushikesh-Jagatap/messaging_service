
const { Logger } = require('intelli-utility');
const Db = require('@db');
const init = async (app) => {

  const mongoConnection = new Db();
  mongoConnection.connect();
  // Unhandled Rejections and Exceptions process wide
  process
    .on('unhandledRejection', (reason) => {
      console.log("unhandled rejection is", reason)
      Logger.error({ 'Unhandled Rejection at Promise:': reason });
    })
    .on('uncaughtException', (error) => {
      console.log("unhandled error is", error)
      Logger.error({ 'Uncaught Exception thrown:': error });
      process.exit(1);
    });
};

module.exports = init;

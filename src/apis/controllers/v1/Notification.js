
const { sendSMSOverMessage } = require('@services/v1');

const sendNotification = async ({ phone }) => true;

const sendSMS = async (args) => sendSMSOverMessage(args.phone, args.otp);

const sendEmail = async () => true;
const pushNotification = async () => true;

module.exports = {
  sendNotification,
  sendSMS,
  sendEmail,
  pushNotification,
};

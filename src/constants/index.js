const errorConstants = require('./errorConstants');

const pushNotificationBadges = (appName) => {
  // if(appName === 'retailerApp')
  return 'https://uat-static.sarvm.ai/catalog_images/LOGO.jpg';
};

module.exports = Object.freeze({
  ...errorConstants,
  pushNotificationBadges,
});

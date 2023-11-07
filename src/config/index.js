const { AccessEnv } = require('../common/utility');
const packageJSON = require('../../package.json');

const PACKAGE_VERSION = packageJSON.version;

const ENV = AccessEnv('NODE_ENV'); // Configuration.isTest = process['env']['NODE_ENV'] === 'test'
const BUILD_NUMBER = AccessEnv('BUILD_NUMBER');

const HOST = AccessEnv('HOST');
const HOST_PORT = AccessEnv('HOST_PORT');
const HOST_SERVICE_NAME = AccessEnv('HOST_SERVICE_NAME');

// const apiKey = AccessEnv('apiKey');
// const senderid = AccessEnv('senderid');
// const DLT_TE_ID = AccessEnv('DLT_TE_ID');
// const SmsCampaignId = AccessEnv('SmsCampaignId');
// const url = AccessEnv('url');

// const CallapiKey = AccessEnv('CallapiKey');
// const Callurl = AccessEnv('Callurl');
// const CallCountryCode = AccessEnv('CallCountryCode');
// const CallType = AccessEnv('CallType');
// const CallTemplateId = AccessEnv('CallTemplateId');
const MONGO_URL = AccessEnv('MONGO_URL');
const TYPE = AccessEnv('TYPE');
const PROJECT_ID = AccessEnv('PROJECT_ID');
const PRIVATE_KEY_ID = AccessEnv('PRIVATE_KEY_ID');
const PRIVATE_KEY = AccessEnv('PRIVATE_KEY');
const CLIENT_EMAIL = AccessEnv('CLIENT_EMAIL');
const CLIENT_ID = AccessEnv('CLIENT_ID');
const AUTH_URI = AccessEnv('AUTH_URI');
const TOKEN_URI = AccessEnv('TOKEN_URI');
const AUTH_PROVIDER_X509_CERT_URL = AccessEnv('AUTH_PROVIDER_X509_CERT_URL');
const CLIENT_X509_CERT_URL = AccessEnv('CLIENT_X509_CERT_URL');
const SESSION_NAME = AccessEnv('SESSION_NAME', 'logger_session');

module.exports = {
  packageVersion: PACKAGE_VERSION,
  isTest: ENV === 'test',
  env: ENV, // ['production'].includes(process['env']['NODE_ENV'])
  // apm: 'false', // const apmConfiguration = Configuration.apm;
  node: {
    url: `${HOST}:${HOST_PORT}`,
    pathPrefix: `/${HOST_SERVICE_NAME}/apis`,
    host: HOST,
    port: HOST_PORT,
    serviceName: HOST_SERVICE_NAME,
    buildNumber: BUILD_NUMBER,
  },
  // sms: {
  //   apiKey,
  //   senderid,
  //   DLT_TE_ID,
  //   SmsCampaignId,
  //   url,
  // },
  // call: {
  //   CallapiKey,
  //   Callurl,
  //   CallCountryCode,
  //   CallType,
  //   CallTemplateId,
  // },
  
  mongodb: {
    url: MONGO_URL,
  },
  firebaseConfig: {
    type: TYPE,
    project_id: PROJECT_ID,
    private_key_id: PRIVATE_KEY_ID,
    private_key: PRIVATE_KEY.replace(/\\n/gm, '\n'),
    client_email: CLIENT_EMAIL,
    client_id: CLIENT_ID,
    auth_uri: AUTH_URI,
    token_uri: TOKEN_URI,
    auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: CLIENT_X509_CERT_URL,
  },
  sessionName: SESSION_NAME,
};

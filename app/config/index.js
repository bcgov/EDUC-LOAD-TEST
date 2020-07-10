'use strict';
const nconf = require('nconf');
const path = require('path');
const env = process.env.NODE_ENV;

nconf.argv()
  .env()
  .file({file: path.join(__dirname, `${env}.json`)});
nconf.defaults({
  environment: env,
  studentURL: process.env.STUDENT_API_URL,
  tokenUrl: process.env.TOKEN_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  studentGenerator: {
    maxRecords: process.env.maxRecords, // must be a number
    concurrency: process.env.concurrency // must be a number
  }
});
module.exports = nconf;

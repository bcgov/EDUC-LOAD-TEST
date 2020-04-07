'use strict';
const nconf = require('nconf');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const env = 'local';

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, `${env}.json`) });

module.exports = nconf;

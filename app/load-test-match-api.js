'use strict'
const http = require('http');
const server = http.createServer();
require('./config/index');
server.listen(4000);

const messagePubSub = require('./api/messaging/message-pub-sub');
messagePubSub.init().then(() => {
  const matchApiLoadTestRunner = require('./api/load-test-match-api-runner');
  console.log(new Date().toString());
  matchApiLoadTestRunner.runMatchApiLoad().then(() => {
    console.log(new Date().toString());
    //process.exit(0);
  }).catch((e) => {
    console.log(`match api load test errored out.`);
    console.error(e);
    process.exit(1);
  });
});


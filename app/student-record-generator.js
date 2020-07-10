'use strict'
const http = require('http');
const server = http.createServer();
require('./config/index');
server.listen(8000);
const createStudentBatch = require('./api/create-student');
console.log(new Date().toString());
createStudentBatch.createStudent().then(() => {
  console.log(new Date().toString());
  process.exit(0);
}).catch((e) => {
  console.log(`student record creation batch errored out.`);
  console.error(e);
  process.exit(1);
});


'use strict'

const digitalId = require('./api/digitalId');
const student = require('./api/student');
const config = require('./config');
const util = require('./util');
const http = require('http');
const express = require('express');

const app = express();
const testRuns = 2;

async function loadTest(){
  const jwt = await util.getToken(config.get('digitalId:clientSecret'), config.get('digitalId:clientId'));

  for(let a = 0;a < testRuns; a++){
    digitalId.postDigitalId(jwt, config.get('digitalId:apiEndpoint'));
    student.postStudent(jwt, config.get('student:apiEndpoint'));
  }
}

const server = http.createServer(app);
server.listen(8080);

loadTest();

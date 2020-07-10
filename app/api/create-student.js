'use strict';
const config = require('../config/index');
const loadTest = require('loadtest');
const utils = require('../util');
const faker = require('faker');
const axios = require('axios');
faker.seed(0);
let latestPenFromDB = null;

// noinspection JSUnusedLocalSymbols
function statusCallback(error, result, latency) {
  console.log('Current latency %j, result %j, error %j', latency, result, error);
  console.log('----');
  // noinspection JSUnresolvedVariable
  console.log('Request elapsed milliseconds: ', result.requestElapsed);
  console.log('Request index: ', result.requestIndex);
  // noinspection JSUnresolvedVariable
  console.log('Request loadTest() instance index: ', result.instanceIndex);
}

function randGender() {
  const genders = ['M', 'F'];
  const genderIndex = Math.floor(Math.random() * genders.length);
  const randG = genders[genderIndex];
  return {
    gender: randG,
    genderIndex: genderIndex
  };
}

function randomPostalCode() {
  const postalCodes = ['V8N0A1', 'V8N0A2', 'V8N0A3', 'V8N0A4', 'V8N0A5', 'V8N0A6', 'V8N0A7', 'V8N0A8', 'V8N0A9', 'V8N0B1',
    'V8N0B2', 'V8N0B3', 'V8N0B4', 'V8N0B5', 'V8N0B6', 'V8N0B7', 'V8N1A1', 'V8N1A2', 'V8N1A3', 'V8N1A4', 'V8N1A5', 'V8N1A6',
    'V8N1A7', 'V8N1A8', 'V8N1A9', 'V8N1B3', 'V8N1B4', 'V8N1B5', 'V8N1B6', 'V8N1B7', 'V8N1B8', 'V8N1B9', 'V8N1C1', 'V8N1C2',
    'V8N1C3', 'V8N1C4', 'V8N1C5', 'V8N1C6', 'V8N1C8', 'V8N1C9', 'V8N1E1', 'V8N1E2', 'V8N1E3', 'V8N1E4', 'V8N1E5', 'V8N1E6',
    'V8N1E8', 'V8N1E9', 'V8N1G1', 'V8N1G2', 'V8N1G3', 'V8N1G4', 'V8N1G5', 'V8N1G6', 'V8N1G7', 'V8N1G8', 'V8N1G9', 'V8N1H1',
    'V8N1H2', 'V8N1H3', 'V8N1H4', 'V8N1H5', 'V8N1H6', 'V8N1H7', 'V8N1H8', 'V8N1H9', 'V8N1J1', 'V8N1J2', 'V8N1J3', 'V8N1J4',
    'V8N1J5', 'V8N1J6', 'V8N1J7', 'V8N1J8', 'V8N1J9', 'V8N1K1', 'V8N1K2', 'V8N1K3', 'V8N1K4', 'V8N1K5', 'V8N1K6', 'V8N1K7',
    'V8N1K8', 'V8N1K9', 'V8N1L1', 'V8N1L2', 'V8N1L3'];
  const index = Math.floor(Math.random() * postalCodes.length);
  const randomPS = postalCodes[index];
  return {
    randomPS
  };
}

function randomMinCode() {
  const minCodes = ['08787010', '09155015', '08288028', '07832004', '08484022', '00886006', '07474018', '08787011', '07474019',
    '09393002', '09155005', '05252017', '06060060', '00886018', '03535029', '05959033', '09292007', '06464008', '06060039', '04848027',
    '09361060', '08484031'];
  const index = Math.floor(Math.random() * minCodes.length);
  const minCode = minCodes[index];
  return {
    minCode: minCode
  };
}

function randomFourDigitNumber() {
  const x = 1000;
  const y = 9999;
  return Math.floor(x + (y - x) * Math.random());
}

function randomGradeCode() {
  const gradeCodes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const index = Math.floor(Math.random() * gradeCodes.length);
  const randomGrade = gradeCodes[index];
  return {
    randomGrade: randomGrade
  };
}

function getDOB() {
  const dobRange = faker.date.between('1995-01-01', '2015-01-01');
  let strDate = dobRange.toISOString();
  return strDate.slice(0, -14);
}

function getPenNumber() {
  latestPenFromDB = latestPenFromDB + 1;
  const checkDigit = getCheckDigit(String(latestPenFromDB));
  return latestPenFromDB + '' + checkDigit;
}

function getCheckDigit(penNumberWithoutCheckDigit) {
  const penDigits = [];
  for (let i = 0; i < penNumberWithoutCheckDigit.length; i++) {
    penDigits[i] = parseInt(penNumberWithoutCheckDigit.charAt(i), 10);
  }
  const S1 = penDigits.filter((element, index) => {
    return index % 2 === 0;
  }).reduce((a, b) => a + b, 0);
  const A = parseInt(penDigits.filter((element, index) => {
    return index % 2 === 1;
  }).join(''), 10);
  const B = 2 * A;
  let S2 = B.toString().split('').map(Number).reduce(function (a, b) {
    return a + b;
  }, 0);
  const S3 = S1 + S2;
  if ((S3 % 10) === 0) {
    return 0;
  }
  return 10 - (S3 % 10);
}

function getStudentBody() {
  const gender = randGender().gender;
  const genderCode = gender === 'M' ? 0 : 1;
  // noinspection JSCheckFunctionSignatures
  const firstName = faker.name.firstName(genderCode);
  const middleNames = firstName + faker.name.suffix();
  // noinspection JSCheckFunctionSignatures
  const lastName = faker.name.lastName(genderCode);
  return {
    pen: getPenNumber(), // increment the number and then add the check digit.
    legalFirstName: firstName,
    legalMiddleNames: middleNames,
    legalLastName: lastName,
    dob: getDOB(),
    sexCode: gender,
    genderCode: gender,
    usualFirstName: firstName,
    usualMiddleNames: middleNames,
    usualLastName: lastName,
    postalCode: randomPostalCode().randomPS,
    emailVerified: 'N',
    localID: `A${randomFourDigitNumber()}`,
    gradeCode: `${randomGradeCode().randomGrade}`,
    mincode: `${randomMinCode().minCode}`,
    statusCode: 'A',
    demogCode: 'A',
    createUser: 'student-generator-app',
    updateUser: 'student-generator-app'
  };
}

async function getLatestPenNumberFromDB(token) {
  const url = config.get('studentURL') + '/paginated?pageSize=1&sort={"pen":"DESC"}';
  const params = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const studentResult = await axios.default.get(url, params);
    if (studentResult.data.content && studentResult.data.content[0]) {
      return studentResult.data.content[0].pen;
    }
    return 20000000;
  }catch (e) {
    console.error(e);
    return null;
  }
}

async function createStudent() {
  return new Promise((resolve, reject) => {
    const url = config.get('studentURL');
    const concurrency = config.get('studentGenerator:concurrency');
    const maxRequests = config.get('studentGenerator:maxRecords');
    const tokenUrl = config.get('tokenUrl');
    const clientID = config.get('clientID');
    const clientSecret = config.get('clientSecret');

    if (!url || !concurrency || !maxRequests || !tokenUrl || !clientID || !clientSecret) {
      return reject(`mandatory parameters missing.`);
    }
    utils.getToken(tokenUrl, clientID, clientSecret).then(async (result) => {
      if (!result || !result.access_token) {
        return reject('no access token to continue');
      }
      latestPenFromDB = await getLatestPenNumberFromDB(result.access_token);
      if (latestPenFromDB) {
        latestPenFromDB = Number(latestPenFromDB);
        if (latestPenFromDB < 200000000) {
          latestPenFromDB = 19999999
        } else {
          let penStr = String(latestPenFromDB);
          latestPenFromDB = Number(penStr.substr(0, penStr.length - 1))
          if (latestPenFromDB === 20000000) {
            latestPenFromDB = 19999999
          }
        }
        // noinspection JSUnusedGlobalSymbols
        const options = {
          url: url,
          concurrency: concurrency,
          maxRequests: maxRequests,
          //statusCallback: statusCallback,
          contentType: 'application/json',
          headers: {
            Authorization: `Bearer ${result.access_token}`
          },
          method: 'POST',
          requestGenerator: (params, options, client, callback) => {
            const message = JSON.stringify(getStudentBody());
            options.headers['Content-Type'] = 'application/json';
            const request = client(options, callback);
            request.write(message);
            return request;
          },
        };
        loadTest.loadTest(options, function (error) {
          if (error) {
            console.error('Got an error: %s', error);
            return reject(error);
          }
          console.log('Tests run successfully, process completed.');
          return resolve();
        });
      } else {
        return reject(`pen from DB is null`);
      }

    }).catch((error => {
      return reject(error);
    }))

  });
}

module.exports = {
  createStudent
};

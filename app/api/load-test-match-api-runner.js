'use strict'
const NATS = require('./messaging/message-pub-sub');
const {v4: guid} = require('uuid');
const payloads = [];

async function runMatchApiLoad() {
  payloads.push(`{"pen":null,"dob":"19840126","sex":"M","enrolledGradeCode":"04","surname":"HIRTHE","givenName":"MAYNARD","middleName":null,"usualSurname":"POUROS","usualGivenName":"LOREN","usualMiddleName":null,"mincode":"00807025","localID":"000000007038","postal":"V8N1H9"}`);

  payloads.push(`{"pen":null,"dob":"19610105","sex":"M","enrolledGradeCode":"06","surname":"PFEFFER","givenName":"RESSIE","middleName":null,"usualSurname":"QUITZON","usualGivenName":"GUADALUPE","usualMiddleName":null,"mincode":"00807025","localID":"000000007034","postal":"V8N1J9"}`);

  payloads.push(`{"pen":null,"dob":"19750712","sex":"M","enrolledGradeCode":"02","surname":"KLOCKO","givenName":"MAXIMO","middleName":null,"usualSurname":"RUNOLFSSON","usualGivenName":"VINCENZO","usualMiddleName":null,"mincode":"00807025","localID":"000000007033","postal":"V8N1H3"}`);

  payloads.push(`{"pen":null,"dob":"19610403","sex":"F","enrolledGradeCode":"09","surname":"NADER","givenName":"LAURY","middleName":null,"usualSurname":"NITZSCHE","usualGivenName":"ABBIGAIL","usualMiddleName":null,"mincode":"00807025","localID":"000000007030","postal":"V8N1H8"}`);

  payloads.push(`{"pen":null,"dob":"19720705","sex":"M","enrolledGradeCode":"11","surname":"TOY","givenName":"KEIRA","middleName":null,"usualSurname":"SCHOWALTER","usualGivenName":"KAMREN","usualMiddleName":null,"mincode":"00807025","localID":"000000007035","postal":"V8N1G2"}`);

  payloads.push(`{"pen":null,"dob":"19690828","sex":"M","enrolledGradeCode":"03","surname":"OBERBRUNNER","givenName":"DEJAH","middleName":null,"usualSurname":"FRITSCH","usualGivenName":"ANNIE","usualMiddleName":null,"mincode":"00807025","localID":"000000007029","postal":"V8N0A5"}`);

  payloads.push(`{"pen":null,"dob":"19740621","sex":"M","enrolledGradeCode":"05","surname":"JERDE","givenName":"VIVIAN","middleName":null,"usualSurname":"FISHER","usualGivenName":"JANICK","usualMiddleName":null,"mincode":"00807025","localID":"000000007036","postal":"V8N1G6"}`);

  payloads.push(`{"pen":null,"dob":"19680129","sex":"M","enrolledGradeCode":"04","surname":"PURDY","givenName":"CLEVELAND","middleName":null,"usualSurname":"STAMM","usualGivenName":"ZOIE","usualMiddleName":null,"mincode":"00807025","localID":"000000007037","postal":"V8N1H5"}`);

  payloads.push(`{"pen":null,"dob":"19840109","sex":"M","enrolledGradeCode":"11","surname":"FAHEY","givenName":"FLORINE","middleName":null,"usualSurname":"HILLL","usualGivenName":"GEORGETTE","usualMiddleName":null,"mincode":"00807025","localID":"000000007031","postal":"V8N1C9"}`);

  payloads.push(`{"pen":null,"dob":"19790217","sex":"M","enrolledGradeCode":"SU","surname":"HOPPE","givenName":"WILFREDO","middleName":null,"usualSurname":"MAGGIO","usualGivenName":"VIRGIE","usualMiddleName":null,"mincode":"00807025","localID":"000000007032","postal":"V8N1H2"}`);

  for (let i = 0; i < 100; i++) {
    for (const rec of payloads) {
      runIndividualRecord(rec).then(() => {
        console.info('processed');
      }).catch(()=>{
      });
    }
  }

}

function runIndividualRecord(payload) {
  return new Promise((resolve, reject) => {
    const event = {
      sagaId: guid(), // this should be a guid, otherwise it would break
      eventType: 'PROCESS_PEN_MATCH',
      eventPayload: payload
    };
    console.info('running pen match');
    // since router times out at 30 seconds on vue side, lets timeout at 29 seconds here.
    NATS.requestMessage('PEN_MATCH_API_TOPIC', JSON.stringify(event), 29000).then((result) => {
      return resolve();
    }).catch((e) => {
      console.error(e);

    });
  });

}

module.exports = {
  runMatchApiLoad
};

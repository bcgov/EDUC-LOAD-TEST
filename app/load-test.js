'use strict'

const readline = require('readline');
const digitalId = require('./api/digitalId');
const student = require('./api/student');
const config = require('./config');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
  
rl.question('Input a JWT for the DigitalID API:  ', async (answer) => {
  
  for(var a = 0;a < 10; a++){
    var res = await digitalId.postDigitalId(answer, config.get('digitalId:apiEndpoint'));
    console.log(res);
  }
  
  rl.close();
});

// rl.question('Input a JWT for the Student API:   ', (answer) => {
  
//   for(var a = 0;a < 10; a++){
//     student.postDigitalId(answer, config.get('digitalId:apiEndpoint'));
//   }
  
//   rl.close();
// });

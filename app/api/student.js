const faker = require('faker');
const axios = require('axios');

faker.seed(0);

function randGender(){
  const genders = ['M','F','X','U'];
  const sexes = ['M','F','I','U'];
  const randG = genders[Math.floor(Math.random() * genders.length)];
  const randS = sexes[Math.floor(Math.random() * sexes.length)];
  return {
    gender: randG,
    sex: randS
  };
}

function postStudent(token, url) {
    const rand = randGender();
    const date = faker.date.between('1940-01-01','2017-12-31');
    let strDate = date.toISOString();
    strDate = strDate.slice(0, -14);
    const body = {
      pen: String(faker.random.number({min: 100000000,max: 999999999})),
      legalFirstName: faker.name.firstName(),
      legalMiddleNames: faker.name.firstName(),
      legalLastName: faker.name.lastName(),
      dob: strDate,
      sexCode: rand.sex,
      genderCode: rand.gender,
      usualFirstName: faker.name.firstName(),
      usualMiddleNames: faker.name.firstName(),
      usualLastName: faker.name.lastName(),
      email: faker.internet.email(),
      createUser: 'LOAD-TEST',
      updateUser: 'LOAD-TEST'
    };
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    axios.post(url, body, header).then((response) => {
      console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });
}
  
const student = {
    postStudent
};
  
module.exports = student;
  
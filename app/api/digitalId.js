const axios = require('axios');

function makeid(length) {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function postDigitalId(token, url) {
    const identityValue = makeid(32);
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const data = {
          identityTypeCode: "BCSC",
          identityValue: identityValue,
          lastAccessChannelCode: "OSPR",
          lastAccessDate: "2020-03-04T10:37:00",
          createUser: "LOAD-TEST",
          updateUser: "LOAD-TEST"
    };
    axios.post(url, data, header).then((response) =>{
        console.log(response.data);
    }).catch(function(err){
        console.log(err)
    });
}

const digitalId = {
  postDigitalId
};

module.exports = digitalId;

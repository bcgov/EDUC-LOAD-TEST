const axios = require('axios');

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function postDigitalId(token, url) {
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
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
      axios.post(url, data, header).then(() =>{
        resolve();
      });
    }, 100);
  });
};

const digitalId = {
  postDigitalId
};

module.exports = digitalId;

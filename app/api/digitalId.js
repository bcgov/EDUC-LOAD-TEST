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

async function postDigitalId(token, url) {
    const identityValue = makeid(32);
    try{
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const data = {
            identityTypeCode: "BCSC",
            identityValue: identityValue,
            lastAccessChannelCode: "OSPR",
            lastAccessDate: "2020-03-04T10:37:00"
      };
      const response = await axios.post(url, data,header);
      return response;
    } catch(e){
      console.log('Error posting to DigitalID API - ' + e);
    }
};

const digitalId = {
  postDigitalId
};

module.exports = digitalId;

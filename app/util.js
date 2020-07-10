'use strict';
const axios = require('axios');
async function  getToken(url, clientID, clientSecret) {
  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const data = 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret;
  const response = await axios.post(url, data, params);
  return response.data;
}
const utils= {
    getToken
};

module.exports = utils;

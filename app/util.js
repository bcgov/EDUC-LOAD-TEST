'use strict';

const axios = require('axios');
const config = require('../config/index');

async function getOidcDiscovery() {
    if (!discovery) {
      try {
        const response = await axios.get(config.get('oidc:discovery'));
        discovery = response.data;
      } catch (error) {
        log.error('getOidcDiscovery', `OIDC Discovery failed - ${error.message}`);
      }
    }
    return discovery;
}

async function renew(refreshToken) {
    let result = {};
  
    try {
      const discovery = await getOidcDiscovery();
      const response = await axios.post(discovery.token_endpoint,
        qs.stringify({
          client_id: config.get('oidc:clientId'),
          client_secret: config.get('oidc:clientSecret'),
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          scope: discovery.scopes_supported
        }), {
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
  
      log.verbose('renew', utils.prettyStringify(response.data));
      result.jwt = response.data.access_token;
      result.refreshToken = response.data.refresh_token;
    } catch (error) {
      log.error('renew', error.message);
      result = error.response && error.response.data;
      //window.location.redirect = config.get('server:frontend') + '/api/auth/logout';
    }
    return result;
}

const utils= {
    renew,
    getOidcDiscovery
}

module.exports = utils;

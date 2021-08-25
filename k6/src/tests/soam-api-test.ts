import {check} from "k6";
import * as http from "k6/http";
import {Rate} from "k6/metrics";

// TEST, commented out is DEV
const payloads = ['9A741AE0839C428190E7EC82C55DC5C5' ,
'448CD920E60849F0A3E39F2E0DBE5F9B' ,
'BB79B0582659475AB5CFE041D8D7273E' ,
'6F121F385659443DA48D487B029BA7D1' ,
'2D941F39AE9B4526B4275E482A5695B5' ,
'2E17A4F32BE340918CFAE8A8EC488B75' ,
'4C352CDF0533433EAA4A3CED8D9C6280' ,
'A1F5743BD77B4EF299F0322E1CA0E91F' ,
'AE6A2E9E53DC42229026F13CE37F2217' ,
'1B77E35B0E524D078353E3594282754F' ,
'7596D6B32C2F474085C2EC2937E20EFD' ,
'C540581A2C134CB4A684E8185439823F',
  /*'7596D6B32C2F474085C2EC2937E20EFD',
  '18DC19FC06C049A39778D9CFFB994CAC',
  '9FA17CB263D0488AAFC1B7A719B85853',
  'D409B950F5FE4FC1878007DA9268842A',
  'C93DFC5D46404C7990428EC90BF556ED',
  '650EF719337647C3B9B3EE75F40DB95C',
  '622C858C1C304B8BA045D9F2E9227683',
  'F4EB7D71AC1D4804A7F53A2558042485',
  'B379AC33A9544C468F627B1BBEE35537',
  '8B119FD7C8D643558A278A960D38AAEF',
  '770D2B2B89AB4C6CB149D0536CFFDE1B',
  '70BF3E89132F47ADB5F047012432B15D',
  'A6874F589A084FFFB695ED114CA41F0E',
  '3489EA7A86FE4A7DB08D934F342431BF',
  'E3A2C20E51564B0AAAE6D86A4A9497CA',
  'CE289DA88DFA4124989D6A34B993EC91',
  '4C352CDF0533433EAA4A3CED8D9C6280',
  'B9498BD7DE394AF8BCA35BC33B5CE796',
  'FE0674111B8F4C4CB3006853CCAD6251'*/
]

let config = JSON.parse(open(__ENV.CONFIG));
export const options = config.options;
export let errorRate = new Rate("errors");
export let token;

export function setup() {
  let url = config.soam.rootUrl + config.soam.tokenPath;
  let payload = `grant_type=client_credentials&client_id=${config.soam.clientId}&client_secret=${config.soam.clientSecret}`;

  const params = {
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  let res = http.post(url, payload, params);
  const body = res.json();
  token = body.access_token;
  return token;
}

function checkStatus(response, checkName, statusCodes = [200]) {
  let success = check(response, {
    [checkName]: (r) => {
      if (statusCodes.some(statusCode=> r.status === statusCode)) {
        return true
      } else {
        console.error(checkName + ' failed. Incorrect response code.' + r.status);
        return false;
      }
    }
  });
  errorRate.add(!success, {tag1: checkName});
}

function getToken() {
  return token;
}

let payloadIdx = 0;
export default function (token) {
  payloadIdx++;
  const payload = payloads[payloadIdx % payloads.length];
  let url = `${config["soam-api"].url}/BASIC/${payload}`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'correlationID': 'load-test'
    },
  };
  let res = http.get(url, params);
  checkStatus(res, 'get-soam-login-entity-by-bceid-guid', [200,404]);

}

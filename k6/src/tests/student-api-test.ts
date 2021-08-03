import {check} from "k6";
import * as http from "k6/http";
import {Rate} from "k6/metrics";


const payloads = [100000017,
  100000025,
  100000033,
  100000041,
  100000058,
  100000066,
  100000074,
  100000082,
  100000090,
  100000108,
  100000116,
  100000124,
  100000132,
  100000140,
  100000157,
  100000165,
  100000173,
  100000181,
  100000199,
  100000207,
  100000215,
  100000223,
  100000231,
  100000249,
  100000256,
  100000264,
  100000272,
  100000280,
  100000298,
  100000306,
  100000314,
  100000322,
  100000330,
  100000348,
  100000355,
  100000363,
  100000371,
  100000389,
  100000397,
  100000405,
  100000413,
  100000421,
  100000439,
  100000447,
  100000454,
  100000462,
  100000470,
  100000488,
  100000496,
  100000504,
  100000512,
  100000520,
  100000538,
  100000546,
  100000553,
  100000561,
  100000579,
  100000587,
  100000595,
  100000603,
  100000611,
  100000629,
  100000637,
  100000645,
  100000652,
  100000660,
  100000678,
  100000686,
  100000694,
  100000702,
  100000710,
  100000728,
  100000736,
  100000744,
  100000751,
  100000769,
  100000777,
  100000785,
  100000793,
  100000801,
  100000819,
  100000827,
  100000835,
  100000843,
  100000850,
  100000868,
  100000876,
  100000884,
  100000892,
  100000900,
  100000918,
  100000926,
  100000934,
  100000942,
  100000959,
  100000967,
  100000975,
  100000983,
  100000991,
  100001007

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

function checkStatus(response, checkName, statusCode = 200) {
  let success = check(response, {
    [checkName]: (r) => {
      if (r.status === statusCode) {
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
  const pen = payloads[payloadIdx % payloads.length];
  let url = `${config["student"].url}/api/v1/student?pen=${pen}`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  let res = http.get(url, params);
  checkStatus(res, 'get-student-by-pen', 200);

}

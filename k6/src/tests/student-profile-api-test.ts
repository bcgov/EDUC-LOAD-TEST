import {check} from "k6";
import * as http from "k6/http";
import {Rate} from "k6/metrics";


const payloads = [
  '0a612424-7914-1518-8179-154aca2d0000',
  '0a610ee0-76cb-127d-8176-d59b8598000c',
  '0a610ee0-76cb-127d-8176-d8eecb19000d',
  '0a616a4b-799c-1711-8179-a4a7dac3000a',
  '0a6112ef-7843-1a02-8178-46f3bd6d0002',
  '0a612f03-7703-1a49-8177-6955b2480071',
  '0a614c11-77f5-121c-8178-37982ad40012',
  '0a612424-7914-1518-8179-154aca2d0000',
  '0a614c11-77f5-121c-8178-3c11c3c60014',
  '0a611409-7644-134c-8176-5df4ba4b0008',
  '0a612424-7914-1518-8179-154aca2d0000',
  '0a610ee0-76cb-127d-8176-f3819f700076',
  '0a612424-7914-1518-8179-154aca2d0000',
  '0a610ee0-76cb-127d-8176-fd79acc300a1',
  '0a612424-7914-1518-8179-154aca2d0000',
  '0a614c11-77f5-121c-8178-3807d1140013',
  '0a610ee0-76cb-127d-8176-d8eecb19000d',
  '0a615122-786a-1b6b-8179-00368b000016',
  '0a6112ef-7843-1a02-8178-46de6ccb0001',
  '0a612f03-7703-1a49-8177-17528cbb0007',
  '0a6112ef-7843-1a02-8178-46f3bd6d0002',
  '0a612424-7914-1518-8179-154aca2d0000',
  '0a6112ef-7843-1a02-8178-46f3bd6d0002',
  '0a615122-786a-1b6b-8179-00368b000016',
  '0a612f03-7703-1a49-8177-17528cbb0007'
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
  let url = `${config["student-profile-api"].url}?digitalID=${payload}`;
  let params = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'correlationID': 'load-test'
    },
  };
  let res = http.get(url, params);
  checkStatus(res, 'get-student-profile-request-by-digital-id-guid', [200]);

}

import {check} from "k6";
import * as http from "k6/http";
import {Rate} from "k6/metrics";


const payloads =[
  `{"pen":null,"dob":"19840126","sex":"M","enrolledGradeCode":"04","surname":"HIRTHE","givenName":"MAYNARD","middleName":null,"usualSurname":"POUROS","usualGivenName":"LOREN","usualMiddleName":null,"mincode":"00807025","localID":"000000007038","postal":"V8N1H9"}`,

`{"pen":null,"dob":"19610105","sex":"M","enrolledGradeCode":"06","surname":"PFEFFER","givenName":"RESSIE","middleName":null,"usualSurname":"QUITZON","usualGivenName":"GUADALUPE","usualMiddleName":null,"mincode":"00807025","localID":"000000007034","postal":"V8N1J9"}`,

`{"pen":null,"dob":"19750712","sex":"M","enrolledGradeCode":"02","surname":"KLOCKO","givenName":"MAXIMO","middleName":null,"usualSurname":"RUNOLFSSON","usualGivenName":"VINCENZO","usualMiddleName":null,"mincode":"00807025","localID":"000000007033","postal":"V8N1H3"}`,

`{"pen":null,"dob":"19610403","sex":"F","enrolledGradeCode":"09","surname":"NADER","givenName":"LAURY","middleName":null,"usualSurname":"NITZSCHE","usualGivenName":"ABBIGAIL","usualMiddleName":null,"mincode":"00807025","localID":"000000007030","postal":"V8N1H8"}`,

`{"pen":null,"dob":"19720705","sex":"M","enrolledGradeCode":"11","surname":"TOY","givenName":"KEIRA","middleName":null,"usualSurname":"SCHOWALTER","usualGivenName":"KAMREN","usualMiddleName":null,"mincode":"00807025","localID":"000000007035","postal":"V8N1G2"}`,

`{"pen":null,"dob":"19690828","sex":"M","enrolledGradeCode":"03","surname":"OBERBRUNNER","givenName":"DEJAH","middleName":null,"usualSurname":"FRITSCH","usualGivenName":"ANNIE","usualMiddleName":null,"mincode":"00807025","localID":"000000007029","postal":"V8N0A5"}`,

`{"pen":null,"dob":"19740621","sex":"M","enrolledGradeCode":"05","surname":"JERDE","givenName":"VIVIAN","middleName":null,"usualSurname":"FISHER","usualGivenName":"JANICK","usualMiddleName":null,"mincode":"00807025","localID":"000000007036","postal":"V8N1G6"}`,

`{"pen":null,"dob":"19680129","sex":"M","enrolledGradeCode":"04","surname":"PURDY","givenName":"CLEVELAND","middleName":null,"usualSurname":"STAMM","usualGivenName":"ZOIE","usualMiddleName":null,"mincode":"00807025","localID":"000000007037","postal":"V8N1H5"}`,

`{"pen":null,"dob":"19840109","sex":"M","enrolledGradeCode":"11","surname":"FAHEY","givenName":"FLORINE","middleName":null,"usualSurname":"HILLL","usualGivenName":"GEORGETTE","usualMiddleName":null,"mincode":"00807025","localID":"000000007031","postal":"V8N1C9"}`,

`{"pen":null,"dob":"19790217","sex":"M","enrolledGradeCode":"SU","surname":"HOPPE","givenName":"WILFREDO","middleName":null,"usualSurname":"MAGGIO","usualGivenName":"VIRGIE","usualMiddleName":null,"mincode":"00807025","localID":"000000007032","postal":"V8N1H2"}`
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
        console.error(checkName + ' failed. Incorrect response code.'+ r.status);
        return false;
      }
    }
  });
  errorRate.add(!success, {tag1: checkName});
}
function getToken(){
  return token;
}
let payloadIdx = 0;
export default function (token) {
  payloadIdx++;
  let url = `${config["pen-match"].url}/api/v1/pen-match`;
  const payload =payloads[payloadIdx % payloads.length];
  let params = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(url, payload, params);
  checkStatus(res, 'pen-match', 200);

}

import {check} from "k6";
import * as http from "k6/http";
import {Rate} from "k6/metrics";


const payloads =[
  `{"issueList":[],"isInteractive":true,"transactionID":"0a614c37-7b02-1bae-817b-1766892a0049","localID":"000000007059","submittedPen":"102617537","legalFirstName":"ANITHA","legalMiddleNames":null,"legalLastName":"KWOK","usualFirstName":"HASSIE","usualMiddleNames":null,"usualLastName":"MURAZIK","dob":"19820625","genderCode":"M","gradeCode":"10","postalCode":"V8N1G9","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}`,

`{"issueList":[],"isInteractive":false,"transactionID":"0a614c37-7b02-1bae-817b-1766892a004a","localID":"000000007064","submittedPen":"101218550","legalFirstName":"MATTEO","legalMiddleNames":null,"legalLastName":"OYE","usualFirstName":null,"usualMiddleNames":null,"usualLastName":null,"dob":"19860319","genderCode":"M","gradeCode":"02","postalCode":"V8N0A1","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}`,

`{"issueList":[],"isInteractive":false,"transactionID":"0a614c37-7b02-1bae-817b-176687b90045","localID":"000000007066","submittedPen":"611218547","legalFirstName":"MATILDA","legalMiddleNames":null,"legalLastName":"ANDREWS","usualFirstName":null,"usualMiddleNames":null,"usualLastName":null,"dob":"19840519","genderCode":"F","gradeCode":"06","postalCode":"V8N1G9","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}
`,

`{"issueList":[],"isInteractive":false,"transactionID":"0a614c37-7b02-1bae-817b-176687b90046","localID":"000000007062","submittedPen":"102617586","legalFirstName":"FABIENNE","legalMiddleNames":null,"legalLastName":"BILODEAU","usualFirstName":null,"usualMiddleNames":null,"usualLastName":null,"dob":"19820312","genderCode":"F","gradeCode":"12","postalCode":"V8N1K3","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}
`,

`{"issueList":[],"isInteractive":false,"transactionID":"0a614c37-7b02-1bae-817b-1766891d0048","localID":"000000007063","submittedPen":"102617594","legalFirstName":"DAIANA","legalMiddleNames":null,"legalLastName":"PANG","usualFirstName":null,"usualMiddleNames":null,"usualLastName":null,"dob":"19830118","genderCode":"F","gradeCode":"07","postalCode":"V8N1B7","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}
`,

`{"issueList":[],"isInteractive":true,"transactionID":"0a614c37-7b02-1bae-817b-176687b90044","localID":"000000007060","submittedPen":"102617545","legalFirstName":"GLEN","legalMiddleNames":null,"legalLastName":"GRADY","usualFirstName":"CHELSEA","usualMiddleNames":null,"usualLastName":"REICHERT","dob":"20010222","genderCode":"F","gradeCode":"SU","postalCode":"V8N1J1","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}
`,

`{"issueList":[],"isInteractive":false,"transactionID":"0a614c37-7b02-1bae-817b-176687b90043","localID":"000000007067","submittedPen":"102617701","legalFirstName":"REID","legalMiddleNames":null,"legalLastName":"WANG","usualFirstName":"PORTER","usualMiddleNames":null,"usualLastName":"GUSIKOWSKI","dob":"19811224","genderCode":"M","gradeCode":"07","postalCode":"V8N1C3","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}
`,

`{"issueList":[],"isInteractive":false,"transactionID":"0a6129e0-7b02-1a4e-817b-1766882c0055","localID":"000000007061","submittedPen":"102617560","legalFirstName":"RANDALL","legalMiddleNames":null,"legalLastName":"MAYER","usualFirstName":"THEODORA","usualMiddleNames":null,"usualLastName":"VONRUEDEN","dob":"20020409","genderCode":"M","gradeCode":"01","postalCode":"V8N1G9","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}
`,

`{"issueList":[],"isInteractive":true,"transactionID":"0a6129e0-7b02-1a4e-817b-1766882c0054","localID":"000000007068","submittedPen":"711218547","legalFirstName":"EMILIO","legalMiddleNames":null,"legalLastName":"ROBERTS","usualFirstName":"ALICIA","usualMiddleNames":null,"usualLastName":"LOCKMAN","dob":"19871112","genderCode":"M","gradeCode":"02","postalCode":"V8N1A6","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"00807025","submissionNumber":null}
`,

`{"issueList":[],"isInteractive":true,"transactionID":"0a6129e0-7b02-1a4e-817b-1389c306003f","localID":"FN457QTRZ","submittedPen":null,"legalFirstName":"KURNIAWAN","legalMiddleNames":"SURYA","legalLastName":"KAMAL","usualFirstName":"NUGROHO","usualMiddleNames":"DARMAN","usualLastName":"KAWAYA","dob":"19981225","genderCode":"M","gradeCode":"12","postalCode":"V4Y3V7","assignedPEN":null,"studentID":null,"createUser":"PEN_REQUEST_BATCH_API","updateUser":"PEN_REQUEST_BATCH_API","recordNumber":null,"bestMatchPEN":null,"mincode":"10396672","submissionNumber":null}
`
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
  let url = `${config["pen-services"].url}/validation/student-request`;
  const payload =payloads[payloadIdx % payloads.length];
  let params = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(url, payload, params);
  checkStatus(res, 'validate-student', 200);

}

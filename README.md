# EDUC-LOAD-TEST
Load testing for PEN Registry APIs

## Generating Student TEST DATA

### From the Local Machine.
1. check out the source code, switch to `app` folder.
2. create the local.json file in `app/config` folder and populate these values based on the environment.
3. Make sure `NODE_ENV` is set to `local`
```json
{
  "tokenUrl": "",
  "clientID": "",
  "clientSecret": "",
  "studentURL": "",
  "studentURL1": "",
  "studentGenerator":{
    "maxRecords": 1000,
    "concurrency": 20
  }
} 
```

### From Git Hub Actions.
1. populate these secrets in the git hub repo and then go to
 [here](https://github.com/bcgov/EDUC-LOAD-TEST/actions?query=workflow%3A%22Generate+Student+Records.%22) and click on Run workflow button.
```yaml
  TOKEN_URL: ${{ secrets.TOKEN_URL }}
  CLIENT_ID: ${{ secrets.CLIENT_ID }}
  CLIENT_SECRET: ${{ secrets.CLIENT_SECRET }}
  STUDENT_API_URL: ${{ secrets.STUDENT_API_URL }}
  MAX_RECORDS_GENERATE_STUDENT: ${{ secrets.MAX_RECORDS_GENERATE_STUDENT }}
  CONCURRENCY_GENERATE_STUDENT: ${{ secrets.CONCURRENCY_GENERATE_STUDENT }} 
```


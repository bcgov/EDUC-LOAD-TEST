#k6 run -e CONFIG=/var/opt/config/config.json /var/opt/scripts/pen-match-api-test.ts
#k6 run -e CONFIG=/var/opt/config/config.json /var/opt/scripts/student-api-test.ts
k6 run -e CONFIG=/var/opt/config/config.json /var/opt/scripts/soam-api-test.ts
#k6 run -e CONFIG=/var/opt/config/config.json /var/opt/scripts/pen-request-api-test.ts
#k6 run -e CONFIG=/var/opt/config/config.json /var/opt/scripts/student-profile-api-test.ts
#k6 run -e CONFIG=/var/opt/config/config.json /var/opt/scripts/pen-services-api-test.ts

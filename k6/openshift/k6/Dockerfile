FROM docker-remote.artifacts.developer.gov.bc.ca/loadimpact/k6:latest

WORKDIR /var/opt

COPY /src/tests /var/opt/scripts
COPY /openshift/k6/start.sh /var/opt

ENTRYPOINT [ "sh", "/var/opt/start.sh" ]

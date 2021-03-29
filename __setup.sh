#!/bin/sh

# install dependencies via npm
# npm install -g @axe-devtools/cli webdriver-manager

# update and start webdriver-manager
# webdriver-manager update
# webdriver-manager start

# restore jenkins volume
docker volume create hr-a11y_hra11y-jenkins
docker run --rm -v hr-a11y_hra11y-jenkins:/recover -v $(pwd)/Jenkins/volume_backups:/backup ubuntu bash -c "cd /recover && tar xvf /backup/hra11y-jenkins.tar"
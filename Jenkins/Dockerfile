FROM jenkins/jenkins:lts
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt
# TODO: figure out a way to copy the initial admin password
# RUN cat /usr/share/jenkins/secrets/initialAdminPassword
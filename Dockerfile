# Set the base image to "node" with tag "14".
# This image has node already configured.
FROM node:14

# Set the working directory for any subsequent RUN, CMD, COPY
# and other commands. If the dir does not exist, create it.
WORKDIR /usr/src/app

# Copy files from the local file system into the container's
# filesystem, in the path specified. Since WORKDIR points to
# /usr/src/app, the package*.json will be copied to that dir.
COPY . .

# Logstash install preparation.
RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
RUN apt-get install apt-transport-https
RUN echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-7.x.list

# Install required pacakges.
RUN apt-get update && apt-get install -y \
    logstash

# Install npm dependencies and build app.
RUN npm install
RUN npm run build

# Port 8080 is inteded to be exposed. This line is for doc
# purposes. To actually expose the port, use the option -p
# when running «docker container run».
EXPOSE 8080

# Only one CMD should exist per Dockerfile. It sets the defaults
# of how an executing container is executed.
CMD [ "bash", "start.sh" ]

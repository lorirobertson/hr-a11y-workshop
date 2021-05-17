# FROM ubuntu
FROM node:14

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
ADD .npmrc /usr/src/.npmrc
COPY . /usr/src

# install dependencies
RUN npm install

# start app
EXPOSE 3001
CMD npm run dev
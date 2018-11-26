# pull the latest node docker image
FROM node:slim

# install OS dependencies
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python

# set this folder as the working directory
WORKDIR /usr/src/app

# copy the package.json into our working mkdir
COPY package*.json ./

# copy the rest of the application into our Docker container
COPY . .

# run npm install
RUN npm install

# expose the port that Express is listening on
EXPOSE 3000

# run the application
CMD [ "npm", "start" ]

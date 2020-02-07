FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard to include package-lock.json as well
# COPY package*.json /usr/src/app
COPY package*.json /usr/src/app/
COPY api*.js /usr/src/app/

#RUN npm install -g ts-node
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./controllers /usr/src/app/controllers
COPY ./models /usr/src/app/models
COPY ./public /usr/src/app/public
COPY ./routes /usr/src/app/routes

EXPOSE 3000
CMD [ "node", "api_server.js" ]


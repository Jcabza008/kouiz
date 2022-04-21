# pull official base image
FROM node:16.0.0-alpine

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV HOST_ADDR km-server
ENV HOST_PORT 5000

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@latest --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install expo-cli -g --silent
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
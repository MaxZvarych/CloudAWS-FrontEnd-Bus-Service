# FROM nikolaik/python-nodejs
FROM node:14-alpine3.10

WORKDIR '/app'

RUN apk add g++ make python

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
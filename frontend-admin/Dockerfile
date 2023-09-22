FROM node:16.13.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i 

COPY . .

RUN npm run build

RUN npm install -g serve

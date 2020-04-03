FROM node:12.16-alpine

COPY . /app
WORKDIR /app

CMD npm run start

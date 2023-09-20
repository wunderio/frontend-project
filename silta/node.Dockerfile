FROM wunderio/silta-node:20-alpine-v0.1

COPY . /app

CMD npm run start

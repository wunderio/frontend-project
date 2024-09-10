FROM wunderio/silta-node:22-alpine-v1

COPY . /app

CMD npm run start

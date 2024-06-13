FROM wunderio/silta-node:22-alpine-v1-test20240613

COPY . /app

CMD npm run start

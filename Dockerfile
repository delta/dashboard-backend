FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./server ./server
COPY ./scripts ./scripts
COPY ./tsconfig.json ./tsconfig.json
COPY ./.env ./.env

CMD ["/bin/sh", "/usr/src/app/scripts/docker/entrypoint-prod.sh"]

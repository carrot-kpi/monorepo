FROM --platform=linux/amd64 synthetixio/docker-e2e:18.16-ubuntu as base

RUN mkdir /app
WORKDIR /app

COPY package.json ./

FROM base as test

RUN yarn install
RUN npx playwright install --with-deps
COPY . .
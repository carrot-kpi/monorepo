FROM --platform=linux/amd64 synthetixio/docker-e2e:18.13-ubuntu as base

RUN mkdir /app
WORKDIR /app

COPY package.json ./

RUN yarn install
RUN npx playwright install --with-deps
COPY . .
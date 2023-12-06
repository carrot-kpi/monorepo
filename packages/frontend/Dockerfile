# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 synthetixio/docker-e2e:18.16-ubuntu as base

RUN mkdir /app
WORKDIR /app

RUN apt update && apt install -y nginx

COPY package.json ./

FROM base as test

RUN yarn install

COPY . .
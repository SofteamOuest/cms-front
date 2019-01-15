FROM node:10.15.0-jessie-slim as node

ARG SONAR_TOKEN

MAINTAINER fabien.messager@softeam.fr

WORKDIR /apps/cms-front/

COPY angular.json ./

COPY tsconfig.json ./

COPY tslint.json ./

COPY package.json ./

COPY package-lock.json ./

RUN npm install

RUN npm install -g sonarqube-scanner

RUN npm install -g @angular/cli

COPY src/ src/

RUN ng build

FROM nginx:1.15.7

COPY --from=node /apps/cms-front/dist/* /usr/share/nginx/html/

COPY config/default.conf /tmp/default.template

COPY config/nginx-run.sh nginx-run.sh

RUN mkdir /usr/share/nginx/html/static

EXPOSE 80
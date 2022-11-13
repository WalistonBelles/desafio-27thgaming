# Dockerfile
FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/web_app
WORKDIR /usr/src/web_app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/web_app/
RUN yarn install
RUN yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]
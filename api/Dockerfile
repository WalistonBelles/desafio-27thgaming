FROM node:16-alpine

WORKDIR /home/api
COPY package*.json yarn.* ./
RUN chown -R root:root /home/api/
RUN yarn install
COPY . .

EXPOSE 3333
CMD [ "yarn", "dev" ]
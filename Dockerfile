# Common build stage
FROM node:14.14.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000 3306

CMD [ "npm", "run", "start"];

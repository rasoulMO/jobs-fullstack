FROM node:14 as base

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY . /app

RUN npm install

CMD ["npm", "start"]
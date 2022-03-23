FROM node:14 as base

WORKDIR /app

COPY package.json ./

RUN npm i 

COPY . .

CMD /wait-for-it.sh mysql_server:3306 

EXPOSE 8080

# FROM base as production

# ENV NODE_PATH=./server/build

# RUN npm run build
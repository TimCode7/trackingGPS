FROM node:lts-alpine

WORKDIR /kafka/producer

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "producer.js"]

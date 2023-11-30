FROM node:lts-alpine

WORKDIR /kafka/consumer

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "consumer.js"]

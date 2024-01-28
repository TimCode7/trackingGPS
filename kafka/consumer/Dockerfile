FROM node:lts-alpine

WORKDIR /kafka/consumer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "consumer.js"]

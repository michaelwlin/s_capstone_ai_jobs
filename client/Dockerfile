FROM node:lts-alpine3.18

ENV NODE_VERSION 20.11.0

RUN addgroup app && adduser -S -G app app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
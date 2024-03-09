FROM node:lts-alpine3.18

ENV NODE_VERSION 20.11.0

RUN addgroup app && adduser -S -G app app

WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules && npm install --loglevel=info

COPY . .

EXPOSE 4000
EXPOSE 5000

CMD ["npm", "start"]
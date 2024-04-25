
# Alpine is chosen for its small footprint compared to Debian
FROM node:lts-alpine3.18

ENV NODE_VERSION 20.11.0

# Create a directory to hold the application code inside the image
WORKDIR /app

# Copies package.json
COPY package*.json ./

# Install app dependencies
RUN npm install --loglevel=info

# Bundle app source inside Docker image
COPY . .

# Heroku dynamically assigns a port 
EXPOSE $PORT

CMD ["npm", "start"]
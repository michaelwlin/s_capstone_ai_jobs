# Use the official lightweight Node.js 16 image.
# Alpine is chosen for its small footprint compared to Debian
FROM node:lts-alpine3.18

# Environment variables can be set but Heroku will ignore EXPOSE and
# assigns its own port through the $PORT environment variable
ENV NODE_VERSION 20.11.0

# Create a directory to hold the application code inside the image
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install --loglevel=info

# Bundle app source inside Docker image
COPY . .

# Heroku dynamically assigns a port so you should not expose a port in Dockerfile
# Instead, you should listen on the port Heroku assigns to your container
# The EXPOSE instruction is for documentation purposes only
EXPOSE $PORT

# Defines the command to run your app using CMD which defines your runtime
# Here, we will use the basic npm start which will run "node server.js"
CMD ["npm", "start"]
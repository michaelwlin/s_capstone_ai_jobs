# Build the React application
FROM node:lts-alpine3.18 as build

# Set the openssl-legacy-provider option
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build

# Serve the app using a simple static file server
FROM node:lts-alpine3.18

# Install 'serve' to run the application
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build artifacts from the 'build' stage
COPY --from=build /app/build /app

# Heroku dynamically assigns a port
CMD ["sh", "-c", "serve -s -l $PORT"]
EXPOSE $PORT

# Stage 1: Build the React application
FROM node:lts-alpine3.18 as build

# Set the openssl-legacy-provider option
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Ensure the environment variable is used during the build process
RUN npm run build

# Stage 2: Serve the app using a simple static file server
FROM node:lts-alpine3.18

# Install 'serve' to run the application
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build artifacts from the 'build' stage
COPY --from=build /app/build /app

# Heroku dynamically assigns a port, so use the PORT environment variable
CMD ["sh", "-c", "serve -s -l $PORT"]

# Indicate we are listening on the dynamic port
EXPOSE $PORT

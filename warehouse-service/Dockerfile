# Use a Node.js base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Install dependencies
RUN npm install

# Run the build
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

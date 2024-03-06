# Use a Node.js base image
FROM node:18-alpine

# Set the environment variable for the Vite Restaurant Order System domain
ARG VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN

# Set the working directory in the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Set the environment variable for the Vite Restaurant Order System domain
ENV VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN=$VITE_RESTAURANT_ORDER_SYSTEM_DOMAIN

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

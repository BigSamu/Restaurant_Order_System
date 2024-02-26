# Use a Node.js base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Run the build
RUN npm run build

# Copy the transpiled code into the container
COPY dist/ .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["node", "app.cjs"]

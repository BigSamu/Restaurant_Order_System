# Build Stage
# This stage installs all dependencies and builds the project
FROM node:18-alpine AS build

# Set the working directory in the Docker container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Install dependencies
RUN npm install

# Run the build
RUN npm run build

# Serve Stage
# This stage sets up the Nginx server to serve the built application
FROM nginx:stable-alpine AS serve

# Copy built assets from the build stage to the default serve directory in nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy the Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]

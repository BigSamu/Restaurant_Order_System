#!/bin/bash

# Initialize environment file variable
env_file=""

# Function to display usage
usage() {
    echo "Usage: $0 --dev|--prod --service 'service1 service2 ...'"
    exit 1
}

# Process command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dev) env_file=".env.development";;
        --prod) env_file=".env.production";;
        --service) services="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; usage ;;
    esac
    shift
done

# Validate environment file
if [ -z "$env_file" ]; then
    echo "Please specify --dev or --prod."
    exit 1
fi

# Build and start services
if [ -z "$services" ]; then
    # Build and start all services if none are specified
    docker-compose --env-file "$env_file" up --build --force-recreate
else
    # Build and start specified services
    docker-compose --env-file "$env_file" up --build --force-recreate $services
fi

# Initialize the compose_file variable with default docker-compose file
compose_file="docker-compose.yml"

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dev) env_file=".env.development";;
        --prod)
            env_file=".env.production"
            compose_file="docker-compose.prod.yml"
            ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ -z "$env_file" ]; then
    echo "Please specify --dev or --prod."
    exit 1
fi

docker compose -f $compose_file down
docker compose -f $compose_file --env-file $env_file up --build --force-recreate -d

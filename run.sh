while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dev) env_file=".env.development";;
        --prod) env_file=".env.production";;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ -z "$env_file" ]; then
    echo "Please specify --dev or --prod."
    exit 1
fi

docker-compose --env-file $env_file up --build
```

ng build
docker build -t cbot .
docker stack rm cbot
docker stack deploy -c docker-compose.yml cbot



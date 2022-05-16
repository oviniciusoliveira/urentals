# uRentCars

## Comandos Docker
docker ps               lista containers rodando
docker ps -a            lista todos os containers
docker rm <id/name>     remove container
docker start <id/name>  starta o container
docker stop <id/name>   para o container
docker exec -it <id/name> /bin/bash   acessa o bash do container
docker logs <id/name>     mostra os logs
docker logs <id/name> -f  monitora os logs
docker exec <id/name> cat /etc/hosts  : mostra a rede do container

docker-compose up -d    cria os serviços e libera o terminal
docker-compose down     deleta os serviços que foram criados
docker-compose stop     para o docker-compose
docker-compose start    iniciar os serviços


## TODO
- [ ] Tipar os erros

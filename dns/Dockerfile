# Use a imagem oficial do Ubuntu
FROM ubuntu/bind9:latest

EXPOSE 53

# Copia a configuração do BIND
COPY ./config/ /etc/bind/

CMD named -g


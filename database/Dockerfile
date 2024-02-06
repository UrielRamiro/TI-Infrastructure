# Use a imagem oficial do PostgreSQL como base
FROM postgres:latest


# Copia um script SQL para criar a tabela
COPY init.sql /docker-entrypoint-initdb.d/

# Define variáveis de ambiente
ENV POSTGRES_DB postgres
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD ginfragrad06

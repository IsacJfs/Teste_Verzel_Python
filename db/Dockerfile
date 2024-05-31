FROM postgres:latest

COPY init-db.sh /docker-entrypoint-initdb.d/
COPY marcas-carros.csv /docker-entrypoint-initdb.d/
COPY modelos-carro.csv /docker-entrypoint-initdb.d/

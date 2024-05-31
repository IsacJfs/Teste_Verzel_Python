set -e

# Criar as tabelas
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE marcas_carros (
        ID SERIAL PRIMARY KEY,
        NOME VARCHAR(255) NOT NULL
    );

    CREATE TABLE modelos_carro (
        ID SERIAL PRIMARY KEY,
        IDMARCA INTEGER NOT NULL,
        NOME VARCHAR(255) NOT NULL,
        FOREIGN KEY (IDMARCA) REFERENCES marcas_carros(ID)
    );
EOSQL

# Carregar os dados dos arquivos CSV
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    \copy marcas_carros(ID, NOME) FROM '/docker-entrypoint-initdb.d/marcas-carros.csv' DELIMITER ';' CSV HEADER;
    \copy modelos_carro(ID, IDMARCA, NOME) FROM '/docker-entrypoint-initdb.d/modelos-carro.csv' DELIMITER ';' CSV HEADER;
EOSQL
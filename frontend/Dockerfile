FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração de pacotes para o diretório de trabalho
COPY sale-car-app/package.json sale-car-app/package-lock.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho do contêiner
COPY sale-car-app .

# Construa o aplicativo para produção
RUN npm run build

# Instale um servidor HTTP simples para servir os arquivos estáticos
RUN npm install -g serve

# Exponha a porta que o servidor HTTP usará
EXPOSE 5000

# Comando para iniciar o servidor e servir os arquivos estáticos
CMD ["npx", "vite", "preview", "--port", "5000", "--host"]
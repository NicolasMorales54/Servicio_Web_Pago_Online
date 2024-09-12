# Usar una imagen base de Node.js más completa para evitar problemas con dependencias nativas
FROM node:18-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que la aplicación escucha
EXPOSE 5173

# Comando para correr la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]

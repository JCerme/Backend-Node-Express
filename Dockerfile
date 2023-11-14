# Etapa de construcción para el frontend
FROM node:latest as build-stage

# Directorio de trabajo para el frontend
WORKDIR /app/frontend

# Copia los archivos de configuración del frontend
COPY ./frontend/package*.json ./

# Instala las dependencias del frontend
RUN npm install

# Copia el resto de los archivos del frontend
COPY ./frontend/ .

# Construye la aplicación frontend
RUN npm run build

# Etapa para el backend
FROM node:latest as production-stage

# Directorio de trabajo para el backend
WORKDIR /app/server

# Copia los archivos de configuración del backend
COPY ./server/package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia los archivos del backend
COPY ./server/ .

# Copia el build del frontend al directorio public del servidor
COPY --from=build-stage /app/frontend/dist /app/server/public

# Expone el puerto que tu servidor necesita
EXPOSE 3001

# Comando para ejecutar el servidor
CMD ["npm", "start"]


# Build the image
# docker build -t boatpump .
# ----------
# See the images
# docker images
# ----------
# Make the container
# docker run -d -p 8080:8080 boatpump
# ----------
# See the containers
# docker ps (-a para all)
# ----------
# Login
# docker login
# ----------
# Tag the image
# docker tag boatpump jcerme/boatpump:1.0.0
# ----------
# Push the image
# docker push jcerme/boatpump:1.0.0
# ----------
# Pull the image
# docker pull jcerme/boatpump:1.0.0
# ----------
# Run the image
# docker run -d -p 8080:8080 jcerme/boatpump:1.0.0
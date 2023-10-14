# Base image: node
FROM node

# Make a folder where your app's source code can live
WORKDIR /app

# Copy source code from your machine to the container
COPY ./frontend/package.json /app
COPY ./server/package.json /app

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your machine to the container
COPY . .

# Tell the image what to do when it starts as a container
EXPOSE 8080
CMD ["npm", "run", "dev"]


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
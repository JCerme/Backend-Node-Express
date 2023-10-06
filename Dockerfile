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

# docker build -t example .
# docker image
# docker run -p 8080:8080 example

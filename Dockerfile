# Pull the Node.js Docker image
FROM node:20-alpine

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy Node.js package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Start the application
CMD ["node", "index.js"]
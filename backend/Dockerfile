# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (internally)
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
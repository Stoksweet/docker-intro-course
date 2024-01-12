# Use the official Node.js Alpine image as a base image
FROM node:14-alpine

# Install Node.js and npm
RUN apk add --update nodejs npm

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY /app/package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code from /app to the working directory
COPY /app .

# Expose port 3000
EXPOSE 3100

# Command to run the application
CMD ["node", "index.js"]
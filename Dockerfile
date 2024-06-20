# Use the official Node.js image as a base image
FROM node:20

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 5001

# Define the command to run your application
CMD ["pnpm", "start"]

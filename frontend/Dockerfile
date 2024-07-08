FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the app for production
RUN npm run build

# Install a lightweight web server to serve the built files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5173

# Command to run the web server
CMD ["serve", "-s", "dist", "-l", "5173"]

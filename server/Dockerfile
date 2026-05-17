# Use a recent Node runtime for compatibility with your package versions
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the port the Express app runs on
EXPOSE 5000

# Run the dev script (executes: tsx watch src/server.ts)
CMD ["npm", "run", "dev"]
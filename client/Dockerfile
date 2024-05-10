# Use the official Node.js image as a base
FROM node:20-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173

ENV VITE_API_URL=http://localhost:8000

CMD ["npx", "vite", "--host"]

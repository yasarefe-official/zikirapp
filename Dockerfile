# Stage 1: Build a slim production-ready server
FROM node:20-alpine AS base
WORKDIR /app

# Copy server package.json and install dependencies
COPY server/package.json ./server/
RUN cd server && npm install --production

# Copy the rest of the server code
COPY server/ ./server/

# Copy the static client files
COPY client/ ./client/

# Expose the port the app runs on
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Start the server
CMD ["node", "server/index.js"]

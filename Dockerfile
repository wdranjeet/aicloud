FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend code
COPY backend ./backend

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "backend/server.js"]

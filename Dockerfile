# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code after package installation
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:prod"]

FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Set default environment variables
# These will be overridden by any passed at runtime
ENV PORT=5500 \
    NODE_ENV=production

USER nodejs

# Expose the port your app runs on
EXPOSE 5500

# Add health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:5500/ || exit 1

CMD ["node", "app.js"]
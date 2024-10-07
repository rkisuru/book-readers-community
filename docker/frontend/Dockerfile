# Stage 1: Build the Angular app
FROM node:22.6.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Run the Angular build
RUN npm run build

# Stage 2: Run the app with Node.js
FROM node:22.6.0
WORKDIR /app
COPY --from=build-stage /app/dist/book-readers-community-ui ./dist/book-readers-community-ui
COPY --from=build-stage /app/package*.json ./
COPY server.js ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 8080

# Start the Express server
CMD ["node", "server.js"]

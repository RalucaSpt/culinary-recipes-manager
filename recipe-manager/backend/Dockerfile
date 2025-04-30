# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) first
# This leverages Docker cache
COPY package*.json ./

# Install app dependencies
# If you use npm:
RUN npm install
# If you use yarn:
# RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variables (optional, can be set in docker-compose.yml)
# ENV NODE_ENV=production
# ENV DATABASE_URL=your_database_connection_string
# ENV JWT_SECRET=your_jwt_secret

# Run app.js when the container launches
CMD [ "node", "server.js" ]

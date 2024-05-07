# # FROM nginx
# # COPY todo-list/build/ /usr/share/nginx/html
# # EXPOSE 80
# ## ^^ Use above if building with pipeline. use this in env: REACT_APP_API_URL=http://localhost:8008

# ## Use below if running local
# # Build the React application
# # Use an official Node image as the base image
# FROM node:22 as builder

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json (or yarn.lock) to the working directory
# COPY todo-list/package*.json ./
# # If you're using Yarn, you might want to copy yarn.lock file
# # COPY yarn.lock ./

# # Install project dependencies
# RUN npm install
# # If you're using Yarn, use `yarn install` instead
# # RUN yarn install

# # Copy the rest of your app's source code from your host to your image filesystem.
# COPY todo-list/. .

# # Get environment variable at build time
# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL $REACT_APP_API_URL

# # Build the app
# RUN npm run build
# # If you're using Yarn, use `yarn build` instead
# # RUN yarn build

# # Step 2: Serve the app with Nginx
# # Use an official Nginx image as the base image for the serving stage
# FROM nginx:latest

# # Copy the built app to Nginx's serve directory
# COPY --from=builder /app/build /usr/share/nginx/html

# # Expose port 80 to the outside once the container has launched
# EXPOSE 80

# # Define the command to run your app using CMD which defines your runtime
# # Here we use the Nginx image's default CMD to start Nginx in the foreground
# CMD ["nginx", "-g", "daemon off;"]


##################################################################################

# Start with the Node.js base image
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Install Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Copy the Nginx configuration file (if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY default.conf /etc/nginx/conf.d/default.conf

COPY nginx.conf ./nginx.conf
COPY default.conf ./default.conf

# Copy your Node.js application
COPY todo-list/. .


COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]

# What is the Dockerfile for?
# In the Dockerfile we write a sequence of instructions that will be used to build a Docker image.
# Docker Images contain code, dependencies, libraries, etc. They are like blueprints.
# And they are used to run containers, which are the actual applications made from that "blueprints"


# I was using node 18 (from an old tutorial) and it didn't find some imports, I changed to node 22.
FROM node:22-alpine AS build

# We specify what we want to be included in the image. In this case, everything inside the /app folder
WORKDIR /app

# Before: COPY package.json -> didn't work of course. Need to specify that it is inside /app folder.
# This is to copy the package.json from our local file system into the image.
COPY app/package.json .

# This command installs all dependencies inside our Docker image
RUN npm install

# Then we copy everything from /app (local) into /app (image)
COPY /app /app

# Then we run this command to build our application inside the image
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

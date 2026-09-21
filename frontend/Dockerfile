# What is the Dockerfile for?
# In the Dockerfile we write a sequence of instructions that will be used to build a Docker image.
# Docker Images contain code, dependencies, libraries, etc. They are like blueprints.
# And they are used to run containers, which are the actual applications made from that "blueprints"


# I was using node 18 (from an old tutorial) and it didn't find some imports, I changed to node 22.
FROM node:22-alpine

# We specify what we want to be included in the image. In this case, everything inside the /app folder
WORKDIR /app

# Before: COPY package.json -> didn't work of course. Need to specify that it is inside /app folder.
# This is to copy the package.json from our local file system into the image.
COPY app/package.json .

# This command installs all dependencies inside our Docker image
RUN npm install

# This command is used to install serve inside our Docker image. Serve is something we use to run our react application.
RUN npm i -g serve

# Then we copy everything from /app (local) into /app (image)
COPY /app /app

# Then we run this command to build our application inside the image
RUN npm run build

# Explanation for EXPOSE 3000: The step where we define EXPOSE 3000 is a convention and a good practice
# that declares on which port the application “should” run and not must run.
# We can have a different port exposed in the Dockerfile and can use a totally different port while running the image.
EXPOSE 3000

# This command only runs when the container is running. It does not execute in the image creation process.
# This command is to run the already built image.
CMD [ "serve", "-s", "dist" ]
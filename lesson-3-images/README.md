
# Exercise 3

In this exercise lets create our own Docker image. To create an image it all starts with a ```Dockerfile```. This file uses text to describe the steps to create your image. Once you have this file we will then use the Docker CLI to build our image. It is very important to keep these Dockerfiles in their own folders with the code it will use in the build process. We will navigate into this folder and use the CLI to build our image from there. 




## Steps

First think is first, lets ensure that the docker daemon and client is up and running.

Step 1 - Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker ps -a
```
This command will show you all the containers that you have instantiated on your machine. This command will also show you containers that have exited. If you are getting an error on windows ensure that you have opened the docker desktop app. 

Go ahead and navigate to the Lesson 3 folder/directory in your code editor, command prompt, terminal. Ensure that your run all CLI commands from here. This where we will create our image and pass it our application code and dependancies to run.

Now create a file named ```Dockerfile```. There is no file extention. 

Step 2 - Create Dockerfile. (Command Prompt)
```bash
  echo. > Dockerfile
```

Step 2 - Create Dockerfile. (Terminal)
```bash
  touch Dockerfile
```

Now go ahead and open the Dockerfile in your code editor. We will create a Docker image that runs the NodeJS App found in the /app directory. This is a simple express app that runs on port 3000 and displays a simple message when a request is made to the port 3000 in the browser. This container will run on a lightweight linux and will also log messages in the terminal.

Step 3 - Add and peruse the following to Dockerfile.
```code
# Use the official Node.js Alpine image as a base image
FROM node:14-alpine

# Install Node.js and npm
RUN apk add --update nodejs npm

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY /app/package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code from /app to the working directory
COPY /app .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
```

This file packages your code, it's dependancies and steps to run all together. Next we will build an image from this Dockerfile. For this ensure that you are in the root lesson 3 directory/folder.

Step 4 - Build the docker image.
```bash
  docker build -t my-first-image .
```
This command will pick up the Dockerfile in the directory you are in and it will build the image. First we specify that we are usint the ```docker build``` command, then we are naming the image by providing tag it with ```-t my-first-image``` followed by a ```.```. The period at the end indicated that we are running this command in the current folder/directory.

When it is done running you can check to see your new image in your list of local images.

Step 4 - List images.
```bash
  docker images
```
You should see the ```my-first-image``` image in the list. Now let's run a container that uses it.

Step 5 - Run and expose the container.
```bash
  docker run -p 3000:3000 my-first-image
```
This command will run a container using the created image. The container is also exposed on port 3000 and we are mapping it to 3000 on the host. 

Once it's running, open a browser and navigate to localhost:3000. You should see a response from the containerized application.

Lastly, we can stop the container by running:
```bash
  docker stop <image name or id>
```

This is what the obsession about Docker and containers is about. There is a lot more to it but at its core it's there to simplify things for us by bundling our code or applications together so that it's ready for deployment quickly as a container and not just a bunch of loose files. If it works as a container it will work anywhere where the image is shared.

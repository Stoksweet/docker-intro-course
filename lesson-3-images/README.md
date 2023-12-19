
# Exercise 3

In this exercise lets create our own Docker image. To create an image it all starts with a ```Dockerfile```. This file uses YAML to describe the steps to create your image. Once you have this file we will then use the Docker CLI to build our image. It is very important to keep these Dockerfiles in their own folders. We will navigate into this folder and use the CLI to build our image from there. 




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

Now go ahead and open the Dockerfile in your code editor. Note that YAML is very indentation specific.

We will create a Docker image that runs on NodeJS App.

# Exercise 1

Let's get up and running with Docker. For this course I will be using docker with Windows but the same steps apply on Mac and Linux. There will only be slight differences in how you install it.




## Installation

Download Docker from https://docs.docker.com/get-docker/ and select the platform of your choice. Once you have downloaded it go ahead and install it.

With that in order you should have everything you need for the rest of the course. Now let's test that docker is in fact installed on CMD or terminal. 

Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker --version
```

You should see a version number returned. I am using version 20.10.21 at the time of this course.

If you are on Windows open the Docker Desktop app and when it has started it will ensure that Docker is up and running. Then move to the next step or else you will get an error indicating that the docker daemon isn't running.  

Now that Docker is installed, let's see how easy it is to run a container by running the following:
```bash
  docker run hello-world
```

This will pull and run the following container image which you can read about on Dockerhub: https://hub.docker.com/_/hello-world. This containerized application simply returns a "Hello from Docker!" response in the terminal with some info about parts of the Docker architecture and exits.

Dockerhub is basically GitHub but for Docker images on the Dockerhub registry. When you deploy your applications to the cloud (Google Cloud, AWS, Azure, ect) or any environment that suppports containers you will make use of a registry to push the image to. We will work with images later in this course. Just like that, you have used Docker.  


    
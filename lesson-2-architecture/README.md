
# Exercise 2

Now that we are all up and running let's explore the Docker architecture by deploying and exposing a web based pacman game which has been containerized and the image is available on Docker hub. We will make use of the Docker Client CLI component which is a command line interface tools for executing Docker commands.




## Steps

First think is first, lets ensure that the docker daemon and client is up and running.

Step 1 - Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker ps -a
```
This command will show you all the containers that you have instantiated on your machine. This command will also show you containers that have exited. If you are getting an error on windows ensure that you have opened the docker desktop app. 

For the next step we will manually pull the pacman image from Docker hub and run it seperately. Note that docker will automatically look for the image on Docker hub by default if it doesn't find a pulled image locally. 

We will use the following image: https://hub.docker.com/r/golucky5/pacman. Notice how they have mentioned that the application is exposed on port 80. We will need to know that port number when we run the image on the machine.

Step 2 - Pull the docker image.
```bash
  docker pull golucky5/pacman
```
    
Step 3 - View your images.
```bash
  docker images
```
You should see the 'golucky5/pacman' image in the list. Now that we have the image we can run it.

Step 4 - Run and expose images.
```bash
  docker run -p 80:80 golucky5/pacman
```
By passing the ```-p 80:80``` which tells docker to expose the container on port 80, the second 80 is the port exposed in the container image. Thereafter we pass in the image that we are running which is ```golucky5/pacman```

``` docker run -p <host_port>:<container_port> <image> ```

Step 5 - Now let's check that the image is running:
```bash
  docker ps -a
```

In the list you should see a container with the status of running that is using the ```golucky5/pacman``` image and the port 80 exposed. 

With all that in order you can open a browser at localhost:80 and play the pacman game!

Lastly, you might want to stop a container. To do this all you need is the NAME of the container or the first 3 digits of the CONTAINER ID. 

Step 6 - Stop the container:
```bash
  docker stop <conatiner name or id>
```

Step 7 - Confirm that the container is stopped:
```bash
  docker ps -a
```

With that in order you now know what it's like to source images from docker hub, read them, deploy them and manage them using the Docker CLI.
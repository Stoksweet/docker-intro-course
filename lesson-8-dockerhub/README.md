
# Exercise 8

In this exercise we will get a hands on experience with pushing our Docker image to a registry. In this case the registry is DockerHub. We will push the image we created in Lesson 3 ```my-first-image```. To achieve this our container image must go through three steps: 1 - Login, 2 - Tagging, 3 - Pushing. 

Before we can move forward you will need a DockerHub account. head over to https://hub.docker.com/ and create an account. We will need the username and passwork when logging in using our terminal. Let's get right into it!





## Steps

First think is first, lets ensure that the docker daemon and client is up and running.

Step 1 - Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker ps -a
```
This command will show you all the containers that you have instantiated on your machine. This command will also show you containers that have exited. If you are getting an error on windows ensure that you have opened the docker desktop app. 

Go ahead and navigate to the Lesson 8 folder/directory in your code editor, command prompt, terminal. Ensure that your run all CLI commands from here.

Step 2 - List all images: 
```bash
  docker images
```

Our ```my-first-image``` should still be on the list. We will tag this one. First, let's login to DockerHub.

Step 3 - Login to DockerHub: 
```bash
  docker login
```

It will ask you for your username and password that you used when creating a DockerHub account. You should get the following message if all is well ```Login Succeeded```.

Now with that in order all we need to do is tag our image sing the ```docker tag``` command. The full command looks like this: 

```
docker tag local-image:tag dockerhub-username/repository-name:tag
```

We will need to specify our local image name and tag plus the dockerhub username and repo name and tag. Before we can do that we will need a repo, so head over to DockerHub and create a private one named ```my-first-image```. On the right hand side they will also provide you with steps on how to tag and push the image.

Step 4 - Tag my-first-image: 
```bash
  docker tag my-first-image:latest stoksweet/my-first-image-push:latest
```

With the image tagged to the repo we can now go ahead and push it.

Step 4 - Push my-first-image: 
```bash
  docker push stoksweet/my-first-image-push:latest
```

This should take some time but once completed you should get a message that looks like this: 

```
 latest: digest: sha256:9396455a9e42f76095df85f3dc95d029389702ba33a1d4f149264a04356f6747 size: 2206
```

To verify that all is in order, we can go to DockerHub and check our list of repositories, there should be a ```my-first-image``` image in the list. It should show when the last push occured eg ```Last pushed: 2 minutes ago```. 

When you click on the ```latest``` tag in the list, you can view more info about the tagged image. 

With that in order we have successfully pushed our first image to DockerHub. The same applies when working with AWS, Google Cloud or other providers that offer container registries.

In our case we have made the image private but if it were public we could pull it from anywhere using the following command:
```bash
    docker pull stoksweet/my-first-image
```

Congrats! You have successfully completed this Docker intro course. The possibilities and career opportunities are endless. 